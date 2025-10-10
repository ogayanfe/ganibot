"use client";

import { motion } from "framer-motion";
import Spline from "@splinetool/react-spline";

type SplineChartProps = {
  scene: string;
  className?: string;
};

export default function SplineChart({ scene, className }: SplineChartProps) {
  return (
    <main className="w-full h-full flex justify-center items-center overflow-hidden relative">
      {/* Smooth fade-in and scale effect for that Apple-like feel */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}
        className={`relative w-full h-[500px] max-w-6xl ${className}`}
      >
        {/* Optional: subtle floating animation for the Spline scene */}
        <motion.div
          animate={{
            y: [0, -8, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 6,
            ease: "easeInOut",
          }}
          className="w-full h-full"
        >
          <Spline scene={scene} style={{ width: "100%", height: "100%" }} />
        </motion.div>

        {/* Optional Apple-style blurred glow underlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-100/5 via-transparent to-transparent dark:from-blue-900/10 backdrop-blur-[1px]" />
      </motion.div>
    </main>
  );
}
