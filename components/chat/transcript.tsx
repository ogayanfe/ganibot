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
          "rounded-2xl p-2 flex flex-col justify-between max-w-xl flex-grow z-20 backdrop-blur-md border transition-colors duration-300",
          videoOn
            ? "fixed bottom-40 bg-gray-800/80 text-white border-gray-700"
            : "text-gray-900 dark:text-white bg-white/40 dark:bg-gray-900/40 border-gray-300/30 dark:border-gray-700/30"
        )}
      >
        <div
          key={displayedText}
        >
          <p
            className={cn(
              "text-lg md:text-2xl font-mono leading-relaxed whitespace-pre-line",
              loading && "animate-pulse text-gray-400 dark:text-gray-500"
            )}
          >
            {loading
              ? "Generating Response..."
              : displayedText || "Your text will display here..."}

            {showCursor && (
              <span
                className="inline-block w-[8px] h-4 bg-gray-800 dark:bg-white ml-1"
              />
            )}
          </p>
        </div>
      </div>
    </AnimatePresence>
  );
}
