import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const userText = body.text;

  if (!userText) return NextResponse.json({ reply: 'Say something!' });

  try {
    // Initialize the Gemini client
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    // Generate a response using the Gemini model
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userText,
    });

    const reply = response.text ?? "I didn't understand that.";
    return NextResponse.json({ reply });
  } catch (err) {
    console.error('Gemini API error:', err);
    return NextResponse.json({ reply: 'Oops! Something went wrong 😅' });
  }
}
