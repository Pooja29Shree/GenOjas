import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const userText = body.text;

  if (!userText) return NextResponse.json({ reply: "Say something!" });

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: userText }],
        temperature: 0.7,
        max_tokens: 256,
      }),
    });

    const data = await res.json();
    const reply = data.choices?.[0]?.message?.content ?? "I didn't understand that.";

    return NextResponse.json({ reply });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ reply: "Oops! Something went wrong 😅" });
  }
}
