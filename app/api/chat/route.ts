// app/api/chat/route.ts

import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import ChatLog from "@/lib/models/ChatLog";
import User from "@/lib/models/User";
import { getResponse } from "@/lib/services/gptService";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const { prompt, userId } = await req.json();
    if (!prompt || !userId) {
      return NextResponse.json(
        { error: "Missing prompt or userId" },
        { status: 400 }
      );
    }

    // Fetch previous chat context
    const contextLogs = await ChatLog.find({ userId })
      .sort({ timestamp: 1 })
      .limit(5);
    const contextMessages: any[] = [];

    contextLogs.forEach((log) => {
      contextMessages.push({ role: "user", content: log.prompt });
      contextMessages.push({ role: "assistant", content: log.response });
    });

    const user = await User.findById(userId);

    if (user) {
      const name = user.name;
      const startDate = user.sobrietyStartDate
        ? new Date(user.sobrietyStartDate).toLocaleDateString()
        : "an unknown date";

      const substances = user.substances?.length
        ? user.substances.join(", ")
        : "no substances listed";

      const reasons = user.reasonsForUse?.length
        ? user.reasonsForUse.join(", ")
        : "no specific reasons recorded";

      const coping = user.copingStrategies?.length
        ? user.copingStrategies.join(", ")
        : "no coping strategies recorded";

      const mood = user.mood || "unknown";

      contextMessages.unshift({
        role: "system",
        content: `
    You are speaking to ${name}, who has been sober since ${startDate}.
    They are recovering from: ${substances}.
    Common triggers for relapse include: ${reasons}.
    Helpful coping strategies they have used in the past include: ${coping}.
    Their current emotional state is: ${mood}.
    
    Use this knowledge to guide your reply, but do not repeat it verbatim.
    `.trim(),
      });
    }

    // Call OpenAI
    const result = await getResponse(
      prompt,
      process.env.OPENAI_API_KEY!,
      contextMessages
    );

    // Save chat log
    await ChatLog.create({
      userId,
      prompt,
      response: result.response,
      mood: result.mood,
    });

    // Update user profile
    if (user) {
      if (result.mood) user.mood = result.mood;
      if (Array.isArray(result.substances)) {
        user.substances = [
          ...new Set([...(user.substances || []), ...result.substances]),
        ];
      }
      if (Array.isArray(result.reasons)) {
        user.reasonsForUse = [
          ...new Set([...(user.reasonsForUse || []), ...result.reasons]),
        ];
      }
      if (Array.isArray(result.coping)) {
        user.copingStrategies = [
          ...new Set([...(user.copingStrategies || []), ...result.coping]),
        ];
      }
      if (result.updateSobrietyStart === true) {
        user.sobrietyStartDate = new Date();
      }
      await user.save();
    }

    return NextResponse.json({ response: result.response });
  } catch (error) {
    console.error("❌ Error in /api/chat:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
