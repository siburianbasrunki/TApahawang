"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import Style from "./component.module.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import imgActivity from "../../public/assets/activity.png";
import {
  Autoplay,
  Pagination,
  Navigation,
  EffectCoverflow,
} from "swiper/modules";

const dataActivity = [
  {
    imageSrc: imgActivity,
    title: "Title 1",
    description: "Description 1",
  },
  {
    imageSrc: imgActivity,
    title: "Title 2",
    description: "Description 2",
  },
  {
    imageSrc: imgActivity,
    title: "Title 2",
    description: "Description 2",
  },
];

const Activity = () => {
  return (
    <div>
      <div className="p-8">
        <h1 className="text-3xl font-bold text-center">Our Activity</h1>
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
          className={Style.mySwiper}
          effect="coverflow"
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
        >
          {dataActivity.map((activity, index) => (
            <SwiperSlide key={index} className={Style.swiperSlide}>
              <div className={Style.slideContent}>
                <Image
                  src={activity.imageSrc}
                  alt={`Activity ${index + 1}`}
                  width={500}
                  height={300}
                  className={Style.imageWithText}
                />
                <div className={Style.textOverlay}>
                  <h2 className={Style.slideTitle}>{activity.title}</h2>
                  <p className={Style.slideDescription}>
                    {activity.description}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Activity;
