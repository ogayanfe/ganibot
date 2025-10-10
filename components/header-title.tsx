'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { MdOutlinePanoramaPhotosphereSelect } from 'react-icons/md'
import { Pixelify_Sans } from 'next/font/google'

const pixelify = Pixelify_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
})

export default function HeaderTitle() {
  return (
    <Link href="/" aria-label="Gani Home">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1],
        }}
        whileHover={{
          scale: 1.05,
          textShadow: '0px 0px 12px rgba(59,130,246,0.45)',
        }}
        whileTap={{ scale: 0.96 }}
        className={`
          text-slate-800 dark:text-slate-300 
          font-bold uppercase text-2xl sm:text-4xl 
          flex items-center justify-center gap-3 
          tracking-wider select-none
          transition-all duration-300
          ${pixelify.className}
        `}
      >
        <motion.span
          initial={{ rotate: -10, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
        >
          <MdOutlinePanoramaPhotosphereSelect className="text-blue-500 text-3xl sm:text-4xl" />
        </motion.span>
        Gani
      </motion.h1>
    </Link>
  )
}
