/* equinox-dark/app/page.tsx */
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Hero from '@/sections/Hero'
import HeroVideo from '@/sections/HeroVideo'
import Hero2 from '@/sections/Hero2'
import InteractiveFeatures from '@/sections/InteractiveFeatures'
import SliderSection from '@/sections/Slider'



export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Header />

      {/* Секция Видео */}
      <div id="club">
        <HeroVideo />
      </div>

      {/* Сезонное предложение */}
      <div id="advantages">
        <Hero />
      </div>

      {/* О резиденции */}
      <div id="programs">
        <Hero2 />
      </div>

      {/* Интерактивные преимущества */}
      <div id="spa">
        <InteractiveFeatures />
      </div>

      {/* Карусель интерьеров */}
      <div id="bar">
        <SliderSection />
      </div>

      <Footer />
    </main>
  )
}

