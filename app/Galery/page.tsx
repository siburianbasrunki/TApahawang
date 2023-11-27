"use client"
import React, { useState, useEffect } from 'react'
import Image from 'next/image'

interface GaleriData {
  gambar: string
  title: string
}

interface GaleriResponse {
  galeries: GaleriData[]
}


const SkeletonLoader = () => (
  <div className="bg-gray-200 p-4 rounded-md w-full md:w-80 animate-pulse">
    <div className='w-full h-48 bg-gray-300 mb-4'></div>
  </div>
);
const Galery = () => {
  const [windowWidth, setWindowWidth] = useState(0);
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

    setWindowWidth(window.innerWidth);

    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    fetchData();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div className='md:container mx-auto sm:container p-4'>
        <div className='text-3xl font-bold mb-4'>Galery Konsevasi</div>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {galeries ? (
            galeries.galeries.length > 0 ? (
              galeries.galeries.map((galeri, index) => (
                <div key={index} className='relative overflow-hidden rounded-md'>
                  <Image
                    src={galeri.gambar}
                    alt={galeri.title}
                    layout='responsive'
                    height={400}
                    width={400}
                    objectFit='cover'
                    className='transition-transform transform hover:scale-110'
                  />
                </div>
              ))
            ) : <p>tidak ada foto konsevasi</p>
          ) : (
            Array.from({ length: 8 }, (_, index) => (
              <SkeletonLoader key={index} />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Galery;