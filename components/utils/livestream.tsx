"use client";

import { motion, AnimatePresence } from "framer-motion";
import useAIContext from "@/hooks/use-ai-context";
import React, { useEffect, useRef, useState } from "react";

export default function LiveStream() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const { videoOn, recordedVideoChunks, setRecordedVideoChunks } = useAIContext();

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) videoRef.current.srcObject = stream;

      const recorder = new MediaRecorder(stream);
      const chunks: Blob[] = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) setRecordedVideoChunks([...recordedVideoChunks, e.data]);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: "video/webm" });
        setRecordedVideoChunks(chunks);
        setIsRecording(false);
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
    } catch (err: any) {
      alert("Camera access failed: " + err.message);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      mediaRecorder.stream.getTracks().forEach((track) => track.stop());
      setIsRecording(false);
    }
  };

  useEffect(() => {
    if (videoOn) {
      startRecording();
      return;
    }
    stopRecording();
    return () => stopRecording();
  }, [videoOn]);

  return (
    <main className="flex flex-col items-center justify-center h-screen w-screen fixed left-0 top-0 overflow-hidden">
      <AnimatePresence>
        {videoOn && (
          <motion.div
            key="camera"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full h-full flex items-center justify-center"
          >
            {/* Subtle animated border glow */}
            <motion.div
              animate={{
                boxShadow: isRecording
                  ? ["0 0 0px rgba(255,0,0,0)", "0 0 20px rgba(255,0,0,0.3)", "0 0 0px rgba(255,0,0,0)"]
                  : ["0 0 0px rgba(255,255,255,0)", "0 0 20px rgba(255,255,255,0.2)", "0 0 0px rgba(255,255,255,0)"],
              }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute w-[98%] h-[98%] rounded-2xl border border-gray-300 dark:border-gray-700"
            />

            {/* Camera Feed */}
            <motion.video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className="w-full h-full rounded-2xl object-cover shadow-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
