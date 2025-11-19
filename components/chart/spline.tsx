"use client";

import { motion } from "framer-motion";
import Spline from "@splinetool/react-spline";

type SplineChartProps = {
  scene: string;
  className?: string;
};

export default function SplineChart({ scene, className }: SplineChartProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.8,
        ease: "easeOut",
      }}
      className={`relative w-full h-full flex justify-center items-center ${className}`}
    >
      {/* Subtle floating animation for the Spline scene */}
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
    </motion.div>
  );
}
