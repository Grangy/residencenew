/* equinox-dark/sections/Hero.tsx */
'use client'
import Image from 'next/image'
import { useState } from 'react'
import Popup from '../components/Popup'

export default function Hero() {
  const [popupOpen, setPopupOpen] = useState(false)

  return (
    <>
      <section className="relative h-screen flex items-center justify-center text-center overflow-hidden">
        <Image
          src="/hero.jpg"
          alt="Hero Background"
          fill
          priority
          className="object-cover z-0"
        />
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div className="relative z-20">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
            ЛЕТО БЕЗ ОСТАНОВКИ
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-6">
            Обязательства ни перед кем не заканчиваются.
          </p>
          <div className="relative">
            <button
              onClick={() => setPopupOpen(true)}
              className="relative px-6 py-3 text-white font-bold bg-black border border-lime-400 skew-x-[20deg] hover:brightness-110 transition-all duration-300"
            >
              <span className="-skew-x-[20deg] block">ПРИСОЕДИНЯЙСЯ</span>
            </button>
          </div>
        </div>
      </section>
      <Popup isOpen={popupOpen} onClose={() => setPopupOpen(false)} />
    </>
  )
}