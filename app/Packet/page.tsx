"use client"
import React from "react";
import fotoPaket from "../../public/assets/packet.png";
import Image from "next/image";

const Packet = () => {
  return (
    <div className="container mx-auto my-8">
      <h1 className="text-3xl font-bold mb-4">Temukan Paket Snorkling Anda</h1>
      <div className="flex flex-wrap -mx-4">
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
          <div className="card bg-white rounded-lg overflow-hidden shadow-xl">
            <div className="relative h-48">
              <Image
                src={fotoPaket}
                alt="Paket Snorkeling"
                layout="fill"
                objectFit="cover"
                className="rounded-t-lg"
              />
            </div>
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">Paket Snorkeling</h2>
              <p className="text-gray-600 mb-4">
                If a dog chews shoes whose shoes does he choose?
              </p>
              <div className="flex justify-end">
                <button className="bg-blue-500 text-white px-4 py-2 rounded">
                  Chat
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Packet;
