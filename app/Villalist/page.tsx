"use client"
import React, { useEffect, useState } from "react";
import Villa from "../../public/assets/villa.png";
import Image from "next/image";
import FormVillaBooking from "./formVillaBooking";

interface VillaData {
  nama: string;
  deskripsi: string;
  hargaPerMalam: number;
  gambar : string ;
}

interface VillasResponse {
  villas: VillaData[];
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

const VillaComponent = () => {
  const [windowWidth, setWindowWidth] = useState(0);
  const [villas, setVillas] = useState<VillasResponse | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/villas");
        const json: VillasResponse = await res.json();
        setVillas(json);
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
    <div className="md:container mx-auto sm:container p-4">
      <h1 className="text-3xl font-bold mb-4">Villa</h1>

      {villas ? (
        villas.villas.length > 0 ? (
          <div className="flex flex-wrap -mx-4">
            {villas.villas.map((villa, index) => (
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
                      src={villa.gambar}
                      alt={villa.nama}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-t-lg"
                    />
                  </div>
                  <div className="p-4">
                    <h2 className="text-xl font-bold mb-2">{villa.nama}</h2>
                    <p className="text-gray-600 mb-4">{villa.deskripsi}</p>
                    <p className="text-blue-500 font-semibold">
                      {villa.hargaPerMalam.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })}
                    </p>

                    <FormVillaBooking />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>Tidak ada villa yang tersedia.</p>
        )
      ) : (
        <SkeletonLoader />
      )}
    </div>
  );
};

export default VillaComponent;
