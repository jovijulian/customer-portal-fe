"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Pagination, Autoplay } from 'swiper/modules';

interface Banner {
  id: number;
  image: string;
  link: string;
}

interface Props {
  banners: Banner[];
}

const PromotionalBanners: React.FC<Props> = ({ banners }) => {
  if (!banners || banners.length === 0) return null;

  return (
    <div className="rounded-2xl overflow-hidden shadow-lg bg-white ">
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={15}
        slidesPerView={1}
        centeredSlides={true}
        pagination={{ clickable: true }}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        loop={true}
        className="w-full h-60"
      >
        {banners.map((banner) => (
          // Tambahkan `relative` di sini
          <SwiperSlide key={banner.id} className="rounded-xl overflow-hidden relative">
            <Link href={banner.link}>
              <Image
                src={banner.image}
                alt={`Promo ${banner.id}`}
                fill // ✨ Gunakan 'fill' daripada width & height
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Optional, untuk performa
                className="w-full h-full object-cover" // 👍 Kombinasi ini sudah benar
                unoptimized
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PromotionalBanners;