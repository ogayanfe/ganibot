"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import useAIContext from "@/hooks/use-ai-context";
import { cn } from "../utils/cn";

interface IProps {
  loading: boolean;
}

export default function Transcript({ loading }: IProps) {
  const { transcripts, videoOn } = useAIContext();
  const [displayedText, setDisplayedText] = useState("");
  const typingSpeed = 35; // Adjust for faster/slower typing (ms per character)

  // Typing effect
  useEffect(() => {
    if (!transcripts || transcripts.length === 0) {
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

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={videoOn ? "video-on" : "video-off"}
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{
          duration: 0.5,
          ease: "easeOut",
        }}
        className={cn(
          "rounded-2xl p-6 flex flex-col justify-between max-w-xl flex-grow z-20 backdrop-blur-md shadow-lg border",
          videoOn
            ? "fixed bottom-40 bg-gray-800/80 text-white border-gray-700"
            : "text-gray-900 dark:text-white bg-white/40 dark:bg-gray-900/40 border-gray-300/30 dark:border-gray-700/30"
        )}
      >
        <motion.div key={displayedText} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="space-y-4">
          <p
            className={cn(
              "text-lg md:text-2xl font-mono leading-relaxed whitespace-pre-line",
              loading && "animate-pulse text-gray-400 dark:text-gray-500"
            )}
          >
            {loading ? "Generating Response..." : displayedText.length > 0 ? displayedText : "Your audio transcripts will show here"}
            {/* Blinking cursor effect */}
            {!loading && transcripts && displayedText.length < transcripts.length && (
              <motion.span
                className="inline-block w-[8px] h-5 bg-gray-800 dark:bg-white ml-1"
                animate={{ opacity: [0, 1] }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            )}
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
