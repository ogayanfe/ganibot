"use server";

import generateAIResponse from "@/utils/ai";

export interface AIResponsePayload {
  base64Audio: string;
}

export default async function generateAudio(payload: AIResponsePayload) {
  const { text, audioBase64 } = await generateAIResponse(payload);

  return { transcript: text, audioBase64 };
}
