"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import { PiSparkleThin } from "react-icons/pi";

export default function NotFoundPage() {
  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-100 dark:from-[#0B0F19] dark:via-[#090E17] dark:to-[#0B0F19] text-center px-6 text-gray-800 dark:text-gray-200">
      {/* Subtle glowing aura */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.25, scale: [1, 1.15, 1] }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-0 w-[400px] h-[400px] bg-blue-500/20 blur-[150px] rounded-full mx-auto"
      />

      {/* Icon - symbolizes guidance */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, rotate: -8 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{
          duration: 1,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-100/60 dark:bg-blue-500/10 mb-6"
      >
        <PiSparkleThin className="text-4xl text-blue-500 dark:text-blue-400" />
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.8,
          ease: [0.25, 1, 0.5, 1],
        }}
        className="text-[4rem] sm:text-[6rem] font-semibold bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent tracking-tight mb-2"
      >
        404
      </motion.h1>

      {/* Message */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.2,
          duration: 0.9,
          ease: "easeOut",
        }}
        className="text-lg sm:text-xl max-w-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed"
      >
        Gani tried to find this page, but it seems to have drifted away.  
        <br />Let’s guide you back to your purpose 🌍.
      </motion.p>

      {/* Hausa Translation */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="italic text-sm text-gray-500 dark:text-gray-500 mb-8"
      >
        “Gani bai sami wannan shafin ba, amma zai taimaka maka ka koma gida.” 💫
      </motion.p>

      {/* Back Button */}
      <motion.div
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 250, damping: 20 }}
      >
        <Link
          href="/"
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-blue-500 text-white font-medium shadow-md hover:shadow-lg hover:bg-blue-600 transition-all duration-300"
        >
          <FiArrowLeft className="text-lg" />
          Return Home
        </Link>
      </motion.div>

      {/* Footer note */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="text-sm mt-10 text-gray-500 dark:text-gray-500"
      >
        Built with 💙 by <span className="font-semibold">Gani AI</span> — guiding voices with purpose.
      </motion.p>
    </main>
  );
}
