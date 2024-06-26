"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import FormTransportBooking from "./FormTranportBooking";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
interface TransportasiData {
  id: string;
  nama: string;
  deskripsi: string;
  harga: number;
  gambar: string;
  ketersediaan: number;
}

interface TransportasiResponse {
  transportasis: TransportasiData[];
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

const TransportasiComponent = () => {
  const [windowWidth, setWindowWidth] = useState(0);
  const [transportasis, setTransportasi] =
    useState<TransportasiResponse | null>(null);
  const [selectedTransport, setSelectedTransport] =
    useState<TransportasiData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/transportasi");
        const json: TransportasiResponse = await res.json();
        setTransportasi(json);
      } catch (error) {
        console.error("Error fetching transportasi:", error);
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

  const handleCardClick = (transportasi: TransportasiData) => {
    setSelectedTransport(transportasi);
  };

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="md:container mx-auto sm:container p-4">
        <h1 className="text-3xl font-bold mb-4">Transportasi</h1>

        {transportasis ? (
          transportasis?.transportasis?.length > 0 ? (
            <div className="flex flex-wrap -mx-4">
              {transportasis.transportasis.map((transportasi, index) => (
                <div
                  className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4"
                  key={index}
                >
                  <div
                    className={`card bg-white rounded-lg overflow-hidden shadow-xl hover:shadow-2xl ${
                      windowWidth < 768 ? "mobile-card" : ""
                    }`}
                    onClick={() => handleCardClick(transportasi)}
                  >
                    <div className="relative h-48">
                      <Image
                        src={transportasi.gambar}
                        alt={transportasi.nama}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-t-lg"
                      />
                    </div>
                    <div className="p-4">
                      <h2 className="text-xl font-bold mb-2">
                        {transportasi.nama}
                      </h2>
                      <p className="text-gray-600 mb-2">
                        {transportasi.deskripsi}
                      </p>

                      <p className="text-gray-600 mb-2">
                        Jlh Penumpang :{" "}
                        <span className="font-bold">
                          {transportasi.ketersediaan}
                        </span>
                      </p>
                      <p className="text-blue-500 font-semibold">
                        {transportasi.harga.toLocaleString("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        })}
                      </p>

                      <FormTransportBooking
                        selectedTransport={selectedTransport}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>Tidak ada transportasi yang tersedia.</p>
          )
        ) : (
          <SkeletonLoader />
        )}
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
};

export default TransportasiComponent;
