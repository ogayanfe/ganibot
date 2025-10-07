"use server";

import generateAIResponse from "@/utils/ai";

export interface AIResponsePayload {
  base64Audio: string;
  base64Video?: string;
  voice?: "Male" | "Female";
  language?: "Hausa" | "English";
}

export default async function generateAudio(payload: AIResponsePayload) {
  const { text, ...rest } = await generateAIResponse(payload);

  return { transcript: text, ...rest };
}
