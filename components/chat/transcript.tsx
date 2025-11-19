"use client";

import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import useAIContext from "@/hooks/use-ai-context";
import { cn } from "../utils/cn";

interface IProps {
  loading: boolean;
}

export default function Transcript({ loading }: IProps) {
  const { transcripts, videoOn } = useAIContext();
  const [displayedText, setDisplayedText] = useState("");
  const typingSpeed = 35; // milliseconds per character

  useEffect(() => {
    if (!transcripts) {
      setDisplayedText("");
      return;
    }

    let index = 0;
    setDisplayedText("");
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + transcripts.charAt(index));
      index++;
      if (index >= transcripts.length) clearInterval(interval);
    }, typingSpeed);

    return () => clearInterval(interval);
  }, [transcripts]);

  const showCursor = !loading && displayedText.length < (transcripts?.length || 0);

  return (
    <AnimatePresence mode="wait">
      <div
        key={videoOn ? "video-on" : "video-off"}
        className={cn(
          "rounded-xl p-2 md:p-6 flex flex-col justify-between z-20 backdrop-blur-md border transition-colors duration-300",
          videoOn
            ? "fixed bottom-28 md:bottom-32 left-4 right-4 md:left-auto md:right-auto md:w-96 bg-gray-800/90 text-white border-gray-700"
            : "w-full max-w-2xl lg:max-w-3xl text-gray-900 dark:text-white bg-white/40 dark:bg-gray-900/40 border-gray-300/30 dark:border-gray-700/30"
        )}
      >
        <div
          key={displayedText}
          className="overflow-y-auto max-h-48 md:max-h-64"
        >
          <p
            className={cn(
              "text-sm md:text-lg lg:text-xl font-mono leading-relaxed whitespace-pre-wrap break-words",
              loading && "animate-pulse text-gray-400 dark:text-gray-500"
            )}
          >
            {loading
              ? "Generating Response..."
              : displayedText || "Your text will display here..."}

            {showCursor && (
              <span
                className="inline-block w-[4px] h-4 bg-gray-800 dark:bg-white ml-1"
              />
            )}
          </p>
        </div>
      </div>
    </AnimatePresence>
  );
}
