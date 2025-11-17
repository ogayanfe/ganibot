"use client";

import { AnimatePresence } from "framer-motion";
import { CiVideoOff, CiVideoOn } from "react-icons/ci";
import { HiStopCircle } from "react-icons/hi2";
import { TiMicrophone } from "react-icons/ti";
import { FaMicrophoneSlash } from "react-icons/fa6";
import { BiLoaderCircle } from "react-icons/bi";
import { LuAudioLines } from "react-icons/lu";
import IconButton from "../button/icon-button";
import useAIContext from "@/hooks/use-ai-context";
import ComponentVisiblity from "../utils/component-visibility";

interface IProps {
  recording: boolean;
  loadingAIResponse: boolean;
  pauseAIResponse?: () => unknown;
}

export default function ChatFooter({ recording, loadingAIResponse, pauseAIResponse }: IProps) {
  const { audioOn, videoOn, setAudioOn, setVideoOn } = useAIContext();

  return (
    <AnimatePresence>
      <footer
        className="flex justify-center items-center gap-10 py-6 border-gray-800 h-[200px] fixed bottom-0 w-screen text-gray-900 dark:text-gray-50 bg-transparent backdrop-blur-lg"
      >
        {/* Video Toggle */}
        <div>
          <IconButton label="video" onClick={() => setVideoOn(!videoOn)} className="z-50">
            <div
              key={videoOn ? "on" : "off"}
            >
              {videoOn ? <CiVideoOn size={35} /> : <CiVideoOff size={35} />}
            </div>
          </IconButton>
        </div>

        {/* Central Mic / Loader */}
        <div className="relative flex items-center justify-center" >
          <div className="absolute inset-0 rounded-full" />
          <IconButton
            type="button"
            label="Enable Caption"
            onClick={() => setAudioOn(!audioOn)}
            className="relative p-6 rounded-full bg-gradient-to-br z-50 from-indigo-500 text-white to-purple-600 shadow-lg hover:shadow-xl transition"
          >
            <AnimatePresence mode="wait" initial={false}>
              <div
                key={audioOn ? (recording ? "recording" : loadingAIResponse ? "loading" : "mic-on") : "mic-off"}
              >
                {audioOn ? (
                  recording ? (
                    <LuAudioLines size={25} className="text-white animate-ping" />
                  ) : loadingAIResponse ? (
                    <BiLoaderCircle size={45} className="animate-spin" />
                  ) : (
                    <TiMicrophone size={35} />
                  )
                ) : (
                  <FaMicrophoneSlash size={35} />
                )}
              </div>
            </AnimatePresence>
          </IconButton>
        </div>

        {/* Stop / Close */}
        <ComponentVisiblity show={!!pauseAIResponse}>
          <div>
            <IconButton label="close" onClick={pauseAIResponse} className="z-50">
                <HiStopCircle size={55} />
            </IconButton>
          </div>
        </ComponentVisiblity>
      </footer>
    </AnimatePresence>
  );
}
