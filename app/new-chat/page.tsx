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
    const base64Audio = await blobToBase64(new Blob(chunks, { type: "audio/mp3" }));
    console.log(base64Audio);
    const response = await mutateAsync({ base64Audio });
    setTranscripts(response.transcript ?? "");
  }

  useEffect(() => {
    console.log(recording);
    const chunks = getChuncks();
    if (recording || chunks.length == 0) return;
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
      <main className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-10 px-6 flex-grow">
        <div className="w-[400px]">
          <SplineChart scene={"/scene.splinecode"} />
        </div>
        <ComponentVisiblity show={captionOn}>
          <Transcript loading={isPending} />
        </ComponentVisiblity>
        <div className={`${captionOn}`}>
          <ComponentVisiblity show={videoOn}>
            <Video />
          </ComponentVisiblity>
        </div>
      </main>

      <ChatFooter />
    </div>
  );
}
