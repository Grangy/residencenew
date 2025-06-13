// sections/Hero.tsx
'use client'

import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'
import { ChevronsDown } from 'lucide-react'
import Popup from '../components/Popup'

export default function Hero() {
  const [popupOpen, setPopupOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true)
            observer.disconnect()
          }
        })
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <section
        ref={ref}
        className="relative h-screen flex flex-col items-center justify-center text-center overflow-hidden"
        aria-label="Hero section with image background"
      >
        {/* Фоновое изображение */}
        <Image
          src="/hero.jpg"
          alt="Hero Background"
          fill
          priority
          className="object-cover z-0"
        />

        {/* Темная полупрозрачная накладка */}
        <div className="absolute inset-0 bg-black/60 z-10" />

        {/* Контент с анимацией появления */}
        <div className="relative z-20 px-6 max-w-3xl">
          <h1
            className={`text-4xl md:text-6xl font-bold mb-4 text-white transform transition-all duration-700 ${
              inView
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
            } delay-200`}
          >
            ЛЕТО БЕЗ ОСТАНОВКИ
          </h1>

          <p
            className={`text-lg md:text-xl text-gray-300 mb-6 transform transition-all duration-700 ${
              inView
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
            } delay-400`}
          >
            Обязательства ни перед кем не заканчиваются.
          </p>

          <button
            onClick={() => setPopupOpen(true)}
            className={`relative px-6 py-3 text-white font-bold bg-black border border-lime-400 skew-x-[20deg] hover:brightness-110 transition-all duration-700 transform ${
              inView
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
            } delay-600`}
          >
            <span className="-skew-x-[20deg] block">ПРИСОЕДИНЯЙСЯ</span>
          </button>

          {/* Дополнительный элемент: анимированная стрелка вниз */}
          {inView && (
            <div className="mt-8 animate-bounce">
              <ChevronsDown size={32} className="text-white/70" aria-hidden="true" />
            </div>
          )}
        </div>
      </section>

      {/* Подключение Popup */}
      <Popup isOpen={popupOpen} onClose={() => setPopupOpen(false)} />
    </>
  )
}