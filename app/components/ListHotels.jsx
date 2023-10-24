import React from "react";
import iconsBest from "../../public/assets/hotels.svg";
import Image from "next/image";
import Villa from "../../public/assets/villa.png";
const hotelsData = [
  {
    name: "Hotel A",
    location: "Pulau Pahawang",
    pricePerNight: "$100",
    image: Villa,
  },
  {
    name: "Hotel B",
    location: "Pulau Pahawang",
    pricePerNight: "$120",
    image: Villa,
  },
  {
    name: "Hotel C",
    location: "Pulau Pahawang",
    pricePerNight: "$90",
    image: Villa,
  },
  {
    name: "Hotel D",
    location: "Pulau Pahawang",
    pricePerNight: "$110",
    image: Villa,
  },
  {
    name: "Villa E",
    location: "Pulau Pahawang",
    pricePerNight: "$150",
    image: Villa,
  },
  {
    name: "Villa F",
    location: "Pulau Pahawang",
    pricePerNight: "$130",
    image: Villa,
  },
  {
    name: "Villa G",
    location: "Pulau Pahawang",
    pricePerNight: "$140",
    image: Villa,
  },
];

const ListHotels = () => {
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
        {hotelsData.map((hotel, index) => (
          <div
            key={index}
            className="card card-compact bg-base-100 shadow-xl sm:w-[282px] sm:h-[327px]"
          >
            <figure>
              <Image
                src={hotel.image}
                alt={hotel.name}
                className="w-full"
                width={400}
                height={300}
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{hotel.name}</h2>
              <div className="flex justify-between">
                <p className="text-sm text-gray-500">{hotel.location}</p>
                <p className="text-lg font-semibold">
                  {hotel.pricePerNight}/night
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListHotels;
