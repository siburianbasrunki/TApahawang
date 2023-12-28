"use client";
import React, { useState, useEffect } from "react";
import iconsBest from "../../public/assets/hotels.svg";
import Image from "next/image";
import useSwr from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const useVilla = () => {
  const { data, error } = useSwr(`/api/villas`, fetcher);

  return {
    villas: data,
    isLoading: !error && !data,
    isError: error,
  };
};

const ListHotels = () => {
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  const updateWindowWidth = () => {
    setWindowWidth(typeof window !== "undefined" ? window.innerWidth : 0);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("resize", updateWindowWidth);

      return () => {
        window.removeEventListener("resize", updateWindowWidth);
      };
    }
  }, []);

  const { villas, isLoading, isError } = useVilla();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error loading data</p>;
  }

  return (
    <div className="bg-[#D9D9D9]">
      <div className="container mx-auto text-center ">
        <div className="p-4">
          <Image src={iconsBest} alt="iconBest" className="mx-auto" />
          <h1 className="text-3xl font-bold">Hotels & Villa</h1>
          <small className="font-bold">
            Pesan Hotel dan Villa di Pulau Pahawang
          </small>
        </div>
        <div className="flex flex-wrap ">
          {villas?.villas?.slice(0, 4).map((villa: any, index: any) => (
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4" key={index}>
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
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListHotels;
