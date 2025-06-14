// sections/InteractiveFeatures.tsx
'use client'

import { useState } from 'react'
import Popup from '../components/Popup'

const features = [
  {
    id: 0,
    title: 'ГРУППОВЫЕ ЗАНЯТИЯ',
    description: 'Новые и безлимитные занятия для каждого уровня.',
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
]

export default function InteractiveFeatures() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [popupOpen, setPopupOpen] = useState(false)

  const activeBg =
    hoveredId !== null
      ? features.find(f => f.id === hoveredId)?.bg
      : '/features/group.png'

  return (
    <section
      aria-label="Интерактивные возможности клуба"
      className={`
        relative
        h-screen
        flex flex-col items-center justify-center text-center
        overflow-hidden
        bg-cover bg-center bg-no-repeat
        transition-bg duration-500
      `}
      style={{ backgroundImage: `url(${activeBg})` }}
    >
      <div className="absolute inset-0 bg-black/70 z-0" />

      <div className="relative z-10 max-w-5xl w-full px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map(feature => (
          <div
            key={feature.id}
            className="
              p-6
              bg-white/20 backdrop-blur-sm
              rounded-lg
              cursor-pointer
              transition-transform transform
              hover:scale-105 hover:bg-white/40
            "
            onMouseEnter={() => setHoveredId(feature.id)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => setPopupOpen(true)}
          >
            <h3 className="text-2xl font-bold mb-2 text-white">
              {feature.title}
            </h3>
            <p className="text-sm text-gray-200 mb-4">
              {feature.description}
            </p>
            <span className="inline-block mt-auto text-lime-400 font-semibold underline">
              Узнать больше
            </span>
          </div>
        ))}
      </div>

      {/* Попап */}
      <Popup isOpen={popupOpen} onClose={() => setPopupOpen(false)} />
    </section>
  )
}
