/* equinox-dark/sections/Hero2.tsx */
'use client'
import Image from 'next/image'
import { useState } from 'react'
import Popup from '../components/Popup'

export default function Hero2() {
  const [popupOpen, setPopupOpen] = useState(false)

  return (
    <>
      <section className="relative h-screen flex items-center justify-center text-center overflow-hidden">
        <Image
          src="/hero2.jpg"
          alt="Фоновое изображение"
          fill
          priority
          className="object-cover z-0 transition-opacity duration-500 hover:opacity-90"
        />
        <div className="absolute inset-0 bg-black/50 z-10 transition-opacity duration-300 hover:bg-black/40" />
        <div className="relative z-20 bg-white p-6 md:p-12 max-w-lg transform transition-all duration-300 hover:scale-105">
          <h1 className="text-xl md:text-3xl font-bold mb-4 text-black animate-fade-in">
            Один абонемент. Безграничные возможности.
          </h1>
          <p className="text-sm md:text-base text-gray-800 mb-6 leading-relaxed animate-fade-in delay-200">
            Бесплатные групповые тренировки, персональные занятия с тренером и
            специальные зоны для отдыха и восстановления.
          </p>
          <div className="relative">
            <button
              onClick={() => setPopupOpen(true)}
              className="relative px-6 py-3 text-black font-bold bg-white border-2 border-black skew-x-[20deg] hover:bg-gray-100 transition-colors duration-300"
            >
              <span className="-skew-x-[20deg] block">ПОДРОБНЕЕ</span>
            </button>
          </div>
        </div>
      </section>
      <Popup isOpen={popupOpen} onClose={() => setPopupOpen(false)} />
    </>
  )
}