import useAIContext from "@/hooks/use-ai-context";
import LiveStream from "../utils/livestream";

export default function Video() {
const { videoOn } = useAIContext()
  return (
    <div className="rounded-2xl shadow-sm p-6 flex flex-col justify-between max-w-xl">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-indigo-400">Live Recording</h2>
        {videoOn ? <LiveStream /> : "show video"}
      
        <a id="downloadLink">Download Video</a>
        <div className="bg-gray-800 p-3 rounded-lg font-mono text-center text-yellow-300 text-sm break-words"></div>
      </div>
    </div>
  );
}