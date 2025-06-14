// app/about/page.tsx
"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Popup from '@/components/Popup';

// React Slick slider
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const photos = [
  '/about/photo1.png',
  '/about/photo2.png',
  '/about/photo3.png',
  '/about/photo4.png',
  '/about/photo5.png',
  '/about/photo6.png',
];

export default function AboutPage() {
  const [popupOpen, setPopupOpen] = useState(false);
  const router = useRouter();

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Header />

      <main className="flex-grow container mx-auto py-16 px-6 sm:px-8 lg:px-12">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-8 leading-tight">
          О Резиденции
        </h1>

        <section className="max-w-4xl space-y-8 mb-16">
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 leading-relaxed">
            В The Residence вы найдёте всё, что должно быть в лучшем фитнес-клубе: дорогие тренажёры, квалифицированные тренеры и идеальную чистоту.
          </p>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 leading-relaxed">
            Наш сервис на уровне пятизвёздочных отелей: селективные ароматы, дизайн от Eichholtz и атмосфера клуба.
          </p>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 leading-relaxed">
            Бар предлагает 7 видов кокосовой воды, 9 видов молока и шоковую заморозку ростков пшеницы.
          </p>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 leading-relaxed">
            Мы против насилия: никакого кроссфита, зато кинезиология помогает находить причины недугов.
          </p>

          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 mt-8">
            <button
              onClick={() => setPopupOpen(true)}
              className="relative bg-lime-400 skew-x-[20deg] hover:skew-x-[15deg] transition-all duration-300 shadow-lg"
            >
              <span className="inline-block -skew-x-[20deg] px-8 py-4 text-black text-lg font-semibold">
                Присоединиться
              </span>
            </button>
            <button
              onClick={() => router.push('/')}
              className="relative border-2 border-gray-600 skew-x-[20deg] hover:skew-x-[15deg] transition-all duration-300"
            >
              <span className="inline-block -skew-x-[20deg] px-8 py-4 text-gray-300 text-lg font-semibold hover:text-white">
                На главную
              </span>
            </button>
          </div>
        </section>

        {/* React Slick Slider */}
        <section className="relative w-full max-w-4xl mb-16 mx-auto">
          <Slider {...sliderSettings} className="h-96">
            {photos.map((src, idx) => (
              <div key={idx} className="h-96 relative">
                <Image
                  src={src}
                  alt={`Photo ${idx + 1}`}
                  fill
                  className="object-cover"
                  priority={idx === 0}
                />
              </div>
            ))}
          </Slider>
        </section>

        {/* Popup */}
        <Popup isOpen={popupOpen} onClose={() => setPopupOpen(false)} />
      </main>

      <Footer />
    </div>
  );
}