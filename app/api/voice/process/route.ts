import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const userText = body.text;

  if (!userText) return NextResponse.json({ reply: "Say something!" });

  try {
    // Call Vertex AI API (or any LLM API)
    const apiRes = await fetch(
      `https://us-central1-aiplatform.googleapis.com/v1/projects/YOUR_PROJECT_ID/locations/us-central1/publishers/google/models/text-bison-001:predict`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.Vertex_AI_API}`, // your API key
        },
        body: JSON.stringify({
          instances: [
            {
              content: userText,
            },
          ],
          parameters: {
            temperature: 0.7,
            maxOutputTokens: 256,
          },
        }),
      }
    );

    const data = await apiRes.json();
    const reply = data.predictions?.[0].content ?? "I didn't understand that.";

    return NextResponse.json({ reply });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ reply: "Oops! Something went wrong 😅" });
  }
}
