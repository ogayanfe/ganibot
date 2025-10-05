"use client";
import generateAudio, { AIResponsePayload } from "@/actions/generate-audio";
import { useMutation } from "@tanstack/react-query";

async function mutate(payload: AIResponsePayload) {
  return await generateAudio(payload);
}

export default function useAIResponseMutation() {
  return useMutation({ mutationFn: mutate, mutationKey: ["ai-response"] });
}
