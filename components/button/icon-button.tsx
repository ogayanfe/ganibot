"use client";

import React, { DetailedHTMLProps, ButtonHTMLAttributes } from "react";
import { motion } from "framer-motion";

interface IconButtonPropType extends React.ComponentProps<typeof motion.button> {
  label: string;
  children: React.ReactNode;
}

export default function IconButton(props: IconButtonPropType) {
  const { label, children, className, ...rest } = props;

  return (
    <motion.button
      type="button"
      title={label}
      {...rest}
      whileTap={{ scale: 0.93, opacity: 0.9 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`cursor-pointer flex items-center justify-center rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${className}`}
    >
      {/* Accessibility Label (off-screen for screen readers) */}
      <span className="sr-only">{label}</span>

      {/* Icon container with soft shadow and subtle fade */}
      <motion.span
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.span>
    </motion.button>
  );
}
