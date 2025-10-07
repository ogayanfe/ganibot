"use client";

import useAIContext from "@/hooks/use-ai-context";
import { cn } from "../utils/cn";

interface IProps {
  loading: boolean;
}

export default function Transcript({ loading }: IProps) {
  const { transcripts, videoOn } = useAIContext();

  return (
    <div
      className={cn(
        "rounded-2xl p-6 flex flex-col justify-between max-w-xl flex-grow z-20",
        videoOn && "fixed bottom-45 !bg-gray-500 p-4 !text-white dark:text-white",
        !videoOn && "text-gray-900 dark:text-white"
      )}
    >
      <div className="space-y-4">
        <p className="text-lg md:text-2xl font-mono">{transcripts.length > 0 ? transcripts : "Your audio transcripts will show here"}</p>
      </div>
    </div>
  );
}
