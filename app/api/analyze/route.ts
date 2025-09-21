import { NextRequest, NextResponse } from "next/server";
// import fetch from "node-fetch"; // Not needed in Next.js API routes

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) return NextResponse.json({ error: "No file uploaded" }, { status: 400 });

  const arrayBuffer = await file.arrayBuffer();
  const audioBytes = Buffer.from(arrayBuffer).toString("base64");

  try {
    // 1️⃣ Speech-to-Text
    const sttRes = await fetch(
      `https://speech.googleapis.com/v1/speech:recognize?key=${process.env.Clould_SpeechToText_API}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          audio: { content: audioBytes },
          config: {
            encoding: "WEBM_OPUS", // browser mic recording format
            languageCode: "en-US",
          },
        }),
      }
    );

    const sttData = await sttRes.json();
    const transcript = sttData.results?.map((r: any) => r.alternatives[0].transcript).join(" ") || "";

    // 2️⃣ Natural Language API (analyze emotion)
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

    const nlpData = await nlpRes.json();
    const sentiment = nlpData.documentSentiment?.score ?? 0;

    // Decide Mithra's comforting reply
    const reply =
      sentiment < -0.25
        ? "I can feel you’re a bit down 💜. I’m right here with you."
        : sentiment > 0.25
        ? "That’s awesome! 🌸 Thanks for sharing."
        : "Thanks for telling me 💫. I’m always listening.";

    // 3️⃣ Text-to-Speech
    const ttsRes = await fetch(
      `https://texttospeech.googleapis.com/v1/text:synthesize?key=${process.env.Clould_TextToSpeech_API}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          input: { text: reply },
          voice: { languageCode: "en-US", ssmlGender: "FEMALE" },
          audioConfig: { audioEncoding: "MP3" },
        }),
      }
    );

    const ttsData = await ttsRes.json();

    return NextResponse.json({
      transcript,
      reply,
      audioContent: ttsData.audioContent, // base64 MP3 string
    });
  } catch (err) {
    console.error("Error processing voice:", err);
    return NextResponse.json({ error: "Failed to process audio" }, { status: 500 });
  }
}
