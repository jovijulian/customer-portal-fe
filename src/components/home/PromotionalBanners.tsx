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
    <div className="rounded-2xl overflow-hidden shadow-lg bg-white p-2">
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={15}
        slidesPerView={1.15} 
        centeredSlides={true} 
        pagination={{ clickable: true }}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        loop={true} 
        className="w-full h-40" 
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id} className="rounded-xl overflow-hidden">
            <Link href={banner.link}>
              <Image
                src={banner.image}
                alt={`Promo ${banner.id}`}
                width={300}
                height={160} 
                className="w-full h-full object-cover"
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