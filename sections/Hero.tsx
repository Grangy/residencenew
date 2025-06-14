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

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <section
        ref={ref}
        aria-label="Оффер резидентства"
        className={
          `relative h-screen flex flex-col items-center justify-center text-center ` +
          `overflow-hidden px-4 sm:px-6 lg:px-8 transition-all duration-1000 ease-out ` +
          (inView
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-6')
        }
      >
        {/* Фоновое изображение */}
        <Image
          src="/hero.jpg"
          alt="Hero Background"
          fill
          priority
          className="object-cover z-0"
        />

        {/* Полупрозрачная накладка */}
        <div
          className="absolute inset-0 bg-black/70 z-10"
        />

        {/* Badge оффера */}
        <div
          className={
            `absolute top-6 sm:top-8 left-1/2 -translate-x-1/2 z-20 ` +
            `bg-yellow-400 text-black px-3 sm:px-4 py-1 sm:py-2 font-bold ` +
            `uppercase tracking-wide transition-opacity duration-700 ` +
            (inView ? 'opacity-100' : 'opacity-0')
          }
        >
          Летнее предложение
        </div>

        {/* Контент оффера */}
        <div className="relative z-20 max-w-xl w-full space-y-6">
          {/* Заголовок */}
          <h1
            className={
              `text-4xl sm:text-5xl md:text-6xl font-extrabold text-white ` +
              `drop-shadow-lg transition-all duration-700 transform ` +
              (inView
                ? 'opacity-100 translate-y-0 delay-200'
                : 'opacity-0 translate-y-6')
            }
          >
            Стань резидентом по специальной цене
          </h1>

          {/* Подзаголовок */}
          <p
            className={
              `text-lg sm:text-xl md:text-2xl text-gray-300 leading-relaxed ` +
              `transition-all duration-700 transform ` +
              (inView
                ? 'opacity-100 translate-y-0 delay-400'
                : 'opacity-0 translate-y-6')
            }
          >
            Только этим летом — месяц премиального фитнеса за &nbsp;
            <span className="text-lime-400 font-bold">
               9950&nbsp;₽/мес
            </span>
          </p>

          {/* CTA-кнопка */}
          <div className="flex justify-center">
            <button
              onClick={() => setPopupOpen(true)}
              className={
                `relative bg-lime-400 skew-x-[20deg] hover:skew-x-[15deg] ` +
                `transition-all duration-500 transform ` +
                (inView
                  ? 'opacity-100 translate-y-0 delay-600'
                  : 'opacity-0 translate-y-6')
              }
            >
              <span className="inline-block -skew-x-[20deg] px-8 py-4 ` +
               `text-black text-lg sm:text-xl font-semibold">
                Выбери карту
              </span>
            </button>
          </div>

          {/* Анимированная стрелка вниз */}
          {inView && (
            <div className="mt-10 animate-bounce">
              <ChevronsDown size={32} className="text-white/70" aria-hidden="true" />
            </div>
          )}
        </div>
      </section>

      {/* Popup */}
      <Popup
        isOpen={popupOpen}
        onClose={() => setPopupOpen(false)}
      />
    </>
  )
}

/*
Импортируйте и используйте в app/page.tsx:
import Hero from '@/sections/Hero'
<Hero />
*/
