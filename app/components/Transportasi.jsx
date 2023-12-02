import React, { useEffect, useState } from "react";
import Transportasi from "../../public/assets/Transportasi.png";
import Image from "next/image";

const getTransportasi = async () => {
  const res = await fetch(process.env.BASE_URL + "/api/transportasi");
  const json = await res.json();
  return json;
};

const TransportasiComponent = () => {
  const [windowWidth, setWindowWidth] = useState(0);
  const [transportasis, setTransportasis] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTransportasi();
        setTransportasis(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    setWindowWidth(window.innerWidth);

    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold p-4">Transportasi</h1>
      <div className="flex flex-wrap -m-4">
        {transportasis?.transportasis?.map((transportasi, index) => (
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4" key={transportasi.id}>
            <div
              className={`card card-compact bg-base-100 shadow-xl hover:scale-105 transform transition ${
                windowWidth < 768 ? "mobile-card" : ""
              }`}
            >
              <figure className="h-48">
                <Image src={Transportasi} alt={transportasi.nama} />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{transportasi.nama}</h2>
                <p>{transportasi.deskripsi}</p>
                <p>Rp {transportasi.harga}</p>
        
                <button className="btn btn-primary mt-2">Pesan</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransportasiComponent;
