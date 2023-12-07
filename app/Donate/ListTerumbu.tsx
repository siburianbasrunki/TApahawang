"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import Style from './donate.module.css';
import { EffectCoverflow, Pagination } from 'swiper/modules';

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
            <p className="text-3xl font-bold mb-4 mt-4 text-center text-gray-800 uppercase lg:leading-none">
                Terumbu Karang Pulau Pahawang
            </p>
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={'auto'}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }}
                pagination={true}
                modules={[EffectCoverflow, Pagination]}
                className="mySwiper"
            >
                    {karangs ? (
                        karangs.karangs.map((karang) => (
                            <SwiperSlide className={Style.swiper} key={karang.id}>
                                <Image src={karang.gambar} alt={karang.gambar} width={300} height={300} className="rounded items-center"/> 
                            </SwiperSlide>
                        ))
                    ) : (
                        <div>
                            <SkeletonCard />
                            <SkeletonCard />
                            <SkeletonCard />
                        </div>
                    )}
            </Swiper>
        </div>
    );
};

export default ListTerumbu;
