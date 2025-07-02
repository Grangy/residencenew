import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

/*
 |----------------------------------------------------------------------------|
 | API  /api/subscribe                                                        |
 |----------------------------------------------------------------------------|
 | Принимает JSON вида { name: string; phone: string; utm_*?: string }        |
 | 1. Прокидывает данные в amoCRM‑webhook                                     |
 | 2. Отправляет e‑mail через SMTP (Yandex)                                   |
 | 3. Дублирует заявку в Telegram‑группу                                      |
 | При любой ошибке — ответ 500                                               |
 |----------------------------------------------------------------------------|
*/

// ---------- Типы ----------
type Utm = {
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_term?: string
  utm_content?: string
}

interface LeadPayload extends Utm {
  name: string
  phone: string
}

// ---------- Telegram ----------
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!
const TELEGRAM_CHAT_ID   = process.env.TELEGRAM_CHAT_ID!
const TELEGRAM_API_URL   = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`

export async function POST(request: NextRequest) {
  try {
    // 1. читаем тело запроса
    const data: LeadPayload = await request.json()

    /* ---------- 1. Веб‑хук amoCRM ---------- */
    await fetch(
      'https://sp1-nova.ru/api/site-integration/theresidence.amocrm.ru/7533d2816fc/',
      {
        method : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body   : JSON.stringify(data),  // utm_* остаются внутри
      },
    )

    /* ---------- 2. Email ---------- */
    const transporter = nodemailer.createTransport({
      host: 'smtp.yandex.ru',
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER!,
        pass: process.env.SMTP_PASS!,
      },
    })

    // превращаем utm в html‑список
    const utmHtml = Object.entries(data)
      .filter(([k]) => k.startsWith('utm_') && data[k as keyof Utm])
      .map(([k, v]) => `<p><b>${k}:</b> ${v}</p>`)
      .join('') || '<p><i>UTM не переданы</i></p>'

    await transporter.sendMail({
      from   : '"Сайт The Residence" <targetre@yandex.ru>',
      to     : 'm.dolia2017@yandex.ru, 13779306.160367@parser.amocrm.ru',
      subject: 'Новая заявка с сайта',
      html   : `
        <p><b>Имя:</b> ${data.name}</p>
        <p><b>Телефон:</b> ${data.phone}</p>
        ${utmHtml}
      `,
    })

    /* ---------- 3. Telegram ---------- */
    const tgMessage =
      `<b>✅ Новая заявка</b>\n<b>Имя:</b> ${data.name}\n<b>Телефон:</b> ${data.phone}\n` +
      Object.entries(data)
        .filter(([k]) => k.startsWith('utm_') && data[k as keyof Utm])
        .map(([k, v]) => `<b>${k}:</b> ${v}`)
        .join('\n')

    const tgResp = await fetch(TELEGRAM_API_URL, {
      method : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body   : JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text   : tgMessage,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
    })

    const tgJson = await tgResp.json().catch(() => ({}))
    if (!tgResp.ok) {
      throw new Error(`Telegram error ${tgResp.status}: ${tgJson?.description || 'unknown'}`)
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Ошибка webhook, почты или Telegram:', err)
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ success: false, error: message }, { status: 500 })
  }
}
