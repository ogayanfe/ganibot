"use client";

import { FaClosedCaptioning } from "react-icons/fa6";
import { VscSettings } from "react-icons/vsc";
import { LuCaptionsOff } from "react-icons/lu";
import IconButton from "../button/icon-button";
import Avatar from "../avatar";
import ToggleTheme from "@/utils/toggle-theme";
import HeaderTitle from "../header-title";
import useAIContext from "@/hooks/use-ai-context";
import Settings from "./settings";
import { useState } from "react";
import ComponentVisiblity from "../utils/component-visibility";
import { motion, AnimatePresence } from "framer-motion";

export default function ChatHeader() {
  const { captionOn, setCaptionOn } = useAIContext();
  const [isSettingOpen, setIsSettingOpen] = useState(false);

  return (
    <motion.header
      className="flex justify-between items-center p-6 px-8 fixed top-0 w-full z-20 backdrop-blur-md shadow-sm"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 80, damping: 15 }}
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <HeaderTitle />
      </motion.div>

      <div className="flex items-center gap-5">
        <motion.div whileTap={{ scale: 0.85, rotate: -5 }} whileHover={{ scale: 1.05 }}>
          <IconButton
            label="toggle caption"
            type="button"
            title="Toggle Caption"
            className="dark:hover:text-white transition text-gray-700 dark:text-blue-100"
            onClick={() => setCaptionOn(!captionOn)}
          >
            {captionOn ? <LuCaptionsOff size={22} /> : <FaClosedCaptioning size={22} />}
          </IconButton>
        </motion.div>

        <motion.div
          whileTap={{ rotate: 25, scale: 0.9 }}
          whileHover={{ scale: 1.05, rotate: -5 }}
          transition={{ type: "spring", stiffness: 200, damping: 12 }}
        >
          <IconButton
            label="settings"
            type="button"
            title="Settings"
            className="dark:hover:text-white transition text-gray-700 dark:text-blue-100"
            onClick={() => setIsSettingOpen((prev) => !prev)}
          >
            <VscSettings size={22} />
          </IconButton>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }}>
          <ToggleTheme />
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }}>
          <Avatar />
        </motion.div>
      </div>

      <AnimatePresence>
        {isSettingOpen && (
          <motion.div
            key="settings-panel"
            className="fixed inset-0 backdrop-blur-sm sm:bg-transparent sm:backdrop-blur-none sm:inset-auto sm:top-4 sm:right-4 sm:w-auto sm:h-auto z-30"
            onClick={() => setIsSettingOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <motion.div
              className="relative sm:top-0 sm:right-0 sm:translate-x-0 sm:translate-y-0"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.85, opacity: 0, y: -10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 150, damping: 15 }}
            >
              <Settings />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
