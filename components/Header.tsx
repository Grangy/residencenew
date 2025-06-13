/* equinox-dark/components/Header.tsx */
'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import Popup from './Popup'

// Список пунктов меню
const navItems = [
  { label: 'КЛУБ', href: '/' },
  { label: 'ПРЕИМУЩЕСТВА', href: '/' },
  { label: 'ПРОГРАММЫ', href: '/' },
  { label: 'SPA', href: '/' },
  { label: 'БАР', href: '/' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [popupOpen, setPopupOpen] = useState(false)

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-black text-white border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center relative">
          {/* Logo (desktop) */}
          <Link href="/" className="hidden md:block">
            <Image
              src="/logo2.png"
              alt="The Residence Logo"
              width={140}
              height={40}
              className="h-auto w-auto"
              priority
            />
          </Link>

          {/* Logo (mobile centered) */}
          <Link href="/" className="block md:hidden absolute left-1/2 -translate-x-1/2">
            <Image
              src="/logo2.png"
              alt="The Residence Logo"
              width={120}
              height={34}
              className="h-auto w-auto"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex space-x-6 items-center">
            {navItems.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="hover:text-lime-400 transition-colors"
              >
                {label}
              </Link>
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
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white z-10"
            aria-label="Toggle Menu"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-black text-white px-6 pb-4 space-y-3">
            {navItems.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="block hover:text-lime-400"
              >
                {label}
              </Link>
            ))}
            <button
              onClick={() => {
                setMenuOpen(false)
                setPopupOpen(true)
              }}
              className="block w-full text-center mt-2 px-4 py-2 bg-gradient-to-r from-lime-400 to-yellow-300 text-black font-semibold hover:brightness-110 transition-all duration-300"
            >
              присоедини́ться
            </button>
          </div>
        )}
      </header>
      <Popup isOpen={popupOpen} onClose={() => setPopupOpen(false)} />
    </>
  )
}