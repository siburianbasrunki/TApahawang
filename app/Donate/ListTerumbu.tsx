"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import Style from "./donate.module.css";
import { Autoplay, Pagination } from "swiper/modules";

interface KarangData {
  id: string;
  nama: string;
  deskripsi: string;
  gambar: string;
}

interface KarangResponse {
  karangs: KarangData[];
}

const SkeletonCard = () => {
  return (
    <div className="card card-compact md:w-1/2 lg:w-1/3 xl:w-1/4 mb-4 bg-base-100 shadow-xl">
      <div className="animate-pulse card-body">
        <div className="h-48 bg-slate-200 rounded-lg"></div>
        <div className="w-full h-4 bg-slate-200 rounded-lg mt-4"></div>
        <div className="w-1/2 h-4 bg-slate-200 rounded-lg mt-4"></div>
      </div>
    </div>
  );
};

const ListTerumbu = () => {
  const [karangs, setKarangs] = useState<KarangResponse | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/karang");
        const data = await response.json();
        setKarangs(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container mx-auto ">
      <p className="text-3xl font-bold p-4 text-center text-gray-800 uppercase lg:leading-none">
        Terumbu Karang Pulau Pahawang
      </p>
      {karangs && karangs.karangs.length > 0 ? (
        <Swiper
          grabCursor={true}
          slidesPerView={"auto"}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={true}
          modules={[Autoplay, Pagination]}
          className="mySwiper"
        >
          {karangs.karangs.map((karang) => (
            <SwiperSlide
              className={`flex gap-4 ${Style.swiper}`}
              key={karang.id}
            >
              <div className="hero ">
                <div className="hero-content flex-col lg:flex-row gap-4">
                  <Image
                    src={karang.gambar}
                    className="max-w-sm rounded-lg "
                    alt={karang.nama}
                    width={400}
                    height={400}
                  />
                  <div>
                    <div>
                      <h1 className="text-4xl font-bold">{karang.nama}</h1>
                    </div>
                    <div>
                      <p className="py-6">{karang.deskripsi}</p>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="text-center">
          <p>Data terumbu karang kosong.</p>
        </div>
      )}
    </div>
  );
};

export default ListTerumbu;
