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

  // IntersectionObserver для анимации появления
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
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
        aria-label="Оффер резидентства"
        className={`relative h-screen flex flex-col items-center justify-center text-center overflow-hidden px-4 sm:px-6 lg:px-8 transition-all duration-1000 ease-out ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        {/* Фоновое изображение с параллакс-эффектом */}
        <Image
          src="/hero.jpg"
          alt="Hero Background"
          fill
          priority
          className={`object-cover z-0 transition-transform duration-700 ${
            inView ? 'scale-100' : 'scale-105'
          }`}
        />

        {/* Полупрозрачная накладка */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-10 pointer-events-none" />

        {/* Badge оффера */}
        <div
          className={`absolute top-6 sm:top-8 left-1/2 -translate-x-1/2 z-20 bg-gradient-to-r from-yellow-400 to-yellow-300 text-black px-4 py-1 font-bold uppercase tracking-wide shadow-lg transition-opacity duration-700 ${
            inView ? 'opacity-100' : 'opacity-0'
          }`}
        >
          Летнее предложение
        </div>

        {/* Контент оффера */}
        <div className="relative z-20 max-w-xl w-full space-y-6 p-6 bg-white/20 backdrop-blur-md shadow-xl">
          {/* Заголовок */}
          <h1
            className={`text-5xl sm:text-5xl md:text-5xl font-extrabold text-white drop-shadow-lg transition-all duration-700 transform ${
              inView ? 'opacity-100 translate-y-0 delay-200' : 'opacity-0 translate-y-6'
            }`}
          >
            Стань Резидентом по специальной цене
            <span className="block w-16 h-1 bg-lime-400 mt-2 mx-auto rounded-full"></span>
          </h1>

          {/* Подзаголовок со старой и новой ценой */}
          <p
            className={`text-lg sm:text-xl md:text-2xl text-gray-200 leading-relaxed transition-all duration-700 transform ${
              inView ? 'opacity-100 translate-y-0 delay-400' : 'opacity-0 translate-y-6'
            }`}
          >
            Месяц открытых дверей за&nbsp;
            <span className="text-gray-400 line-through whitespace-nowrap">
              20&nbsp;000&nbsp;₽/мес
            </span>,&nbsp;
            <span className="text-lime-400 font-bold whitespace-nowrap text-4xl">
              <br></br>
              9&nbsp;950&nbsp;₽/мес
            </span>
          </p>

          {/* Дополнительный подзаголовок */}
          <p
            className={`text-sm sm:text-base text-gray-300 transition-all duration-700 transform ${
              inView ? 'opacity-100 translate-y-0 delay-500' : 'opacity-0 translate-y-6'
            }`}
          >
            Премиум фитнес, коворкинг
          </p>

          {/* CTA-кнопка */}
          <div className="flex justify-center">
            <button
              onClick={() => setPopupOpen(true)}
              className={`relative bg-lime-400 skew-x-[20deg] hover:skew-x-[15deg] transition-all duration-300 shadow-lg transform ${
                inView ? 'opacity-100 translate-y-0 delay-600' : 'opacity-0 translate-y-6'
              }`}
            >
              <span className="inline-block -skew-x-[20deg] px-8 py-4 text-black text-lg sm:text-xl font-semibold">
                Присоединиться
              </span>
            </button>
          </div>

          {/* Стрелка вниз */}
          {inView && (
            <div className="mt-10 animate-bounce text-white/70">
              <ChevronsDown size={32} aria-hidden="true" />
            </div>
          )}
        </div>
      </section>

      {/* Popup */}
      <Popup isOpen={popupOpen} onClose={() => setPopupOpen(false)} />
    </>
  )
}