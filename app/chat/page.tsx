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
import React, { useEffect, useRef, useState } from "react";
import { blobToBase64 } from "@/utils/client";
import { LuSpeech } from "react-icons/lu";
import cn from "@/utils/cn";

export default function NewChat() {
  const { captionOn, audioOn, videoOn, setTranscripts, recordedVideoChunks } = useAIContext();
  const { startRecording, stopRecording, recording, getChuncks } = useRecorder();
  const { mutateAsync, isPending } = useAIResponseMutation();
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);

  async function generateAIResponse(chunks: Blob[]) {
    try {
      const base64Audio = await blobToBase64(new Blob(chunks, { type: "audio/mp3" }));
      const base64Video = await blobToBase64(new Blob(recordedVideoChunks, { type: "video/webm" }));
      console.log(base64Video);
      const response = await mutateAsync({ base64Audio, base64Video });
      setTranscripts(response.transcript ?? "");
      if (response.audioBase64) {
        const audio = new Audio(`data:audio/wav;base64,${response.audioBase64}`);
        audio.addEventListener("ended", () => {
          if (!recording && audioOn) startRecording();
        });
        setAudioElement(audio);
        audio.play();
      }
    } catch (error) {
      if (!recording && audioOn) startRecording();
      alert("Error getting response");
    }
  }

  useEffect(() => {
    const chunks = getChuncks();
    if (recording || chunks.length == 0) return;
    console.log(recording, chunks);
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
    <div className="h-screen w-screen text-white flex items-center justify-center font-sans transition-all overflow-y-auto">
      <ChatHeader />
      <ComponentVisiblity show={!!(audioElement && !audioElement?.paused)}>
        <LuSpeech className="fixed bottom-40 left-10 z-20 animate-pulse text-gray-900 dark:text-white" size={35} />
      </ComponentVisiblity>
      <main className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-10 px-6 flex-grow max-md:min-h-[900px]">
        <div className={cn("w-[400px] max-md:h-[200px]", videoOn && "-right-20 sm:right-0 bottom-40 h-[400px] md:bottom-0 fixed z-20")}>
          <SplineChart
            scene={"/scene.splinecode"}
            className={cn("max-md:scale-[.45] scale-[.68] z-[100]", videoOn && "!scale-[.2] sm:!scale-[.3]")}
          />
        </div>
        <ComponentVisiblity show={captionOn}>
          <Transcript loading={isPending} />
        </ComponentVisiblity>
        <ComponentVisiblity show={videoOn}>
          <div className={`${captionOn}`}>
            <Video />
          </div>
        </ComponentVisiblity>
      </main>

      <ChatFooter
        recording={recording}
        loadingAIResponse={isPending}
        pauseAIResponse={() => {
          audioElement?.pause();
          if (!recording && audioOn) startRecording();
        }}
      />
    </div>
  );
}
