import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const userText = body.text;

  if (!userText) return NextResponse.json({ reply: "Say something!" });

  // Simple sentiment analysis fallback (optional)
  let reply = "Thanks for sharing 💫. I’m always listening.";
  if (userText.toLowerCase().includes("happy")) reply = "That's awesome! 🌸";
  if (userText.toLowerCase().includes("sad")) reply = "I sense you’re feeling down 💜. I'm here.";

  return NextResponse.json({ reply });
}
