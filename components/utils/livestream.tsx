"use client";

import useAIContext from "@/hooks/use-ai-context";
import React, { useEffect, useRef, useState } from "react";

export default function LiveStream() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const { videoOn } = useAIContext();

  // Start the camera and recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) videoRef.current.srcObject = stream;

      const recorder = new MediaRecorder(stream);
      const chunks: Blob[] = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: "video/webm" });
        setRecordedChunks(chunks);
        setIsRecording(false);
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
    } catch (err: any) {
      alert("Camera access failed: " + err.message);
    }
  };

  // Stop the recording
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
    <main className="flex flex-col items-center justify-center h-screen w-screen fixed left-0 top-0">
      <video ref={videoRef} autoPlay muted playsInline className="w-full h-full rounded-2xl shadow-md dark:border-gray-300 border-black" />
    </main>
  );
}
