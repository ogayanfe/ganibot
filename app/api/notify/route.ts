import { sendNotification } from '@/action'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { message } = await req.json()
    const result = await sendNotification(message)
    return NextResponse.json(result)
  } catch (error) {
    console.error('Notification error:', error)
    return NextResponse.json({ success: false, error: 'Failed to send notification' }, { status: 500 })
  }
}
