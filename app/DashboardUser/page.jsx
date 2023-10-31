"use client"
import React, { useState } from "react";
import Villa from "../../public/assets/villa.png";
import Image from "next/image";

const Dashboaruser = () => {
  const [selectedTab, setSelectedTab] = useState("donasi");
  const donasiData = [
    // Data untuk Riwayat Donasi
    {
      name: "Donasi 1",
      location: "Lokasi Donasi 1",
      amount: "$50",
      image: Villa, // Gambar yang sesuai
    },
    {
      name: "Donasi 2",
      location: "Lokasi Donasi 2",
      amount: "$75",
      image: Villa, // Gambar yang sesuai
    },
    {
      name: "Donasi 3",
      location: "Lokasi Donasi 3",
      amount: "$30",
      image: Villa, // Gambar yang sesuai
    },
  ];

  const bookingData = [
    // Data untuk Riwayat Booking
    {
      name: "Hotel A",
      location: "Pulau Pahawang",
      pricePerNight: "$100",
      image: Villa, // Gambar yang sesuai
    },
    {
      name: "Hotel B",
      location: "Pulau Pahawang",
      pricePerNight: "$120",
      image: Villa, // Gambar yang sesuai
    },
    {
      name: "Hotel C",
      location: "Pulau Pahawang",
      pricePerNight: "$90",
      image: Villa, // Gambar yang sesuai
    },
  ];

  return (
    <div className="bg-[#D3D5DD] ">
      {/* Div untuk latar belakang putih */}
      <div className="bg-white shadow-lg w-2/3 m-auto p-4">
        {/* Div untuk header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold">Selamat Datang</h1>
          <h3 className="text-3xl font-bold">Nama User Ketika Sudah Login</h3>
        </div>
      </div>
      {/* Div untuk filter riwayat pemesanan atau donasi */}
      <div>
        <div className="flex justify-center mt-8">
          <div
            className={`cursor-pointer ${
              selectedTab === "donasi" ? "bg-gray-400" : "bg-blue-400"
            } p-2 mr-4`}
            onClick={() => setSelectedTab("donasi")}
          >
            Daftar Riwayat Donasi
          </div>
          <div
            className={`cursor-pointer ${
              selectedTab === "booking" ? "bg-gray-400" : "bg-blue-400"
            } p-2`}
            onClick={() => setSelectedTab("booking")}
          >
            Daftar Riwayat Booking
          </div>
        </div>
      </div>
      {/* Div untuk menampilkan card pemesanan atau booking */}
      <div className="daftar flex flex-wrap justify-center mt-8">
        {selectedTab === "donasi"
          ? // Tampilan Daftar Riwayat Donasi
            donasiData.map((item, index) => (
              <div key={index} className="m-4">
                <div className="max-w-sm rounded overflow-hidden shadow-lg">
                  <Image src={item.image} alt={item.name} className="w-full" />
                  <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{item.name}</div>
                    <p className="text-gray-700 text-base">
                      Lokasi: {item.location}
                    </p>
                    <p className="text-gray-700 text-base">
                      Jumlah Donasi: {item.amount}
                    </p>
                  </div>
                </div>
              </div>
            ))
          : // Tampilan Daftar Riwayat Booking
            bookingData.map((item, index) => (
              <div key={index} className="m-4">
                <div className="max-w-sm rounded overflow-hidden shadow-lg">
                  <Image src={item.image} alt={item.name} className="w-full" />
                  <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{item.name}</div>
                    <p className="text-gray-700 text-base">
                      Lokasi: {item.location}
                    </p>
                    <p className="text-gray-700 text-base">
                      Harga per Malam: {item.pricePerNight}
                    </p>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Dashboaruser;
