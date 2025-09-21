import { NextRequest, NextResponse } from "next/server";
import fetch from "node-fetch";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    if (!file) return NextResponse.json({ error: "No file uploaded" }, { status: 400 });

    const arrayBuffer = await file.arrayBuffer();
    const audioBytes = Buffer.from(arrayBuffer).toString("base64");

    // 1️⃣ Speech-to-Text
    const sttRes = await fetch(
      `https://speech.googleapis.com/v1/speech:recognize?key=${process.env.Clould_SpeechToText_API}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          audio: { content: audioBytes },
          config: {
            encoding: "WEBM_OPUS",
            languageCode: "en-US",
          },
        }),
      }
    );

    const sttData = await sttRes.json() as { results?: Array<{ alternatives: Array<{ transcript: string }> }> };
    const transcript = sttData.results?.map((r: any) => r.alternatives[0].transcript).join(" ") || "";

    // 2️⃣ Natural Language API (sentiment analysis)
    const nlpRes = await fetch(
      `https://language.googleapis.com/v1/documents:analyzeSentiment?key=${process.env.Cloud_Natural_Language_API}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          document: { content: transcript, type: "PLAIN_TEXT" },
          encodingType: "UTF8",
        }),
      }
    );

    const nlpData = await nlpRes.json() as { documentSentiment?: { score?: number } };
    const sentiment = nlpData.documentSentiment?.score ?? 0;

    // 3️⃣ Mithra text reply
    const reply =
      sentiment < -0.25
        ? "I sense you’re feeling a bit down 💜. I’m here with you."
        : sentiment > 0.25
        ? "That’s awesome! 🌸 I’m happy to hear that."
        : "Thanks for sharing 💫. I’m always listening.";

    return NextResponse.json({
      transcript,
      reply,
    });
  } catch (err) {
    console.error("Error processing voice:", err);
    return NextResponse.json({ error: "Failed to process audio" }, { status: 500 });
  }
}
