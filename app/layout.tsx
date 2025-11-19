'use client'

import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import ThemeContextProvider from '@/providers/theme-context'
import GaniSessionProvider from '@/providers/session'
import AiContextProvider from '@/providers/ai-context'
import QueryProvider from '@/providers/query'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Gani Voice Assistant',
  description: 'A bilingual AI-powered voice assistant',
  manifest: '/manifest.json',
  themeColor: '#111827',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Register Service Worker
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then(() => console.log('✅ Service Worker registered'))
          .catch((err) => console.error('SW registration failed:', err))
      })
    }
  }, [])

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} w-screen h-screen antialiased 
          bg-[#F9FAFB] text-gray-900 dark:bg-[#0B0F19] dark:text-gray-200 overflow-hidden`}
      >
        <GaniSessionProvider>
          <QueryProvider>
            <ThemeContextProvider>
              <AiContextProvider>
                {/* Page animation wrapper */}
                <AnimatePresence mode="wait">
                  <motion.main
                    key={typeof window !== 'undefined' ? window.location.pathname : ''}
                    initial={{ opacity: 0, y: 20, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -15, scale: 0.98 }}
                    transition={{
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1], // smooth cubic-bezier
                    }}
                    className="h-full w-full flex justify-center items-center"
                  >
                    {children}
                  </motion.main>
                </AnimatePresence>
              </AiContextProvider>
            </ThemeContextProvider>
          </QueryProvider>
        </GaniSessionProvider>
      </body>
    </html>
  )
}
