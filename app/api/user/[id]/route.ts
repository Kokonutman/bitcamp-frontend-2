// app/api/user/[id]/route.ts
import { dbConnect } from "@/lib/dbConnect";
import User from "@/lib/models/User";
import { NextRequest } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const user = await User.findById(params.id);

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }

    let daysSober = 0;
    if (user.sobrietyStartDate) {
      const diff = Date.now() - new Date(user.sobrietyStartDate).getTime();
      daysSober = Math.floor(diff / (1000 * 60 * 60 * 24));
    }

    return new Response(
      JSON.stringify({
        name: user.name,
        phoneNumber: user.phoneNumber,
        sobrietyStartDate: user.sobrietyStartDate,
        daysSober,
        mood: user.mood || "Not tracked yet",
        substances: user.substances || [],
        reasonsForUse: user.reasonsForUse || [],
        copingStrategies: user.copingStrategies || [],
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error("❌ Error fetching user profile:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}
