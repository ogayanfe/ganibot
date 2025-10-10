'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Header from '@/components/header'
import { usePathname } from 'next/navigation'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()

  return (
    <div
      className={`
        flex flex-col w-screen h-screen 
        transition-colors duration-300
        bg-[#F9FAFB] text-gray-900 
        dark:bg-[#0B0F19] dark:text-gray-200
      `}
    >
      {/* Smooth slide/fade animation for header */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.6,
          ease: [0.25, 1, 0.5, 1],
        }}
      >
        <Header />
      </motion.div>

      {/* Animated main content area */}
      <AnimatePresence mode="wait">
        <motion.main
          key={pathname}
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.98 }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1], // soft cubic-bezier for fluid Apple-like motion
          }}
          className={`
            flex-grow overflow-y-auto
            scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700
            p-4 md:p-6
          `}
        >
          {children}
        </motion.main>
      </AnimatePresence>
    </div>
  )
}
