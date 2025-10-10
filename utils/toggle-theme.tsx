"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
import IconButton from "@/components/button/icon-button";
import useThemeContext from "@/hooks/use-theme-context";

export default function ToggleTheme() {
  const { darkTheme, toggleTheme } = useThemeContext();

  return (
    <IconButton
      label="toggle dark theme"
      onClick={toggleTheme}
      className="relative overflow-hidden"
    >
      <AnimatePresence mode="wait" initial={false}>
        {darkTheme ? (
          <motion.div
            key="light-icon"
            initial={{ y: 20, opacity: 0, rotate: -10, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, rotate: 0, scale: 1 }}
            exit={{ y: -20, opacity: 0, rotate: 10, scale: 0.9 }}
            transition={{
              duration: 0.45,
              ease: [0.16, 1, 0.3, 1], // Apple’s “fluid” cubic-bezier curve
            }}
          >
            <MdOutlineLightMode className="text-3xl text-gray-500 dark:text-blue-400" />
          </motion.div>
        ) : (
          <motion.div
            key="dark-icon"
            initial={{ y: -20, opacity: 0, rotate: 10, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, rotate: 0, scale: 1 }}
            exit={{ y: 20, opacity: 0, rotate: -10, scale: 0.9 }}
            transition={{
              duration: 0.45,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <MdDarkMode className="text-3xl text-gray-500 dark:text-blue-400" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subtle background pulse when toggled */}
      <motion.div
        key={darkTheme ? "dark-bg" : "light-bg"}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1.2, opacity: 0.1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{
          duration: 0.4,
          ease: [0.4, 0, 0.2, 1],
        }}
        className="absolute inset-0 rounded-full bg-blue-400/30 pointer-events-none"
      />
    </IconButton>
  );
}
