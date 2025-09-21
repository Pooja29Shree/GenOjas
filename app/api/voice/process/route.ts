import { NextRequest, NextResponse } from "next/server";
import { TextToSpeechClient } from "@google-cloud/text-to-speech";

// Initialize TTS client (make sure your service account JSON path is correct)
const ttsClient = new TextToSpeechClient({
  keyFilename: process.env.GOOGLE_TTS_KEYFILE, // Example: ./service-account.json
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const userText = body.text;

  if (!userText) return NextResponse.json({ reply: "Say something!" });

  try {
    let reply = "";

    // If user says "I'm done", return a motivational quote
    if (userText.toLowerCase().includes("i'm done")) {
      const quotes = [
        "Remember, every day is a new beginning 🌸",
        "You did your best today, take a deep breath 💜",
        "Even small steps count, keep going 💫",
        "Be proud of what you achieved today, no matter how small ✨",
      ];
      reply = quotes[Math.floor(Math.random() * quotes.length)];
    } else {
      // Otherwise, use Gemini API to respond
      const { GoogleGenAI } = await import("@google/genai");
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: userText,
      });

      reply = response.text ?? "I didn't understand that.";
    }

    // Convert Mithra's reply to speech
    const [audioResponse] = await ttsClient.synthesizeSpeech({
      input: { text: reply },
      voice: { languageCode: "en-US", ssmlGender: "FEMALE" },
      audioConfig: { audioEncoding: "MP3" },
    });

    const audioContent = audioResponse.audioContent?.toString("base64");

    return NextResponse.json({ reply, audioContent });
  } catch (err) {
    console.error("Error in /voice/process:", err);
    return NextResponse.json({ reply: "Oops! Something went wrong 😅" });
  }
}
