/* equinox-dark/app/api/subscribe/route.ts */
import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const data: { name: string; phone: string } = await request.json()

    // Отправка в webhook
    await fetch(
      'https://sp1-nova.ru/api/site-integration/theresidence.amocrm.ru/7533d2816fc/',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }
    )

    // Настройка SMTP-транспорта (пример для Яндекс)
    const transporter = nodemailer.createTransport({
      host: 'smtp.yandex.ru',
      port: 465,
      secure: true, // true для 465, false для 587
      auth: {
        user: 'targetre@yandex.ru',   // твой яндекс email2
        pass: 'hijsmcqseevsvvyf',      // пароль приложения
      },
    })

await transporter.sendMail({
  from: '"Сайт Лендинг Новый" <targetre@yandex.ru>',
  to: 'm.dolia2017@yandex.ru, 13779306.160367@parser.amocrm.ru', // через запятую
  // или так:
  // to: ['m.dolia2017@yandex.ru', 'another@example.com'],
  subject: 'Новая заявка',
  text: `Имя: ${data.name}\nТелефон: ${data.phone}`,
  html: `<p>Имя: <strong>${data.name}</strong></p><p>Телефон: <strong>${data.phone}</strong></p>`,
})


    return NextResponse.json({ success: true })
  } catch (error: unknown) {
    console.error('Ошибка webhook или почты:', error)
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    )
  }
}
