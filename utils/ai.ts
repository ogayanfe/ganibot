"use server";

import { AIResponsePayload } from "@/actions/generate-audio";
import { GoogleGenAI } from "@google/genai";
import { SYSTEM_PROMPT } from "./constants";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default async function generateAIResponse({ base64Audio }: AIResponsePayload) {
  const contents = [
    {
      inlineData: {
        mimeType: "audio/mp3",
        data: base64Audio,
      },
    },
  ];

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-lite",
    contents: contents,
    config: {
      temperature: 0.1,
      systemInstruction: SYSTEM_PROMPT,
    },
  });
  const text = response.text;

  return { text };
}
