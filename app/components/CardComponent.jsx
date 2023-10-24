import React from "react";
import Image from "next/image";

const CardComponent = ({ data }) => {
  return (
    <div className="flex flex-wrap -m-4">
      {data.map((item, index) => (
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4" key={index}>
          <div
            className={`card card-compact bg-base-100 shadow-xl hover:scale-105 transform transition ${
              window.innerWidth < 768 ? "mobile-card" : ""
            }`}
          >
            <figure className="h-48">
              <Image src={item.image} alt={item.name} />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{item.name}</h2>
              <p>{item.location}</p>
              <p>Rp {item.price}</p>

              <button className="btn btn-primary mt-2">Pesan</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardComponent;
