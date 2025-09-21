import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const userText = body.text;

  if (!userText) return NextResponse.json({ reply: "Say something!" });

  try {
    // Call Vertex AI API using API key in query param
    const apiRes = await fetch(
      `https://us-central1-aiplatform.googleapis.com/v1/projects/gold-gearbox-472217-d5/locations/us-central1/publishers/google/models/text-bison-001:predict?key=${process.env.Vertex_AI_API}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          instances: [
            { content: userText }
          ],
          parameters: {
            temperature: 0.7,
            maxOutputTokens: 256
          }
        }),
      }
    );

    const data = await apiRes.json();

    // Extract reply from response
    const reply = data.predictions?.[0]?.content ?? "I didn't understand that.";

    return NextResponse.json({ reply });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ reply: "Oops! Something went wrong 😅" });
  }
}
