"use client";

import useAIContext from "@/hooks/use-ai-context";
import { BiInfoCircle } from "react-icons/bi";
import { IoClose } from "react-icons/io5";

export default function Settings() {
  const { selectedVoice, setSelectedVoice, language, setLanguage, pauseTime, setPauseTime, maxChatHistoryLength } = useAIContext();

  return (
    <div
      className="fixed top-20 right-0 sm:right-4 z-50 sm:w-[320px] w-full sm:h-auto h-screen 
      sm:rounded-2xl sm:shadow-md sm:border border-gray-200 dark:border-gray-800 
      bg-white dark:bg-[#0b0f19] flex flex-col sm:p-6 p-8 transition-all duration-300"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Settings</h2>

        {/* Close button (mobile only) */}
        <button
          type="button"
          title="Close"
          onClick={() => window.history.back()}
          className="sm:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <IoClose size={22} />
        </button>
      </div>

      {/* Voice Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-400">Voice Character</label>
        <div className="flex sm:flex-col md:flex-row flex-col gap-3">
          {["Male", "Female"].map((voice) => (
            <button
              key={voice}
              type="button"
              title={`Select ${voice}`}
              onClick={() => setSelectedVoice(voice as "Male" | "Female")}
              className={`flex-1 border rounded-lg py-2 text-center transition-colors ${
                selectedVoice === voice
                  ? "bg-blue-600 text-white border-blue-600"
                  : "border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              {voice}
            </button>
          ))}
        </div>
      </div>

      {/* Language Dropdown */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-400">Language</label>
        <select
          title="Language Selection"
          value={language}
          onChange={(e) => setLanguage(e.target.value as "English" | "Hausa")}
          className="w-full border border-gray-300 dark:border-gray-700 rounded-lg py-2 px-3 bg-transparent text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          {/* <option>English</option> */}
          <option>Hausa</option>
        </select>
      </div>

      {/* Pause Timer */}
      <div className="mb-8">
        <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-400">Wait time before AI responds (seconds)</label>
        <input
          title="Stop Timer"
          type="number"
          name="timer"
          id="timer"
          value={pauseTime}
          onChange={(e) => setPauseTime(Number(e.target.value))}
          placeholder="e.g. 5 (A number between 7 and 5"
          min={1.5}
          max={10}
          className="w-full border border-gray-300 dark:border-gray-700 rounded-lg py-2 px-3 bg-transparent text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      <p className="text-gray-900 dark:text-blue-300 text-sm flex gap-2">
        <BiInfoCircle className="mt-1 text-lg" />
        The AI only remembers up to your last {maxChatHistoryLength} requests
      </p>
    </div>
  );
}
