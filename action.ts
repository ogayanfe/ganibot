'use server'

import webpush from 'web-push'
import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

// export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['error', 'warn'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

webpush.setVapidDetails(
  'mailto:efuwapeayomide512@gmail.com',
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
)

interface SubscriptionInput {
  endpoint: string
  keysAuth: string
  keysP256dh: string
}

export async function subscribeUser(sub: SubscriptionInput) {
  const { endpoint, keysAuth, keysP256dh } = sub

  if (!keysAuth || !keysP256dh) {
    throw new Error('Invalid subscription keys')
  }

  await prisma.subscription.upsert({
    where: { endpoint },
    update: { keysAuth, keysP256dh },
    create: { endpoint, keysAuth, keysP256dh },
  })

  return { success: true }
}

export async function unsubscribeUser(endpoint: string) {
  try {
    await prisma.subscription.delete({ where: { endpoint } })
    return { success: true }
  } catch (error: any) {
    if (error.code === 'P2025') {
      return { success: false, error: 'Subscription not found' }
    }
    console.error('Unsubscribe error:', error)
    return { success: false, error: 'Failed to unsubscribe' }
  }
}

export async function sendNotification(message: string) {
  const subscriptions = await prisma.subscription.findMany()
  if (subscriptions.length === 0) return { success: false, error: 'No subscribers found' }

  const payload = JSON.stringify({
    title: 'Gani Notification 💬',
    body: message,
    icon: '/icon512_rounded.png',
    badge: '/badge.png',
    tag: 'gani-update',
    data: { url: '/' },
  })

  interface Subscription {
    endpoint: string
    keysAuth: string
    keysP256dh: string
  }

  interface WebPushKeys {
    auth: string
    p256dh: string
  }

  await Promise.all(
    subscriptions.map((sub: Subscription) =>
      webpush
        .sendNotification(
          {
            endpoint: sub.endpoint,
            keys: { auth: sub.keysAuth, p256dh: sub.keysP256dh } as WebPushKeys,
          },
          payload
        )
        .catch(async (err: { statusCode?: number }) => {
          if (err.statusCode === 410 || err.statusCode === 404) {
            await prisma.subscription.delete({ where: { endpoint: sub.endpoint } })
          } else {
            console.error('Push error:', err)
          }
        })
    )
  )

  return { success: true }
}
