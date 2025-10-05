"use client";

import SplineChart from "@/components/chart/spline";
import ChatFooter from "@/components/chat/footer";
import ChatHeader from "@/components/chat/header";
import Transcript from "@/components/chat/transcript";
import Video from "@/components/chat/video";
import ComponentVisiblity from "@/components/utils/component-visibility";
import useAIContext from "@/hooks/use-ai-context";
import React from "react";

export default function NewChat() {
  const { captionOn, videoOn } = useAIContext();
  return (
    <div className="h-screen w-screen text-white flex items-center justify-center font-sans transition-all overflow-y-auto">
      <ChatHeader />

      <main className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-10 px-6 flex-grow">
        <div className="w-[400px]">
          <SplineChart scene={"/scene.splinecode"} />
        </div>
        <ComponentVisiblity show={captionOn}>
          <Transcript />
        </ComponentVisiblity>
        <div className="">
          <ComponentVisiblity show={videoOn}>
            <Video />
          </ComponentVisiblity>
        </div>
      </main>

      <ChatFooter />
    </div>
  );
}
