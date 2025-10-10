'use client'

import Link from "next/link"
import { motion } from "framer-motion"
import React from "react"
import { cn } from "./cn"

interface IconLinkPropType extends React.ComponentProps<typeof Link> {
  label: string
  children: React.ReactNode
  className?: string
}

export default function IconLink({
  label,
  children,
  className,
  ...props
}: IconLinkPropType) {
  return (
    <motion.div
      whileHover={{
        scale: 1.08,
        y: -2,
      }}
      whileTap={{
        scale: 0.95,
      }}
      transition={{
        type: "spring",
        stiffness: 250,
        damping: 15,
      }}
      className="inline-flex"
    >
      <Link
        {...props}
        aria-label={label}
        className={cn(
          `
            relative inline-flex items-center justify-center 
            text-gray-700 dark:text-gray-200 
            hover:text-black dark:hover:text-white 
            transition-colors duration-300 ease-out
            p-2 rounded-2xl 
            backdrop-blur-md bg-white/30 dark:bg-white/5 
            shadow-sm hover:shadow-md
            border border-transparent hover:border-gray-200 dark:hover:border-gray-700
            focus-visible:ring-2 focus-visible:ring-blue-500/40
          `,
          className
        )}
      >
        <span className="sr-only">{label}</span>
        <motion.span
          initial={{ opacity: 0, y: 2 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="text-[1.6rem] sm:text-[1.8rem]"
        >
          {children}
        </motion.span>
      </Link>
    </motion.div>
  )
}
