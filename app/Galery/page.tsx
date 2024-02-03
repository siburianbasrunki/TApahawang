"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

interface GaleriData {
  gambar: string;
  title: string;
}

interface GaleriResponse {
  galeries: GaleriData[];
}

const Galery = () => {
  const [galeries, setGaleries] = useState<GaleriResponse | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/galery");
        const json: GaleriResponse = await res.json();
        setGaleries(json);
      } catch (error) {
        console.error("Error fetching galeri:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Galery Konservasi</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galeries ? (
            galeries.galeries.length > 0 ? (
              galeries.galeries.map((galeri, index) => (
                <div
                  key={index}
                  className="overflow-hidden bg-gray-300 rounded-lg"
                >
                  <Image
                    src={galeri.gambar}
                    width={400}
                    height={400}
                    alt={galeri.title}
                    objectFit="cover"
                    className="w-full h-40 md:h-48 lg:h-56 object-cover"
                  />
                  <div className="p-4">
                    <h2 className="text-lg font-semibold">{galeri.title}</h2>
                  </div>
                </div>
              ))
            ) : (
              <p>tidak ada foto konservasi</p>
            )
          ) : (
            Array.from({ length: 8 }, (_, index) => (
              <SkeletonLoader key={index} />
            ))
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

const SkeletonLoader = () => (
  <div className="bg-gray-200 p-4 rounded-md w-full md:w-80 animate-pulse">
    <div className="w-full h-48 bg-gray-300 mb-4"></div>
  </div>
);

export default Galery;
