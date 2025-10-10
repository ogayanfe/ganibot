"use server";

import { AIResponsePayload } from "@/actions/generate-audio";
import { createPartFromUri, GoogleGenAI } from "@google/genai";
import { SYSTEM_PROMPT_HAUSA_RESPONSE, SYSTEM_PROMPT_ENGLISH_RESPONSE } from "./constants";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

interface IResponse {
  text: string;
  language?: "English" | "Hausa";
  audioBase64?: string;
}

export default async function generateAIResponse({
  base64Audio,
  base64Video,
  language = "Hausa",
  voice = "Male",
  history = [],
}: AIResponsePayload): Promise<IResponse> {
  const parts = [{ text: "Reply to user's message" }, { inlineData: { mimeType: "audio/mp3", data: base64Audio } }];
  if (base64Video) {
    parts.push({ inlineData: { mimeType: "video/webm", data: base64Video } });
  }
  const contents = [
    ...history,
    {
      role: "user",
      parts: parts,
    },
  ];

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: contents,
    config: {
      temperature: 0.1,
      systemInstruction: language === "Hausa" ? SYSTEM_PROMPT_HAUSA_RESPONSE : SYSTEM_PROMPT_ENGLISH_RESPONSE,
    },
  });
  const text = response.text?.trim() ?? "";
  if (!text || language !== "Hausa") {
    return { text, language };
  }

  try {
    const flaskRes = await fetch(process.env.BACKEND_HAUSA_AUDIO_SERVER_URL ?? "", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text, speaker: voice === "Male" ? "spk_m_2" : "spk_f_1" }),
    });

    if (!flaskRes.ok) {
      throw new Error("AI Response generation failed");
    }
    const audioBuffer = await flaskRes.arrayBuffer();
    const base64 = Buffer.from(audioBuffer).toString("base64");
    return { text, language, audioBase64: base64 };
  } catch (error) {
    return { text, language };
  }
}
