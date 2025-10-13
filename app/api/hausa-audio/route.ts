import { NextResponse } from "next/server";

export const runtime = "nodejs"; // ensure it's using Node runtime (not edge)
export const fetchCache = "force-no-store"; // disable caching

export async function POST(req: Request) {
  try {
    const { text, voice = "Male" } = await req.json();

    if (!text) {
      return NextResponse.json({ error: "Missing 'text' field" }, { status: 400 });
    }

    const flaskURL = process.env.BACKEND_HAUSA_AUDIO_SERVER_URL;
    if (!flaskURL) {
      return NextResponse.json({ error: "Missing BACKEND_HAUSA_AUDIO_SERVER_URL env var" }, { status: 500 });
    }

    const flaskRes = await fetch(flaskURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text,
        speaker: voice === "Male" ? "spk_m_2" : "spk_f_1",
      }),
    });

    if (!flaskRes.ok) {
      const errorText = await flaskRes.text();
      return NextResponse.json({ error: `Flask server error: ${errorText}` }, { status: flaskRes.status });
    }

    // Stream the Flask audio (audio/wav) response directly
    const audioStream = flaskRes.body;

    return new NextResponse(audioStream, {
      status: 200,
      headers: {
        "Content-Type": "audio/wav",
        "Cache-Control": "no-store",
      },
    });
  } catch (err: any) {
    console.error("Hausa audio generation error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
