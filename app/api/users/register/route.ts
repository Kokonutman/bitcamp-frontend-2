// app/api/users/register/route.ts
import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import User from "@/lib/models/User";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const { name, phoneNumber } = await req.json();

    if (!name || !phoneNumber) {
      return NextResponse.json(
        { error: "Missing name or phoneNumber" },
        { status: 400 }
      );
    }

    const user = new User({
      name,
      phoneNumber,
      sobrietyStartDate: new Date(),
    });

    await user.save();

    return NextResponse.json({ message: "User created", userId: user._id });
  } catch (error) {
    console.error("❌ Registration error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
