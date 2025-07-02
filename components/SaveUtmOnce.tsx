/* components/SaveUtmOnce.tsx */
'use client'
import { useEffect } from 'react'
import { saveUtmToStorage } from '@/utils/utm'

export default function SaveUtmOnce() {
  useEffect(saveUtmToStorage, [])
  return null
}
