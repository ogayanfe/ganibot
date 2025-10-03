"use client";

import SplineChart from "@/components/chart/spline";
import ChatFooter from "@/components/chat/footer";
import ChatHeader from "@/components/chat/header";
import React from "react";
export default function NewChat() {
  return (
    <div className="h-screen w-screen text-white flex items-center justify-center font-sans transition-all duration-300 overflow-y-auto">
      <ChatHeader />

      <main className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-10 px-6 flex-grow">
        <div className="w-[400px]">
          <SplineChart scene={"/scene.splinecode"} />
        </div>
        <div className="rounded-2xl shadow-xl p-6 flex flex-col justify-between max-w-xl">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-indigo-400">Transcription</h2>
            <p className="text-2xl text-gray-300 font-mono">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat dolore quam animi aperiam amet. Voluptates, minima animi, nulla dolores
              odit, dolorum molestias magnam libero id totam suscipit officiis nobis voluptatem.
            </p>
            <div className="bg-gray-800 p-3 rounded-lg font-mono text-center text-yellow-300 text-sm break-words"></div>
          </div>
        </div>
      </main>

      <ChatFooter />
    </div>
  );
}
