import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "The Residence – Премиум фитнес-клуб",
    template: "%s | The Residence",
  },
  description:
    "The Residence — эксклюзивный фитнес-клуб с премиальным сервисом, стилизованными залами и уникальными преимуществами для резидентов.",
  keywords: [
    "The Residence",
    "фитнес-клуб",
    "премиум фитнес",
    "Сочи фитнес",
    "спорт зал",
    "здоровье и фитнес",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        {/* Можно добавить здесь дополнительные теги, например кастомный favicon */}
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
