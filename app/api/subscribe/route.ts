import { subscribeUser } from '@/action'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const sub = await req.json()
    const result = await subscribeUser(sub)
    return NextResponse.json(result)
  } catch (error) {
    console.error('Subscribe error:', error)
    return NextResponse.json({ success: false, error: 'Failed to subscribe' }, { status: 500 })
  }
}