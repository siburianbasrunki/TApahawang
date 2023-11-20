"use client";
import React, { useEffect, useState } from "react";
import Merch from "../../public/assets/merch.jpg";
import Image from "next/image";

interface MerchandiseData {
  nama: string;
  deskripsi: string;
  harga: number;
}

interface MerchResponse {
  merchs: MerchandiseData[]; 
}

const MerchComponent = () => {
  const [windowWidth, setWindowWidth] = useState(0);
  const [merchs, setMerchs] = useState<MerchResponse | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/merchandise");
        console.log(res);

        const json: MerchResponse = await res.json();
        setMerchs(json);
      } catch (error) {
        console.error("Error fetching merchandise:", error);
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
    <div>
      <h1 className="text-3xl font-bold p-4">Merchandise</h1> 
      <div className="flex flex-wrap -m-4">
        {merchs?.merchs?.map((merch, index) => (
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4" key={index}>
            <div
              className={`card card-compact bg-base-100 shadow-xl hover:scale-105 transform transition ${
                windowWidth < 768 ? "mobile-card" : ""
              }`}
            >
              <figure className="h-48">
                <Image src={Merch} alt={merch.nama} /> 
              </figure>
              <div className="card-body">
                <h2 className="card-title">{merch.nama}</h2>
                <p>{merch.deskripsi}</p>
                <p>Rp {merch.harga}</p> 

                <button className="btn btn-primary mt-2">Pesan</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MerchComponent;
