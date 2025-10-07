import useAIContext from "@/hooks/use-ai-context";
import LiveStream from "../utils/livestream";

export default function Video() {
  const { videoOn } = useAIContext();
  return <>{videoOn ? <LiveStream /> : "show video"}</>;
}
