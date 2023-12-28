"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

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
    <div className="container mx-auto">
      <div className="text-center text-2xl font-bold p-8">
        <h1 className="mb-4">Aktivitas Terakhir Kami</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {galeries ? (
            galeries.galeries.length > 0 ? (
              galeries.galeries.slice(0, 3).map((galeri, index) => (
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
              <p>No activities available</p>
            )
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <Link
          href="/Galery"
          className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          More Aktivitas
        </Link>
      </div>
    </div>
  );
};

export default Activity;
