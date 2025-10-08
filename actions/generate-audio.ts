"use server";

import generateAIResponse from "@/utils/ai";
import { Part } from "@google/genai";

export interface AIResponsePayload {
  base64Audio: string;
  base64Video?: string;
  voice?: "Male" | "Female";
  language?: "Hausa" | "English";
  history?: HistoryItem[];
}

export interface HistoryItem {
  role: "user" | "model";
  parts: Part[];
}

export default async function generateAudio(payload: AIResponsePayload) {
  const { text, ...rest } = await generateAIResponse(payload);

  return { transcript: text, ...rest };
}
