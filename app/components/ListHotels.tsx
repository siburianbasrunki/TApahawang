"use client"
import React from "react";
import iconsBest from "../../public/assets/hotels.svg";
import Image from "next/image";
import useSwr from "swr";

const fetcher = (url:string) => fetch(url).then((res) => res.json());

const useVilla = () => {
  const { data, error } = useSwr(`/api/villas`, fetcher);
  // console.log(data);
  
  return {
    villas: data,
    isLoading: !error && !data,
    isError: error,
  };
};

const ListHotels = () => {
  const { villas, isLoading, isError } = useVilla();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error loading data</p>;
  }

  return (
    <div className="bg-[#D9D9D9] text-center">
      <div className="p-4">
        <Image src={iconsBest} alt="iconBest" className="mx-auto" />
        <h1 className="text-3xl font-bold">Hotels & Villa</h1>
        <small className="font-bold">
          Pesan Hotel dan Villa di Pulau Pahawang
        </small>
      </div>
      <div className="listHotels grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {villas?.villas?.map((villa:any, index:any) => (
          <div
            key={index}
            className="card card-compact bg-base-100 shadow-xl sm:w-[282px] sm:h-[327px]"
          >
            <figure>
              <Image
                src={villa.gambar}
                alt={villa.nama}
                className="w-full"
                width={400}
                height={300}
              />
            </figure>
            <div className="card-body items-center">
              <h2 className="card-title font-bold">{villa.nama}</h2>
              <p className="text-sm text-gray-500">{villa.deskripsi}</p>
              <p className="text-lg font-semibold">
                {villa.hargaPerMalam.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListHotels;
