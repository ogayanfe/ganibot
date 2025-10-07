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

export default function NewChat() {
  const { captionOn, audioOn, videoOn, setTranscripts } = useAIContext();
  const { startRecording, stopRecording, recording, getChuncks } = useRecorder();
  const { mutateAsync, isPending } = useAIResponseMutation();

  async function generateAIResponse(chunks: Blob[]) {
    try {
      const base64Audio = await blobToBase64(new Blob(chunks, { type: "audio/mp3" }));
      const response = await mutateAsync({ base64Audio });
      setTranscripts(response.transcript ?? "");
      if (response.audioBase64) {
        const audio = new Audio(`data:audio/wav;base64,${response.audioBase64}`);
        audio.addEventListener("ended", () => {
          if (!recording && audioOn) startRecording();
        });
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
    <div className="h-screen w-screen max-md:min-h-[900px] text-white flex items-center justify-center font-sans transition-all overflow-y-auto">
      <ChatHeader />
      <main className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-10 px-6 flex-grow">
        <div className="w-[400px] max-md:h-[200px]">
          <SplineChart scene={"/scene.splinecode"} className="max-md:scale-50" />
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

      <ChatFooter recording={recording} loadingAIResponse={isPending} />
    </div>
  );
}
