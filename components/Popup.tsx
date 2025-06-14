/* equinox-dark/components/Popup.tsx */
'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { X } from 'lucide-react'
import Image from 'next/image'

export interface PopupProps {
  isOpen: boolean
  onClose: () => void
}

export default function Popup({ isOpen, onClose }: PopupProps) {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({ name: '', phone: '' })
  const [errors, setErrors] = useState({ name: '', phone: '' })
  const popupRef = useRef<HTMLDivElement>(null)
  const nameInputRef = useRef<HTMLInputElement>(null)
  const openTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Handle open/close transitions
  useEffect(() => {
    if (isOpen) {
      openTimeoutRef.current = setTimeout(() => setIsVisible(true), 100)
    } else {
      setIsClosing(true)
      closeTimeoutRef.current = setTimeout(() => {
        setIsVisible(false)
        setIsClosing(false)
      }, 300)
    }
    return () => {
      if (openTimeoutRef.current) clearTimeout(openTimeoutRef.current)
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current)
    }
  }, [isOpen])

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isVisible && !isClosing) {
        setIsClosing(true)
        closeTimeoutRef.current = setTimeout(onClose, 300)
      }
    }
    if (isVisible) window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [isVisible, isClosing, onClose])

  // Submit handler
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    if (isSubmitted || isClosing) return

    const newErrors = { name: '', phone: '' }
    let hasError = false

    if (!formData.name.trim()) {
      newErrors.name = 'Пожалуйста, введите ваше имя'
      hasError = true
    }
    if (!formData.phone.trim() || !/^\+?\d{10,15}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Пожалуйста, введите корректный номер телефона'
      hasError = true
    }
    setErrors(newErrors)
    if (hasError) return

    setIsSubmitted(true)
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (!res.ok) throw new Error('Network response was not ok')
    } catch (err) {
      console.error(err)
    }

    // Close pop-up after delay
    closeTimeoutRef.current = setTimeout(() => {
      setIsClosing(true)
      closeTimeoutRef.current = setTimeout(() => {
        onClose()
        setIsSubmitted(false)
        setFormData({ name: '', phone: '' })
      }, 300)
    }, 1000)
  }, [formData, isSubmitted, isClosing, onClose])

  // Click outside to close
  const handleOverlayClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget && isVisible && !isClosing) {
      setIsClosing(true)
      closeTimeoutRef.current = setTimeout(onClose, 300)
    }
  }, [isVisible, isClosing, onClose])

  if (!isOpen && !isVisible) return null

  return (
    <div
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="popup-title"
      className={
        `fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm ` +
        `transition-opacity duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'}`
      }
    >
      <div
        ref={popupRef}
        className="relative bg-gradient-to-br from-gray-900 to-black text-white p-8 md:p-12 w-full max-w-md mx-4 border-2 border-lime-400/50 shadow-2xl transition-transform duration-300 hover:scale-105"
      >
        <button
          onClick={() => {
            setIsClosing(true)
            closeTimeoutRef.current = setTimeout(onClose, 300)
          }}
          className="absolute top-4 right-4 text-white/70 hover:text-lime-400 focus:outline-none"
          aria-label="Закрыть"
        >
          <X size={24} />
        </button>

        <div className="flex justify-center mb-6">
          <Image src="/logo2.png" alt="The Residence Logo" width={140} height={40} priority />
        </div>

        <h2 id="popup-title" className="text-2xl md:text-3xl font-bold text-center mb-6">
          Присоединяйтесь к нам!
        </h2>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <input
                ref={nameInputRef}
                type="text"
                placeholder="Ваше имя"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-3 bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:border-lime-400"
                required
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
            <div>
              <input
                type="tel"
                placeholder="Ваш телефон"
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                className="w-full p-3 bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:border-lime-400"
                required
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>
            <button
              type="submit"
              className="w-full px-6 py-3 bg-lime-400 text-black font-bold skew-x-[15deg] hover:skew-x-[10deg] transition duration-300"
            >
              {isSubmitted ? 'Отправлено' : 'Отправить'}
            </button>
          </form>
        ) : (
          <div className="text-center text-lg text-lime-400">Спасибо! Мы свяжемся с вами.</div>
        )}
      </div>
    </div>
  )
}
