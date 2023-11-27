import React from "react";
import iconsBest from "../../public/assets/hotels.svg";
import Image from "next/image";
import Villaimg from "../../public/assets/villa.png";

const getVilla = async () => {
  const res = await fetch(process.env.BASE_URL + "/api/villas");
  console.log(process.env.BASE_URL + "/api/villas")
  const json = await res.json()
  console.log(json)
  return json;
};

const ListHotels = async () => {
  const villas = await getVilla();
  console.log(villas)
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
        {villas?.villas?.map((villa: any, index: number) => (
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
