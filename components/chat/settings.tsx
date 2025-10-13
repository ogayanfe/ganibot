"use client";

import useAIContext from "@/hooks/use-ai-context";
import { BiInfoCircle } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { motion, AnimatePresence, Variants } from "framer-motion";

export default function Settings() {
  const { selectedVoice, setSelectedVoice, language, setLanguage, pauseTime, setPauseTime, maxChatHistoryLength } = useAIContext();

  // ✅ Typed and TS-safe motion variants
  const settingsVariants: Variants = {
    hidden: { opacity: 0, y: 40, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.35, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      y: 30,
      scale: 0.97,
      transition: { duration: 0.25, ease: "easeInOut" },
    },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="settings-panel"
        variants={settingsVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="fixed top-20 right-0 sm:right-4 z-120 sm:w-[340px] w-full sm:h-auto h-screen 
          sm:rounded-2xl sm:shadow-lg sm:border border-gray-200 dark:border-gray-800 
          bg-white dark:bg-[#0b0f19] flex flex-col sm:p-6 p-8
          backdrop-blur-md transition-all duration-300"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 tracking-tight">Settings</h2>

          {/* Close button (mobile only) */}
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            type="button"
            title="Close"
            onClick={() => window.history.back()}
            className="sm:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
          >
            <IoClose size={22} />
          </motion.button>
        </div>

        {/* Voice Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-400">Voice Character</label>
          <div className="flex sm:flex-col md:flex-row flex-col gap-3">
            {["Male", "Female"].map((voice) => (
              <motion.button
                key={voice}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="button"
                title={`Select ${voice}`}
                onClick={() => setSelectedVoice(voice as "Male" | "Female")}
                className={`flex-1 border rounded-lg py-2 text-center font-medium transition-all duration-200
                  ${
                    selectedVoice === voice
                      ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                      : "border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
              >
                {voice}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Language Dropdown */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-400">Language</label>
          <motion.select
            whileFocus={{ scale: 1.02 }}
            title="Language Selection"
            value={language}
            onChange={(e) => setLanguage(e.target.value as "English" | "Hausa")}
            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg py-2 px-3 
              bg-transparent text-gray-800 dark:text-gray-200 focus:outline-none 
              focus:ring-2 focus:ring-blue-600 transition"
          >
            {/* <option>English</option> */}
            <option>Hausa</option>
          </motion.select>
        </div>

        {/* Pause Timer */}
        <div className="mb-8">
          <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-400">Time Stopper (seconds)</label>
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="number"
            title="Stop Timer"
            name="timer"
            id="timer"
            value={pauseTime}
            onChange={(e) => setPauseTime(Number(e.target.value))}
            placeholder="e.g. 5"
            min={1.5}
            max={10}
            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg py-2 px-3 
              bg-transparent text-gray-800 dark:text-gray-200 focus:outline-none 
              focus:ring-2 focus:ring-blue-600 transition"
          />
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-900 dark:text-blue-300 text-sm flex gap-2 items-start leading-snug"
        >
          <BiInfoCircle className="text-lg flex-shrink-0 mt-[2px]" />
          The AI remembers only your last {maxChatHistoryLength} requests.
        </motion.p>
      </motion.div>
    </AnimatePresence>
  );
}
