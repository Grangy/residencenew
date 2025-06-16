import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

/*
 |--------------------------------------------------------------------------
 | API  /api/subscribe
 |--------------------------------------------------------------------------
 | Принимает JSON вида { name: string; phone: string }
 | 1. Передаёт данные в amoCRM‑webhook
 | 2. Шлёт e‑mail через Yandex SMTP
 | 3. Дублирует заявку в Telegram‑группу
 |
 | Если хотя бы один из шагов падает — ловим ошибку и отвечаем 500.
 */

// === Telegram ===
const TELEGRAM_BOT_TOKEN = '8101255214:AAF-JIJy4J3A7w6UXcuHx1tNCtUwbyGFoDc'
const TELEGRAM_CHAT_ID = '-4631670425' // группа «заявки»
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`

export async function POST(request: NextRequest) {
  try {
    const data: { name: string; phone: string } = await request.json()

    /* 1. Webhook в amoCRM */
    await fetch(
      'https://sp1-nova.ru/api/site-integration/theresidence.amocrm.ru/7533d2816fc/',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }
    )

    /* 2. E‑mail */
    const transporter = nodemailer.createTransport({
      host: 'smtp.yandex.ru',
      port: 465,
      secure: true,
      auth: {
        user: 'targetre@yandex.ru',
        pass: 'hijsmcqseevsvvyf',
      },
    })

    await transporter.sendMail({
      from: '"Сайт Лендинг Новый" <targetre@yandex.ru>',
      to: 'm.dolia2017@yandex.ru, 13779306.160367@parser.amocrm.ru',
      subject: 'Новая заявка',
      text: `Имя: ${data.name}\nТелефон: ${data.phone}`,
      html: `<p>Имя: <strong>${data.name}</strong></p><p>Телефон: <strong>${data.phone}</strong></p>`,
    })

    /* 3. Telegram */
    const telegramMessage = `\u2705 <b>Новая заявка</b>%0A\n<b>Имя:</b> ${data.name}%0A<b>Телефон:</b> ${data.phone}`

    await fetch(TELEGRAM_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: telegramMessage,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
    })

    return NextResponse.json({ success: true })
  } catch (error: unknown) {
    console.error('Ошибка webhook, почты или Telegram:', error)
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    )
  }
}
