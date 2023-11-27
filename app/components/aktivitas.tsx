"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Pagination,
  Navigation,
  EffectCoverflow,
} from "swiper/modules";

interface GaleriData {
  title: string;
  deskripsi: string;
  gambar: string;
}

interface GaleriResponse {
  galeries: GaleriData[];
}

const Activity = () => {
  const [windowWidth, setWindowWidth] = useState(0);
  const [galeries, setGaleries] = useState<GaleriResponse | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/galery");
        const json: GaleriResponse = await res.json();
        setGaleries(json);
      } catch (error) {
        console.error("Error fetching villas:", error);
      }
    };

    setWindowWidth(window.innerWidth);

    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    fetchData();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Our Activity</h1>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation, EffectCoverflow]}
        className="carousel w-full"
        effect="coverflow"
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
      >
        {galeries ? (
          galeries.galeries.length > 0 ? (
            galeries.galeries.map((galeri, index) => (
              <SwiperSlide key={index} className="carousel-item w-full rounded">
                <div className="relative h-64 rounded">
                  <Image
                    src={galeri.gambar}
                    alt={`Activity ${index + 1}`}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </SwiperSlide>
            ))
          ) : (
            <p>tidak ada aktivitas</p>
          )
        ) : (
          <p>loading</p>
        )}
      </Swiper>
      <div className="flex justify-center w-full py-2 gap-2">
        {galeries?.galeries.map((galeri, index) => (
          <a key={index} href={`#item${index + 1}`} className="btn btn-xs">
            {index + 1}
          </a>
        ))}
      </div>
    </div>
  );
};

export default Activity;
