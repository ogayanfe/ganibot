import { unsubscribeUser } from '@/action'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { endpoint } = await req.json()
    const result = await unsubscribeUser(endpoint)
    return NextResponse.json(result)
  } catch (error) {
    console.error('Unsubscribe error:', error)
    return NextResponse.json({ success: false, error: 'Failed to unsubscribe' }, { status: 500 })
  }
}
