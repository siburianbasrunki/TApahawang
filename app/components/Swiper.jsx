"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import Image from "next/image";

const SwiperComponent = ({ data }) => {
  const [slidesPerView, setSlidesPerView] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSlidesPerView(1);
      } else if (window.innerWidth < 1024) {
        setSlidesPerView(2);
      } else {
        setSlidesPerView(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Swiper
      slidesPerView={slidesPerView}
      spaceBetween={30}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination]}
    >
      {data.map((item, index) => (
        <SwiperSlide className="flex p-4" key={index}>
          <div
            className={`card card-compact bg-base-100 shadow-xl hover:scale-105 transform transition ${
              window.innerWidth < 768 ? "mobile-card" : ""
            }`}
          >
            <figure>
              <Image src={item.image} alt={item.name} className="w-full" />
            </figure>
            <div className="card-body">
              <h2 className="card-titlez ">{item.name}</h2>
              <p>{item.location}</p>
              <p>{item.price}/night</p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwiperComponent;
