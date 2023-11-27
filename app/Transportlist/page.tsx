"use client";
import React, { useEffect, useState } from "react";
import TransImg from "../../public/assets/Transportasi.png";
import Image from "next/image";

interface TransportasiData {
  nama: string;
  deskripsi: string;
  harga: number;
  gambar : string
}

interface TransportasiResponse {
  transportasi: TransportasiData[];
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

const TransportasiComponent = () => {
  const [windowWidth, setWindowWidth] = useState(0);
  const [transportasis, setTransportasi] =
    useState<TransportasiResponse | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/transportasi");
        const json: TransportasiResponse = await res.json();
        setTransportasi(json);
      } catch (error) {
        console.error("Error fetching transportasi:", error);
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
    <div className="md:container mx-auto sm:container p-4">
      <h1 className="text-3xl font-bold mb-4">Transportasi</h1>

      {transportasis ? (
        transportasis.transportasi.length > 0 ? (
          <div className="flex flex-wrap -mx-4">
            {transportasis.transportasi.map((transportasi, index) => (
              <div
                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4"
                key={index}
              >
                <div
                  className={`card bg-white rounded-lg overflow-hidden shadow-xl hover:shadow-2xl ${
                    windowWidth < 768 ? "mobile-card" : ""
                  }`}
                >
                  <div className="relative h-48">
                    <Image
                      src={transportasi.gambar}
                      alt={transportasi.nama}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-t-lg"
                    />
                  </div>
                  <div className="p-4">
                    <h2 className="text-xl font-bold mb-2">{transportasi.nama}</h2>
                    <p className="text-gray-600 mb-4">{transportasi.deskripsi}</p>
                    <p className="text-blue-500 font-semibold">
                      {transportasi.harga.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })}
                    </p>

                    <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
                      Pesan
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>Tidak ada transportasi yang tersedia.</p>
        )
      ) : (
        <SkeletonLoader />
      )}
    </div>
  );
};

export default TransportasiComponent;
