"use client";

import { CiVideoOff, CiVideoOn } from "react-icons/ci";
import { HiStopCircle } from "react-icons/hi2";
import { TiMicrophone } from "react-icons/ti";
import IconButton from "../button/icon-button";
import { FaMicrophoneSlash } from "react-icons/fa6";
import useAIContext from "@/hooks/use-ai-context";
import { BiLoaderCircle } from "react-icons/bi";
import { LuAudioLines } from "react-icons/lu";
import ComponentVisiblity from "../utils/component-visibility";

interface IProps {
  recording: boolean;
  loadingAIResponse: boolean;
  pauseAIResponse?: () => unknown;
}

export default function ChatFooter({ recording, loadingAIResponse, pauseAIResponse }: IProps) {
  const { audioOn, videoOn, setAudioOn, setVideoOn } = useAIContext();
  return (
    <footer className="flex justify-center items-center gap-10 py-6 border-gray-800 h-[200px] fixed bottom-0 w-screen text-gray-900 dark:text-gray-50 bg-inherit object-cover">
      <IconButton label="video" onClick={() => setVideoOn(!videoOn)} className="z-50">
        {videoOn ? <CiVideoOn size={35} /> : <CiVideoOff size={35} />}
      </IconButton>

      <div className="relative flex items-center justify-center">
        <IconButton
          type="button"
          label="Enable Caption"
          onClick={() => setAudioOn(!audioOn)}
          className="relative p-6 rounded-full bg-gradient-to-br z-50 from-indigo-500 text-white to-purple-600 shadow-lg hover:scale-105 transition transform"
        >
          {audioOn ? (
            recording ? (
              <LuAudioLines size={25} className="animate-ping" />
            ) : loadingAIResponse ? (
              <BiLoaderCircle size={45} className="animate-spin" />
            ) : (
              <TiMicrophone size={35} />
            )
          ) : (
            <FaMicrophoneSlash size={35} />
          )}
        </IconButton>
      </div>

      <ComponentVisiblity show={!!pauseAIResponse}>
        <IconButton label="close" onClick={pauseAIResponse} className="z-50">
          <HiStopCircle size={55} className="" />
        </IconButton>
      </ComponentVisiblity>
    </footer>
  );
}
