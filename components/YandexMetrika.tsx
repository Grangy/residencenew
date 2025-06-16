'use client'

import { YMInitializer } from 'react-yandex-metrika'

const YandexMetrika = () => {
  return (
    <YMInitializer
      accounts={[102670742]}
      options={{
        webvisor: true,
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
      }}
      version="2"
    />
  )
}

export default YandexMetrika
