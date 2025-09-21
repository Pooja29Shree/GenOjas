import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.MITRA || "");

// convert messages from the Vercel AI SDK Format to the Google Generative AI SDK format
const buildGoogleGenAIPrompt = (messages: any[]) => ({
  contents: messages
    .filter((m) => m.role === "user" || m.role === "assistant")
    .map((m) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.content }],
    })),
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    safetySettings: [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
      },
    ],
  });

  const result = await model.generateContent({
    ...buildGoogleGenAIPrompt(messages),
  });

  const text = result.response.candidates?.[0]?.content?.parts?.[0]?.text || "";
  return new Response(text, { status: 200 });
}
