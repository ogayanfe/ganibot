"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
import IconButton from "@/components/button/icon-button";
import useThemeContext from "@/hooks/use-theme-context";

export default function ToggleTheme() {
  const { darkTheme, toggleTheme } = useThemeContext();

  return (
    <IconButton
      label="Toggle theme"
      onClick={toggleTheme}
      className="relative flex items-center justify-center rounded-full p-2 transition-all duration-300 hover:scale-105 hover:bg-gray-100 dark:hover:bg-[#1a1a1a]"
    >
      <AnimatePresence mode="wait" initial={false}>
        {darkTheme ? (
          <motion.div
            key="light-icon"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{
              duration: 0.45,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <MdOutlineLightMode className="text-2xl text-gray-700 dark:text-gray-200" />
          </motion.div>
        ) : (
          <motion.div
            key="dark-icon"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{
              duration: 0.45,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <MdDarkMode className="text-2xl text-gray-700 dark:text-gray-200" />
          </motion.div>
        )}
      </AnimatePresence>
    </IconButton>
  );
}
