"use client";

import useAIContext from "@/hooks/use-ai-context";
import ComponentVisiblity from "../utils/component-visibility";

interface IProps {
  loading: boolean;
}

export default function Transcript({ loading }: IProps) {
  const { transcripts } = useAIContext();

  return (
    <div className="rounded-2xl p-6 flex flex-col justify-between max-w-xl flex-grow">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-indigo-400">Transcription</h2>
        <p className="text-lg md:text-2xl dark:text-gray-300 text-gray-700 font-mono">{transcripts ?? "NOTHING YET"}</p>
        <ComponentVisiblity show={loading}>
          <div className="bg-gray-800 p-3 w-[90%] rounded-lg font-mono text-center text-yellow-300 text-sm break-words animate-pulse"></div>
          <div className="bg-gray-800 p-3 w-[70%] rounded-lg font-mono text-center text-yellow-300 text-sm break-words animate-pulse"></div>
        </ComponentVisiblity>
      </div>
    </div>
  );
}
