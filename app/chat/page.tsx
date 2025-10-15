"use client";

import SplineChart from "@/components/chart/spline";
import ChatFooter from "@/components/chat/footer";
import ChatHeader from "@/components/chat/header";
import Transcript from "@/components/chat/transcript";
import Video from "@/components/chat/video";
import ComponentVisiblity from "@/components/utils/component-visibility";
import useAIContext from "@/hooks/use-ai-context";
import useAIResponseMutation from "@/hooks/use-ai-response-mutation";
import useRecorder from "@/hooks/use-recorder";
import React, { useEffect, useState } from "react";
import { blobToBase64 } from "@/utils/client";
import { LuSpeech } from "react-icons/lu";
import cn from "@/utils/cn";
import { Part } from "@google/genai";
import { HistoryItem } from "@/actions/generate-audio";
import { motion, AnimatePresence, number } from "framer-motion";

function createHistoryItem(
  role: "user" | "model",
  text: string,
  base64Audio?: string,
  base64Video?: string
): HistoryItem {
  const parts: Part[] = [{ text }];
  if (base64Video)
    parts.push({ inlineData: { mimeType: "video/webm", data: base64Video } });
  if (base64Audio)
    parts.push({ inlineData: { mimeType: "audio/mp3", data: base64Audio } });
  return { role, parts };
}

async function playHausaAudio(text: string, voice: "Male" | "Female") {
  console.log("called");
  try {
    const res = await fetch("/api/hausa-audio", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, voice: "Male" }),
    });

    if (!res.ok) {
      throw new Error("Failed to get Hausa audio");
    }

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);

    return new Audio(url);
  } catch (error) {
    console.error("Failed to get Hausa audio");
  }
}

export default function NewChat() {
  const {
    captionOn,
    audioOn,
    videoOn,
    setTranscripts,
    recordedVideoChunks,
    selectedVoice,
    language,
    chatHistory,
    setChatHistory,
  } = useAIContext();

  const { startRecording, stopRecording, recording, getChuncks } = useRecorder();
  const { mutateAsync, isPending } = useAIResponseMutation();
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);

  // we can use this state to detect whether the user as pressed the stop response button.
  // Useful for determining if we should play audio

  async function generateAIResponse(chunks: Blob[]) {
    try {
      const base64Audio = await blobToBase64(new Blob(chunks, { type: "audio/mp3" }));
      const base64Video = await blobToBase64(new Blob(recordedVideoChunks, { type: "video/webm" }));
      const response = await mutateAsync({
        base64Audio,
        base64Video,
        voice: selectedVoice,
        history: chatHistory,
      });

      const userQuery = createHistoryItem("user", "reply to audio and video contents", base64Audio);
      const aiResponse = createHistoryItem("model", response.transcript ?? "");
      setChatHistory([...chatHistory, userQuery, aiResponse]);

      setTranscripts(response.transcript ?? "");
      if (response.language !== "Hausa" || !response.transcript) return;

      const audio = await playHausaAudio(response.transcript, selectedVoice);
      if (!audio) {
        alert("Couldn not retrieve audio");
        if (!recording && audioOn) startRecording();
        return;
      }
      audio.addEventListener("ended", () => {
        if (!recording && audioOn) startRecording();
      });
      setAudioElement(audio);
      audio.play();
    } catch (error) {
      if (!recording && audioOn) startRecording();
      console.error("AI response error:", error);
      alert("Error getting response");
    }
  }

  useEffect(() => {
    const chunks = getChuncks();
    if (recording || chunks.length === 0) return;
    generateAIResponse(chunks);
  }, [recording]);

  useEffect(() => {
    if (!audioOn) {
      stopRecording();
      return;
    }
    startRecording();
  }, [audioOn]);

  return (
    <motion.div
      className="relative h-screen w-screen text-white flex flex-col font-sans transition-all overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* Header */}
      <ChatHeader />

      {/* Speech Indicator */}
      <ComponentVisiblity show={!!(audioElement && !audioElement.paused)}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 15 }}
          className="fixed bottom-32 left-6 z-20 max-md:left-1/2 max-md:-translate-x-1/2"
        >
          <LuSpeech className="animate-pulse text-gray-900 dark:text-white" size={35} />
        </motion.div>
      </ComponentVisiblity>

      {/* Main Content */}
      <main className="flex flex-col lg:flex-row flex-grow items-center justify-center gap-10 px-6 relative overflow-hidden">
        {/* 3D Scene */}
        <motion.div
          className={cn(
            "w-[400px] max-md:h-[200px] max-md:w-[90%] flex justify-center items-center",
            videoOn && "fixed sm:right-0 bottom-40 md:bottom-0 z-10"
          )}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, type: "spring", stiffness: 90, damping: 18 }}
        >
          <SplineChart
            scene="/scene.splinecode"
            className={cn(
              "max-md:scale-[.55] scale-[.68] z-10",
              videoOn && "!scale-[.3]"
            )}
          />
        </motion.div>

        {/* Transcript — centered above footer on mobile */}
        <AnimatePresence>
          {captionOn && (
            <motion.div
              key="transcript"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute bottom-[6rem] left-1/2 -translate-x-1/2 max-md:w-[90%] text-center z-30"
            >
              <Transcript loading={isPending} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Video Component */}
        <AnimatePresence>{videoOn && <Video />}</AnimatePresence>
      </main>

      {/* Footer — sticky and responsive */}
      <motion.div
        className="sticky bottom-0 left-0 right-0 z-40 backdrop-blur-lg bg-black/40"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 80, damping: 12 }}
      >
        <ChatFooter
          recording={recording}
          loadingAIResponse={isPending}
          pauseAIResponse={() => {
            audioElement?.pause();
            if (!recording && audioOn) startRecording();
          }}
        />
      </motion.div>
    </motion.div>
  );
}
