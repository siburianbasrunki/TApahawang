"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image";

interface PaketData {
  namaPaket: string;
  asalKomunitas: string;
  nomorTelepon: string;
  gambarPaket: string;
}

interface PaketResponse {
  pakets: PaketData[];
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

const Packet = () => {
  const [windowWidth, setWindowWidth] = useState(0);
  const [pakets, setPakets] = useState<PaketResponse | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/paket");
        const json: PaketResponse = await res.json();
        setPakets(json);
      } catch (error) {
        console.error("Error fetching pakets:", error);
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

  const openWhatsApp = (phoneNumber: string, message: string) => {
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
  };

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-3xl font-bold mb-4">Temukan Paket Snorkeling Anda</h1>
      {pakets ? (
        pakets.pakets.length > 0 ? (
          <div className="flex flex-wrap -mx-4">
            {pakets.pakets.map((paket, index) => (
              <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
                <div className="card bg-white rounded-lg overflow-hidden shadow-xl">
                  <div className="relative h-48">
                    <Image
                      src={paket.gambarPaket}
                      alt={paket.namaPaket}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-t-lg"
                    />
                  </div>
                  <div className="p-4">
                    <h2 className="text-xl font-bold mb-2">{paket.namaPaket}</h2>
                    <p className="text-gray-600 mb-4">{paket.asalKomunitas}</p>
                    <div className="flex justify-end">
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={() => openWhatsApp(paket.nomorTelepon, 'Halo, saya tertarik dengan paket ini')}
                      >
                        Chat
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No pakets available.</p>
        )
      ) : (
        <SkeletonLoader />
      )}
    </div>
  );
};

export default Packet;
