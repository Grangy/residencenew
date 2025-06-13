/* equinox-dark/app/page.tsx */
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Hero from '@/sections/Hero'
import Hero2 from '@/sections/Hero2'

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <Hero />
      <Hero2 />
      <Footer />
    </main>
  )
}