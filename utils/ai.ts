"use server";

import { AIResponsePayload } from "@/actions/generate-audio";
import { GoogleGenAI } from "@google/genai";
import { SYSTEM_PROMPT } from "./constants";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

interface IResponse {
  text: string;
  audioBase64?: string;
}
export default async function generateAIResponse({ base64Audio, base64Video }: AIResponsePayload): Promise<IResponse> {
  const parts = [{ text: "Reply to user's message" }, { inlineData: { mimeType: "audio/mp3", data: base64Audio } }];
  if (base64Video) {
    parts.push({ inlineData: { mimeType: "video/webm", data: base64Video } });
  }
  const contents = [
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
      systemInstruction: SYSTEM_PROMPT,
    },
  });
  const text = response.text?.trim() ?? "";
  if (!text) {
    return { text: "" };
  }

  const flaskRes = await fetch(process.env.BACKEND_HAUSA_AUDIO_SERVER_URL ?? "", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });

  if (!flaskRes.ok) {
    return { text };
  }

  const audioBuffer = await flaskRes.arrayBuffer();
  const base64 = Buffer.from(audioBuffer).toString("base64");
  return { text, audioBase64: base64 };
}
