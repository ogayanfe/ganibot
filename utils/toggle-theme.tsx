'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { MdDarkMode, MdOutlineLightMode } from 'react-icons/md'
import IconButton from '@/components/button/icon-button'
import useThemeContext from '@/hooks/use-theme-context'

export default function ToggleTheme() {
  const { darkTheme, toggleTheme } = useThemeContext()

  return (
    <IconButton
      label="Toggle dark theme"
      onClick={toggleTheme}
      className="relative flex items-center justify-center"
    >
      <AnimatePresence mode="wait" initial={false}>
        {darkTheme ? (
          <motion.span
            key="light"
            initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
            transition={{
              duration: 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute"
          >
            <MdOutlineLightMode className="text-3xl text-gray-500 dark:text-blue-400" />
          </motion.span>
        ) : (
          <motion.span
            key="dark"
            initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
            transition={{
              duration: 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute"
          >
            <MdDarkMode className="text-3xl text-gray-500 dark:text-blue-400" />
          </motion.span>
        )}
      </AnimatePresence>
    </IconButton>
  )
}
