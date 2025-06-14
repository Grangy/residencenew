// sections/Slider.tsx
'use client'

import React from 'react'
import Slider from 'react-slick'
import Image from 'next/image'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const photos = [
  '/about/photo1.png',
  '/about/photo2.png',
  '/about/photo3.png',
  '/about/photo4.png',
  '/about/photo5.png',
  '/about/photo6.png',
]

export default function SliderSection() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 }
      }
    ]
  }

  return (
    <section className="py-16 bg-black text-white">
      <div className="max-w-6xl mx-auto px-4">
        <Slider {...settings} className="space-x-4">
          {photos.map((src, idx) => (
            <div key={idx} className="px-2">
              <div className="relative h-64 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={src}
                  alt={`Интерьер ${idx + 1}`}
                  fill
                  className="object-cover"
                  priority={idx < 2}
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  )
}


