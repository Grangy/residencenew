/* utils/utm.ts */
export const UTM_KEYS = ['utm_source','utm_medium','utm_campaign','utm_term','utm_content'] as const

export type Utm = Partial<Record<(typeof UTM_KEYS)[number], string>>

export function saveUtmToStorage() {
  const params = new URLSearchParams(window.location.search)
  const utm: Utm = {}
  UTM_KEYS.forEach(k => {
    const v = params.get(k)
    if (v) utm[k] = v
  })
  if (Object.keys(utm).length) {
    localStorage.setItem('utm', JSON.stringify(utm))
  }
}

export function getUtmFromStorage(): Utm {
  try {
    return JSON.parse(localStorage.getItem('utm') || '{}')
  } catch { return {} }
}
