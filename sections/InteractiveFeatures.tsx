// sections/InteractiveFeatures.tsx
'use client'

import { useState } from 'react'
import Slider from 'react-slick'
import Popup from '../components/Popup'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const features = [
  {
    id: 0,
    title: 'ГРУППОВЫЕ ЗАНЯТИЯ',
    description: 'Новые и безлимитные занятия для каждого уровня в зале и у бассейна. Старт летних тренировок 16/06 на нашем острове.',
    bg: '/features/group.png',
  },
  {
    id: 1,
    title: 'ПЕРСОНАЛЬНЫЕ ТРЕНИРОВКИ',
    description: 'Индивидуальные программы с сертифицированными тренерами.',
    bg: '/features/personal.png',
  },
  {
    id: 2,
    title: 'SPA И ВОССТАНОВЛЕНИЕ',
    description: 'Зоны отдыха и восстановления — сауна, массаж, медитация.',
    bg: '/features/spa.png',
  },
  {
    id: 3,
    title: 'КИНЕЗИОЛОГИЯ',
    description: 'Понимание движений тела для профилактики травм и улучшения результатов.',
    bg: '/features/kino.jpg',
  },
  {
    id: 4,
    title: 'СООБЩЕСТВО',
    description: 'Дружеская атмосфера, совместные события и поддержка резидентов.',
    bg: '/features/community.jpg',
  },
]

export default function InteractiveFeatures() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [popupOpen, setPopupOpen] = useState(false)

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    swipeToSlide: true,
    afterChange: (index: number) => setActiveIndex(index),
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 3 } },
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  }

  const activeBg = features[activeIndex % features.length].bg

  return (
    <section
      aria-label="Интерактивные возможности клуба"
      className="relative flex flex-col items-center justify-center text-center overflow-hidden bg-cover bg-center transition-bg duration-500"
      style={{ backgroundImage: `url(${activeBg})` }}
    >
      {/* затемнение фона */}
      <div className="absolute inset-0 bg-black/70 z-0" />

      {/* обёртка слайдера с адаптивной высотой */}
      <div className="relative z-10 w-full max-w-6xl px-4 py-12 sm:py-16 lg:py-20">
        <div className="h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
          <Slider {...settings} className="h-full">
            {features.map(feature => (
              <div key={feature.id} className="px-2 h-full">
                <div
                  className="h-full p-6 bg-white/20 backdrop-blur-sm cursor-pointer transition-transform transform hover:scale-105 hover:bg-white/40 flex flex-col"
                  onClick={() => setPopupOpen(true)}
                >
                  <h3 className="text-2xl font-bold mb-2 text-white whitespace-normal">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-200 mb-4 flex-grow whitespace-normal">
                    {feature.description}
                  </p>
                  <span className="inline-block mt-auto text-lime-400 font-semibold underline whitespace-nowrap">
                    Узнать больше
                  </span>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      <Popup isOpen={popupOpen} onClose={() => setPopupOpen(false)} />
    </section>
  )
}