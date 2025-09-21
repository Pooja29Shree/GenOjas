import { NextRequest, NextResponse } from "next/server";
import speech from "@google-cloud/speech";
import textToSpeech from "@google-cloud/text-to-speech";
import language from "@google-cloud/language";
import { Buffer } from "buffer";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    if (!file) return NextResponse.json({ error: "No file uploaded" }, { status: 400 });

    const arrayBuffer = await file.arrayBuffer();
    const audioBytes = Buffer.from(arrayBuffer);

    // 1️⃣ Speech-to-Text
    const speechClient = new speech.SpeechClient();
    const [sttResponse] = await speechClient.recognize({
      audio: { content: audioBytes.toString("base64") },
      config: {
        encoding: "WEBM_OPUS", // browser mic default
        languageCode: "en-US",
      },
    });

    const transcript = sttResponse.results?.map(r => r.alternatives?.[0].transcript).join(" ") || "";

    // 2️⃣ Natural Language Sentiment
    const languageClient = new language.LanguageServiceClient();
    const [sentimentResult] = await languageClient.analyzeSentiment({
      document: { content: transcript, type: "PLAIN_TEXT" },
    });
    const sentimentScore = sentimentResult.documentSentiment?.score ?? 0;

    const reply =
      sentimentScore < -0.25
        ? "I sense you’re feeling a bit down 💜. I’m here with you."
        : sentimentScore > 0.25
        ? "That’s awesome! 🌸 I’m happy to hear that."
        : "Thanks for sharing 💫. I’m always listening.";

    // 3️⃣ Text-to-Speech
    const ttsClient = new textToSpeech.TextToSpeechClient();
    const [ttsResponse] = await ttsClient.synthesizeSpeech({
      input: { text: reply },
      voice: { languageCode: "en-US", ssmlGender: "FEMALE" },
      audioConfig: { audioEncoding: "MP3" },
    });

    return NextResponse.json({
      transcript,
      reply,
      audioContent: ttsResponse.audioContent, // base64 MP3 string
    });
  } catch (err) {
    console.error("Error processing voice:", err);
    return NextResponse.json({ error: "Failed to process audio" }, { status: 500 });
  }
}
