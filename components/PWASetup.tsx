'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { PiPlusBold } from 'react-icons/pi'
import { BiShare } from 'react-icons/bi'
import { sendNotification, subscribeUser, unsubscribeUser } from '../action'

// Utility: Convert VAPID key to Uint8Array
function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')
  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

function PushNotificationManager() {
  const [subscription, setSubscription] = useState<PushSubscription | null>(null)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      navigator.serviceWorker.ready.then(async (reg) => {
        const sub = await reg.pushManager.getSubscription()
        setSubscription(sub)
      })
    }
  }, [])

  async function subscribeToPush() {
    try {
      const reg = await navigator.serviceWorker.ready
      const sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
        ),
      })
      setSubscription(sub)
      await subscribeUser(JSON.parse(JSON.stringify(sub)))
    } catch (err) {
      console.error('Subscription error:', err)
    }
  }

  async function unsubscribeFromPush() {
    if (!subscription) return
    try {
      await subscription.unsubscribe()
      await unsubscribeUser(subscription.endpoint)
      setSubscription(null)
    } catch (err) {
      console.error('Unsubscription error:', err)
    }
  }

  async function sendTestNotification() {
    if (!message.trim()) return
    setLoading(true)
    try {
      await sendNotification(message)
      setMessage('')
    } catch (err) {
      console.error('Notification error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="p-6 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 
                 bg-white/50 dark:bg-[#0B0F19]/40 backdrop-blur-md 
                 space-y-4 transition-all"
    >
      <motion.h3
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className="font-semibold text-lg text-gray-900 dark:text-gray-100"
      >
        Push Notifications
      </motion.h3>

      {subscription ? (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <p className="text-green-600">✅ Subscribed to notifications</p>
          <input
            type="text"
            placeholder="Enter message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="border border-gray-300 dark:border-gray-700 px-3 py-2 rounded-xl 
                       w-full focus:outline-none focus:ring-2 focus:ring-blue-500/40 
                       bg-white/80 dark:bg-gray-900/50 transition"
          />

          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={sendTestNotification}
              disabled={loading || !message.trim()}
              className="bg-blue-600 text-white px-4 py-2 rounded-xl font-medium 
                         disabled:opacity-50 shadow-sm transition"
            >
              {loading ? 'Sending...' : 'Send Test'}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              type="button"
              onClick={unsubscribeFromPush}
              className="text-red-600 hover:text-red-700 underline"
            >
              Unsubscribe
            </motion.button>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <p className="text-gray-600 dark:text-gray-300">You are not subscribed.</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={subscribeToPush}
            className="bg-green-600 text-white px-4 py-2 rounded-xl font-medium shadow-sm"
          >
            Subscribe
          </motion.button>
        </motion.div>
      )}
    </motion.section>
  )
}

function InstallPrompt() {
  const [isIOS, setIsIOS] = useState(false)
  const [isStandalone, setIsStandalone] = useState(false)
  const [deferredPrompt, setDeferredPrompt] =
    useState<Event & { prompt: () => void; userChoice: Promise<{ outcome: string }> } | null>(null)

  useEffect(() => {
    setIsIOS(/iPad|iPhone|iPod/.test(navigator.userAgent))
    setIsStandalone(window.matchMedia('(display-mode: standalone)').matches)

    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as any)
    }

    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return
    deferredPrompt.prompt()
    const choice = await deferredPrompt.userChoice
    if (choice.outcome === 'accepted') console.log('App installed')
    setDeferredPrompt(null)
  }

  if (isStandalone) return null

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
      className="p-6 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 
                 bg-white/50 dark:bg-[#0B0F19]/40 backdrop-blur-md 
                 space-y-4 transition-all"
    >
      <motion.h3
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.15 }}
        className="font-semibold text-lg text-gray-900 dark:text-gray-100"
      >
        Install Gani
      </motion.h3>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        type="button"
        onClick={handleInstall}
        disabled={!deferredPrompt}
        className="bg-indigo-600 text-white px-4 py-2 rounded-xl font-medium shadow-sm 
                   disabled:opacity-50 transition"
      >
        Add to Home Screen
      </motion.button>

      {isIOS && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-700 dark:text-gray-300 text-sm"
        >
          On iOS, tap the share button <BiShare className="inline" /> then “Add to Home Screen”{' '}
          <PiPlusBold className="inline" />
        </motion.p>
      )}
    </motion.section>
  )
}

export default function PWASetup() {
  return (
    <main className="p-6 max-w-lg mx-auto space-y-6 min-h-screen bg-transparent">
      <PushNotificationManager />
      <InstallPrompt />
    </main>
  )
}
