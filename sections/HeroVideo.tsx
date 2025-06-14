// sections/HeroVideo.tsx
'use client'

import { useState } from 'react'
import Popup from '../components/Popup'

export default function HeroVideo() {
  const [popupOpen, setPopupOpen] = useState(false)

  return (
    <>
      <section
        className="relative h-screen flex items-center justify-center text-center overflow-hidden"
        aria-label="Hero section with video background"
      >
        {/* Видео-фон */}
        <video
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/video.mp4" type="video/mp4" />
          Ваш браузер не поддерживает видео.
        </video>

        {/* Темная полупрозрачная накладка */}
        <div className="absolute inset-0 bg-black/60 z-10" aria-hidden="true" />

        {/* Контент поверх видео */}
        <div className="relative z-20 px-6">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
            ЛЕТО БЕЗ ОСТАНОВОК
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-6">
            Испытай энергию с резиденцией.
          </p>
          <button
            onClick={() => setPopupOpen(true)}
            className="relative px-6 py-3 text-white font-bold bg-black border border-lime-400 skew-x-[20deg] hover:brightness-110 transition-all duration-300"
          >
            <span className="-skew-x-[20deg] block">ПРИСОЕДИНЯЙСЯ</span>
          </button>
        </div>
      </section>

      {/* Подключение Popup */}
      <Popup
        isOpen={popupOpen}
        onClose={() => setPopupOpen(false)}
      />
    </>
  )
}


