/* equinox-dark/components/Popup.tsx */
'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import { X } from 'lucide-react'
import Image from 'next/image'

export default function Popup({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({ name: '', phone: '' })
  const [errors, setErrors] = useState({ name: '', phone: '' })
  const [mountError, setMountError] = useState<string | null>(null)
  const popupRef = useRef<HTMLDivElement>(null)
  const nameInputRef = useRef<HTMLInputElement>(null)
  const openTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // 1. Debounced state transition for opening to prevent rapid toggling
  useEffect(() => {
    if (isOpen) {
      setMountError(null)
      openTimeoutRef.current = setTimeout(() => {
        setIsVisible(true)
      }, 100) // Short delay to ensure state stability
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

  // 2. Close on ESC key with safeguard
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

  // 3. Memoized submit handler for performance and reliability
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    if (isSubmitted || isClosing) return // Prevent submission during transition

    const newErrors = { name: '', phone: '' }
    let hasError = false

    // 4. Robust validation with trimming and regex
    if (!formData.name.trim()) {
      newErrors.name = 'Пожалуйста, введите ваше имя'
      hasError = true
    }
    if (!formData.phone.trim() || !/^\+?\d{10,15}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Пожалуйста, введите корректный номер телефона'
      hasError = true
    }

    setErrors(newErrors)
    if (!hasError) {
      setIsSubmitted(true)
      // 5. Controlled success message and close timing
      closeTimeoutRef.current = setTimeout(() => {
        setIsClosing(true)
        closeTimeoutRef.current = setTimeout(() => {
          onClose()
          setIsSubmitted(false)
          setFormData({ name: '', phone: '' })
        }, 300)
      }, 3000)
    }
  }, [formData, isSubmitted, isClosing, onClose])

  // 6. Close on overlay click with safeguard
  const handleOverlayClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget && !isClosing && isVisible) {
      setIsClosing(true)
      closeTimeoutRef.current = setTimeout(onClose, 300)
    }
  }, [isClosing, isVisible, onClose])

  // 7. Focus management with error handling
  useEffect(() => {
    if (isVisible && nameInputRef.current) {
      try {
        nameInputRef.current.focus()
      } catch (err) {
        console.log(err);
        setMountError('Не удалось сфокусироваться на поле ввода')
      }
    }
  }, [isVisible])

  // 8. Component mount/unmount cleanup
  useEffect(() => {
    return () => {
      if (openTimeoutRef.current) clearTimeout(openTimeoutRef.current)
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current)
    }
  }, [])

  // 9. Early return with fallback UI if not mounted or errored
  if (!isOpen && !isVisible) return null
  if (mountError) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
        <div className="bg-gray-900 text-white p-8 w-full max-w-md mx-4 border-2 border-red-500">
          <p className="text-red-500">Ошибка: {mountError}</p>
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-lime-400 text-black"
          >
            Закрыть
          </button>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm transition-opacity duration-300 ${isClosing || !isVisible ? 'opacity-0' : 'opacity-100'}`}
      onClick={handleOverlayClick}
      // 10. Accessibility: keyboard navigation support
      role="dialog"
      aria-modal="true"
      aria-labelledby="popup-title"
    >
      <div
        ref={popupRef}
        className="relative bg-gradient-to-br from-gray-900 to-black text-white p-8 md:p-12 w-full max-w-md mx-4 border-2 border-lime-400/50 shadow-2xl shadow-lime-400/20 transform transition-all duration-300 hover:scale-105"
      >
        {/* Closing X button with tooltip and enhanced feedback */}
        <button
          onClick={() => {
            if (!isClosing) {
              setIsClosing(true)
              closeTimeoutRef.current = setTimeout(onClose, 300)
            }
          }}
          className="absolute top-4 right-4 text-white/70 hover:text-lime-400 transition-all duration-300 hover:rotate-90 focus:outline-none focus:ring-2 focus:ring-lime-400 group"
          aria-label="Закрыть попап"
        >
          <X size={24} />
          <span className="absolute -top-8 right-0 bg-gray-800 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            Закрыть
          </span>
        </button>

        {/* Logo with subtle pulse animation on load */}
        <div className="flex justify-center mb-6">
          <Image
            src="/logo2.png"
            alt="The Residence Logo"
            width={140}
            height={40}
            className="h-auto w-auto transform transition-all duration-500 hover:scale-110 animate-pulse-once"
            priority
            onError={() => setMountError('Не удалось загрузить логотип')}
          />
        </div>

        {/* Title with gradient and staggered entrance */}
        <h2 id="popup-title" className="text-2xl md:text-3xl font-bold text-center bg-gradient-to-r from-lime-400 to-yellow-300 bg-clip-text text-transparent mb-6 animate-fade-in">
          Присоединяйтесь к нам!
        </h2>

        {/* Form or success message */}
        {!isSubmitted ? (
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="relative">
              <input
                ref={nameInputRef}
                type="text"
                placeholder="Ваше имя"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`w-full p-3 bg-gray-800/80 border ${errors.name ? 'border-red-500' : 'border-gray-600'} rounded-none text-white placeholder-gray-400 focus:border-lime-400 focus:ring-2 focus:ring-lime-400/50 transition-all duration-300 hover:bg-gray-700`}
                required
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'name-error' : undefined}
              />
              <div className="absolute inset-y-0 right-0 w-1 bg-lime-400/0 transition-all duration-300 group-focus-within:w-full" />
              {errors.name && (
                <p id="name-error" className="text-red-500 text-xs mt-1 animate-fade-in">
                  {errors.name}
                </p>
              )}
            </div>
            <div className="relative">
              <input
                type="tel"
                placeholder="Ваш телефон"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className={`w-full p-3 bg-gray-800/80 border ${errors.phone ? 'border-red-500' : 'border-gray-600'} rounded-none text-white placeholder-gray-400 focus:border-lime-400 focus:ring-2 focus:ring-lime-400/50 transition-all duration-300 hover:bg-gray-700`}
                required
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? 'phone-error' : undefined}
              />
              <div className="absolute inset-y-0 right-0 w-1 bg-lime-400/0 transition-all duration-300 group-focus-within:w-full" />
              {errors.phone && (
                <p id="phone-error" className="text-red-500 text-xs mt-1 animate-fade-in">
                  {errors.phone}
                </p>
              )}
            </div>

            {/* Submit button with loading state and enhanced feedback */}
            <button
              type="submit"
              className="w-full px-6 py-3 bg-gradient-to-r from-lime-400 to-yellow-300 text-black font-bold skew-x-[15deg] hover:skew-x-[10deg] transition-all duration-300 transform hover:shadow-lg hover:shadow-lime-400/30 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitted || isClosing}
            >
              <span className="-skew-x-[15deg] block">
                {isSubmitted ? 'Отправка...' : 'Отправить'}
              </span>
            </button>
          </form>
        ) : (
          <div className="text-center animate-fade-in">
            <div className="flex justify-center mb-4">
              <svg
                className="w-16 h-16 text-lime-400 animate-checkmark"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-lg text-gray-300 mt-4 transition-opacity duration-500">
              Мы свяжемся с вами в ближайшее время!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
