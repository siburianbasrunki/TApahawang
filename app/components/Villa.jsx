"use client";
import React, { useEffect, useState } from "react";
import Villa from "../../public/assets/villa.png";
import Image from "next/image";

const getVilla = async () => {
  const res = await fetch(process.env.BASE_URL + "/api/villas");
  console.log(process.env.BASE_URL+"/api/villas")
  const json = await res.json();
  console.log(json);
  return json;
};

const VillaComponent = async () => {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);

    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const villas = await getVilla();

  return (
    <div>
      <h1 className="text-3xl font-bold p-4">Villa</h1>
      <div className="flex flex-wrap -m-4">
        {villas?.villas?.map((villa, index) => (
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4" key={index}>
            <div
              className={`card card-compact bg-base-100 shadow-xl hover:scale-105 transform transition ${
                windowWidth < 768 ? "mobile-card" : ""
              }`}
            >
              <figure className="h-48">
                <Image src={villa.gambar} alt={villa.nama} />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{villa.nama}</h2>
                <p>{villa.deskripsi}</p>
                <p>Rp {villa.hargaPerMalam}</p>

                <button className="btn btn-primary mt-2">Pesan</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VillaComponent;
