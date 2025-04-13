// app/api/chat-logs/route.ts
import { dbConnect } from "@/lib/dbConnect";
import ChatLog from "@/lib/models/ChatLog";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    const logs = await ChatLog.find().sort({ timestamp: -1 });
    return NextResponse.json(logs);
  } catch (error) {
    console.error("❌ Error fetching chat logs:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
