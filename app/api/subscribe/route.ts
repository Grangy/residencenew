/* equinox-dark/app/api/subscribe/route.ts */
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const data: { name: string; phone: string } = await request.json()
    await fetch(
      'https://sp1-nova.ru/api/site-integration/theresidence.amocrm.ru/7533d2816fc/',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }
    )
    return NextResponse.json({ success: true })
  } catch (error: unknown) {
    console.error('Webhook error:', error)
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    )
  }
}