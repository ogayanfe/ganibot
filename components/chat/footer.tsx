"use client";

import { CiVideoOff, CiVideoOn } from "react-icons/ci";
import { TiMicrophone } from "react-icons/ti";
import IconButton from "../button/icon-button";
import { FaMicrophoneSlash } from "react-icons/fa6";
import useAIContext from "@/hooks/use-ai-context";
import { BiLoaderCircle } from "react-icons/bi";
import { LuAudioLines } from "react-icons/lu";
import { BsPauseCircle } from "react-icons/bs";

interface IProps {
  recording: boolean;
  loadingAIResponse: boolean;
}

export default function ChatFooter({ recording, loadingAIResponse }: IProps) {
  const { audioOn, videoOn, setAudioOn, setVideoOn } = useAIContext();
  return (
    <footer className="flex justify-center items-center gap-10 py-6 border-gray-800 h-[200px] fixed bottom-0 w-screen text-gray-900 dark:text-gray-50 bg-inherit dark:bg-[#0b0f19] object-cover">
      <IconButton label="video" onClick={() => setVideoOn(!videoOn)}>
        {videoOn ? <CiVideoOn size={35} /> : <CiVideoOff size={35} />}
      </IconButton>

      <div className="relative flex items-center justify-center">
        <IconButton
          type="button"
          label="Enable Caption"
          onClick={() => setAudioOn(!audioOn)}
          className="relative p-6 rounded-full bg-gradient-to-br from-indigo-500 text-white to-purple-600 shadow-lg hover:scale-105 transition transform"
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

      <IconButton label="close">
        <BsPauseCircle size={45} />
      </IconButton>
    </footer>
  );
}
