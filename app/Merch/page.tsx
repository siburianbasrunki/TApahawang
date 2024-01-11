"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link";

interface MerchandiseData {
  nama: string;
  deskripsi: string;
  harga: number;
  gambar: string;
  noTelepon: string;
}

interface MerchResponse {
  merchs: MerchandiseData[];
}

const SkeletonLoader = () => (
  <div className="bg-gray-200 p-4 rounded-md w-full md:w-80 animate-pulse">
    <div className="w-full h-48 bg-gray-300 mb-4"></div>
    <div className="w-3/4 h-4 bg-gray-300 mb-2"></div>
    <div className="w-full h-4 bg-gray-300 mb-2"></div>
    <div className="w-1/2 h-4 bg-gray-300 mb-2"></div>
    <div className="w-1/4 h-8 bg-gray-300 mt-4"></div>
  </div>
);

const MerchComponent = () => {
  const [windowWidth, setWindowWidth] = useState(0);
  const [merchs, setMerchs] = useState<MerchResponse | null>(null);
  const [selectedMerch, setSelectedMerch] = useState<MerchandiseData | null>(
    null
  );
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/merchandise");
        const json: MerchResponse = await res.json();
        setMerchs(json);
      } catch (error) {
        console.error("Error fetching merchandise:", error);
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
  const handleCardClick = (merch: MerchandiseData) => {
    setSelectedMerch(merch);
  };
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="md:container mx-auto sm:container p-4">
        <h1 className="text-3xl font-bold mb-4">Merchandise</h1>

        {merchs ? (
          merchs.merchs.length > 0 ? (
            <div className="flex flex-wrap -mx-4">
              {merchs?.merchs?.map((merch, index) => (
                <div
                  className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4"
                  key={index}
                >
                  <div
                    className={`card bg-white rounded-lg overflow-hidden shadow-xl hover:shadow-2xl ${
                      windowWidth < 768 ? "mobile-card" : ""
                    }`}
                    onClick={() => handleCardClick(merch)}
                  >
                    <div className="relative h-48">
                      <Image
                        src={merch.gambar}
                        alt={merch.nama}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-t-lg"
                      />
                    </div>
                    <div className="p-4">
                      <h2 className="text-xl font-bold mb-2">{merch.nama}</h2>
                      <p className="text-gray-600 mb-4">{merch.deskripsi}</p>
                      <p className="text-blue-500 font-semibold">
                        {merch.harga.toLocaleString("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        })}
                      </p>

                      <Link
                        href={`https://wa.me/${merch.noTelepon}`}
                        className="flex items-center justify-center text-white bg-green-500 py-2 px-3 mt-4 rounded"
                      >
                        <FaWhatsapp className="mr-2" />
                        Pesan Via Chat WA
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>Tidak ada merchandise yang tersedia.</p>
          )
        ) : (
          <SkeletonLoader />
        )}
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
};

export default MerchComponent;
