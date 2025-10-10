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
import { motion, AnimatePresence } from "framer-motion";

function createHistoryItem(
  role: "user" | "model",
  text: string,
  base64Audio?: string,
  base64Video?: string
): HistoryItem {
  const parts: Part[] = [{ text }];

  if (base64Video) parts.push({ inlineData: { mimeType: "video/webm", data: base64Video } });
  if (base64Audio) parts.push({ inlineData: { mimeType: "audio/mp3", data: base64Audio } });

  return { role, parts };
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

  async function generateAIResponse(chunks: Blob[]) {
    try {
      const base64Audio = await blobToBase64(new Blob(chunks, { type: "audio/mp3" }));
      const base64Video = await blobToBase64(new Blob(recordedVideoChunks, { type: "video/webm" }));
      const response = await mutateAsync({ base64Audio, base64Video, language, voice: selectedVoice, history: chatHistory });

      const userQuery = createHistoryItem("user", "reply to audio and video contents", base64Audio);
      const aiResponse = createHistoryItem("model", response.transcript ?? "");
      setChatHistory([...chatHistory, userQuery, aiResponse]);
      setTranscripts(response.transcript ?? "");

      if (response.audioBase64 && response.language === "Hausa") {
        const audio = new Audio(`data:audio/wav;base64,${response.audioBase64}`);
        audio.addEventListener("ended", () => {
          if (!recording && audioOn) startRecording();
        });
        setAudioElement(audio);
        audio.play();
      }
    } catch {
      if (!recording && audioOn) startRecording();
      alert("Error getting response");
    }
  }

  useEffect(() => {
    const chunks = getChuncks();
    if (!recording && chunks.length > 0) generateAIResponse(chunks);
  }, [recording]);

  useEffect(() => {
    if (audioOn) startRecording();
    else stopRecording();
  }, [audioOn]);

  return (
    <motion.div
      className="h-screen w-screen text-white flex flex-col items-center justify-center font-sans transition-all overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      {/* Header with soft fade-down */}
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 80 }}
      >
        <ChatHeader />
      </motion.div>

      {/* Floating Speech Icon */}
      <AnimatePresence>
        {audioElement && !audioElement?.paused && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 12 }}
          >
            <LuSpeech className="fixed bottom-40 left-10 z-20 text-gray-900 dark:text-white animate-pulse" size={35} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <motion.main
        className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-10 px-6 flex-grow max-md:min-h-[900px]"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
      >
        {/* 3D Spline Scene */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.8, type: "spring", stiffness: 100 }}
          className={cn(
            "w-[400px] max-md:h-[200px] max-md:flex-grow",
            videoOn && "-right-20 sm:right-0 bottom-40 h-[400px] md:bottom-0 fixed z-20"
          )}
        >
          <SplineChart
            scene="/scene.splinecode"
            className={cn("max-md:scale-[.45] scale-[.68] z-20", videoOn && "!scale-[.2] sm:!scale-[.3]")}
          />
        </motion.div>

        <ComponentVisiblity show={captionOn}>
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, type: "spring", damping: 20 }}
          >
            <Transcript loading={isPending} />
          </motion.div>
        </ComponentVisiblity>

        <ComponentVisiblity show={videoOn}>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.2, type: "spring", stiffness: 120 }}
          >
            <Video />
          </motion.div>
        </ComponentVisiblity>
      </motion.main>

      {/* Footer */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.5, type: "spring", stiffness: 90 }}
        className="w-full"
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
