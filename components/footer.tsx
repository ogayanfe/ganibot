'use client'

import { motion } from 'framer-motion'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
      className="w-full border-t border-dashed border-gray-500 dark:border-gray-700 flex items-center justify-center text-center py-6 px-4 font-mono text-sm sm:text-base font-semibold text-gray-600 dark:text-gray-300"
    >
      <p className="flex flex-wrap justify-center items-center gap-1">
        © {year} — Built with
        <motion.span
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
          className="text-red-500 mx-1"
        >
          ❤️
        </motion.span>
        by <span className="font-extrabold ml-1">Ayomide</span> &nbsp;and&nbsp;
        <span className="font-extrabold">Ayanfeoluwa</span>
      </p>
    </motion.footer>
  )
}
