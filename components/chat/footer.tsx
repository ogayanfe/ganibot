"use client";

import { motion, AnimatePresence } from "framer-motion";
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
      <motion.footer
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex justify-center items-center gap-10 py-6 border-gray-800 h-[200px] fixed bottom-0 w-screen text-gray-900 dark:text-gray-50 bg-transparent backdrop-blur-lg"
      >
        {/* Video Toggle */}
        <motion.div whileTap={{ scale: 0.9 }}>
          <IconButton label="video" onClick={() => setVideoOn(!videoOn)} className="z-50">
            <motion.div
              key={videoOn ? "on" : "off"}
              initial={{ rotate: 0, opacity: 0.6 }}
              animate={{ rotate: videoOn ? 10 : 0, opacity: 1 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              {videoOn ? <CiVideoOn size={35} /> : <CiVideoOff size={35} />}
            </motion.div>
          </IconButton>
        </motion.div>

        {/* Central Mic / Loader */}
        <motion.div className="relative flex items-center justify-center" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <motion.div
            animate={
              recording
                ? {
                    scale: [1, 1.1, 1],
                    boxShadow: ["0 0 0px rgba(255,0,0,0)", "0 0 25px rgba(255,0,0,0.4)", "0 0 0px rgba(255,0,0,0)"],
                  }
                : {}
            }
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 rounded-full"
          />
          <IconButton
            type="button"
            label="Enable Caption"
            onClick={() => setAudioOn(!audioOn)}
            className="relative p-6 rounded-full bg-gradient-to-br z-50 from-indigo-500 text-white to-purple-600 shadow-lg hover:shadow-xl transition"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={audioOn ? (recording ? "recording" : loadingAIResponse ? "loading" : "mic-on") : "mic-off"}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
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
              </motion.div>
            </AnimatePresence>
          </IconButton>
        </motion.div>

        {/* Stop / Close */}
        <ComponentVisiblity show={!!pauseAIResponse}>
          <motion.div whileTap={{ scale: 0.9 }}>
            <IconButton label="close" onClick={pauseAIResponse} className="z-50">
              <motion.div
                initial={{ rotate: -10, opacity: 0.7 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <HiStopCircle size={55} />
              </motion.div>
            </IconButton>
          </motion.div>
        </ComponentVisiblity>
      </motion.footer>
    </AnimatePresence>
  );
}
