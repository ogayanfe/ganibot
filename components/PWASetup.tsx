'use client'

import { useState, useEffect } from 'react'
import { PiPlusBold } from 'react-icons/pi'
import { BiShare } from 'react-icons/bi'
import { sendNotification, subscribeUser, unsubscribeUser } from '../action'

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
    <div className="p-4 border rounded-xl shadow-md space-y-3 bg-gray-50">
      <h3 className="font-semibold text-lg">Push Notifications</h3>

      {subscription ? (
        <>
          <p className="text-green-700">✅ Subscribed to notifications</p>
          <input
            type="text"
            placeholder="Enter message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="border px-3 py-2 rounded w-full"
          />
          <div className="flex gap-3">
            <button
              type="button"
              title="Send notification"
              onClick={sendTestNotification}
              disabled={loading || !message.trim()}
              className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Send Test'}
            </button>
            <button
              type="button"
              title="Unsubscribe from push"
              onClick={unsubscribeFromPush}
              className="text-red-600 underline"
            >
              Unsubscribe
            </button>
          </div>
        </>
      ) : (
        <>
          <p className="text-gray-600">You are not subscribed.</p>
          <button
            type="button"
            title="Subscribe to push"
            onClick={subscribeToPush}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Subscribe
          </button>
        </>
      )}
    </div>
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
    <div className="p-4 mt-4 border rounded-xl shadow-md space-y-3 bg-gray-50">
      <h3 className="font-semibold text-lg">Install Gani</h3>
      <button
        type="button"
        title="Add to Home Screen"
        onClick={handleInstall}
        disabled={!deferredPrompt}
        className="bg-indigo-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        Add to Home Screen
      </button>

      {isIOS && (
        <p className="text-gray-700 text-sm">
          On iOS, tap the share button <BiShare className="inline" /> then “Add to Home Screen”{' '}
          <PiPlusBold className="inline" />
        </p>
      )}
    </div>
  )
}

export default function PWASetup() {
  return (
    <main className="p-6 max-w-lg mx-auto space-y-6">
      <PushNotificationManager />
      <InstallPrompt />
    </main>
  )
}
