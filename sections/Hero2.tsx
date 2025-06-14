// sections/Hero2.tsx
'use client'

import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Popup from '../components/Popup'

export default function Hero2() {
  const [popupOpen, setPopupOpen] = useState(false)
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLElement>(null)
  const router = useRouter()

  // Плавное появление при скролле
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
        aria-label="Преимущества The Residence"
        className={`relative flex items-center justify-center text-center overflow-hidden min-h-[80vh] md:h-screen px-4 sm:px-6 lg:px-8 transition-opacity transform duration-1000 ease-out ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        {/* Фоновое изображение с градиентом */}
        <Image
          src="/hero2.jpg"
          alt="Фоновое изображение"
          fill
          priority
          className="object-cover z-0 brightness-75 hover:brightness-90 transition-brightness duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent z-10 pointer-events-none" />

        {/* Центрированный контейнер контента */}
        <div className="relative z-20 w-full max-w-2xl mx-auto bg-white bg-opacity-90 backdrop-blur-sm p-8 md:p-16 shadow-md flex flex-col items-center text-center space-y-6">
          {/* Заголовок */}
          <h1
            className={`text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 drop-shadow-md transition-transform duration-700 ${
              inView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}
          >
            Преимущества The&nbsp;Residence
          </h1>

          {/* Описание */}
          <p
            className={`text-base sm:text-lg md:text-xl text-gray-800 leading-relaxed transition-transform duration-700 ${
              inView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            } delay-200`}
          >
            У нас всё: дорогое оборудование, квалифицированные тренеры, идеальная чистота и бесплатные полотенца. Но главное — семь стилизованных залов, пятизвёздочный сервис и комфортные раздевалки с тёплым полом и просторными шкафами.
          </p>

          {/* Кнопки */}
          <div className="flex flex-col sm:flex-row gap-6 transition-transform duration-700 ${inView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'} delay-400">
            <button
              onClick={() => router.push('/about')}
              className="relative bg-lime-400 skew-x-[20deg] hover:skew-x-[15deg] transition-all duration-300"
            >
              <span className="inline-block -skew-x-[20deg] px-4 py-4 text-black text-lg font-semibold">
                О резиденции
              </span>
            </button>
            <button
              onClick={() => setPopupOpen(true)}
              className="relative bg-transparent border-2 border-black skew-x-[20deg] hover:skew-x-[15deg] transition-all duration-300"
            >
              <span className="inline-block -skew-x-[20deg] px-8 py-4 text-black text-lg font-semibold hover:text-black">
                Присоединиться
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Popup */}
      <Popup isOpen={popupOpen} onClose={() => setPopupOpen(false)} />
    </>
  )
}

/*
Импортируйте и используйте в app/page.tsx:
import Hero2 from '@/sections/Hero2'
<Hero2 />
*/