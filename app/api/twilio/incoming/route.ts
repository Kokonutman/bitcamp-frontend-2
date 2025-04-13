// app/api/twilio/incoming/route.ts
import { NextRequest } from "next/server";
import { getResponse } from "@/lib/services/gptService";

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return new Response("Missing 'prompt' in request body.", { status: 400 });
    }

    const result = await getResponse(prompt);

    const xml = `
      <Response>
        <Say voice="alice">${result.response}</Say>
      </Response>
    `.trim();

    return new Response(xml, {
      status: 200,
      headers: {
        "Content-Type": "text/xml",
      },
    });
  } catch (err) {
    console.error("❌ Twilio route error:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
