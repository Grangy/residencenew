// components/Header.tsx
'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import Popup from './Popup'

// Список пунктов меню с id секций
const navItems = [
  { label: 'ГЛАВНАЯ', id: 'club' },          // Видео секция
  { label: 'ПРЕДЛОЖЕНИЕ', id: 'advantages' }, // Сезонное предложение
  { label: 'О РЕЗИДЕНЦИИ', id: 'programs' }, // О резиденции
  { label: 'ПРЕИМУЩЕСТВА', id: 'spa' },      // Интерактивные преимущества
  { label: 'ИНТЕРЬЕРЫ', id: 'bar' },         // Карусель интерьеров
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [popupOpen, setPopupOpen] = useState(false)

  const handleNavClick = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
    setMenuOpen(false)
  }

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-black text-white border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center relative">
          <Link href="/" className="hidden md:block">
            <Image src="/logo2.png" alt="The Residence Logo" width={140} height={40} priority />
          </Link>
          <Link href="/" className="block md:hidden absolute left-1/2 -translate-x-1/2">
            <Image src="/logo2.png" alt="The Residence Logo" width={120} height={34} priority />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex space-x-6 items-center">
            {navItems.map(({ label, id }) => (
              <button
                key={id}
                onClick={() => handleNavClick(id)}
                className="hover:text-lime-400 transition-colors"
              >
                {label}
              </button>
            ))}
            <button
              onClick={() => setPopupOpen(true)}
              className="relative bg-black border border-white/40 skew-x-[20deg] ml-4 hover:border-lime-400 transition-all duration-300"
            >
              <span className="inline-block px-6 py-2 -skew-x-[20deg] text-white font-bold select-none">
                ПРИСОЕДИНЯЙСЯ
              </span>
            </button>
          </nav>

          {/* Mobile menu toggle */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white z-10">
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-black text-white px-6 pb-4 space-y-3">
            {navItems.map(({ label, id }) => (
              <button
                key={id}
                onClick={() => handleNavClick(id)}
                className="block hover:text-lime-400 w-full text-left"
              >
                {label}
              </button>
            ))}
            <button
              onClick={() => {
                setMenuOpen(false)
                setPopupOpen(true)
              }}
              className="block w-full text-center mt-2 px-4 py-2 bg-gradient-to-r from-lime-400 to-yellow-300 text-black font-semibold hover:brightness-110 transition-all duration-300"
            >
              ПРИСОЕДИНЯЙСЯ
            </button>
          </div>
        )}
      </header>
      <Popup isOpen={popupOpen} onClose={() => setPopupOpen(false)} />
    </>
  )
}
