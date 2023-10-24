import React from "react";
import Merch from "../../public/assets/merch.jpg";
import CardComponent from "./CardComponent";

const Merchandise = () => {
  const villaData = [
    {
      name: "Merch A",
      location: "Pulau Pahawang",
      price: "1000",
      image: Merch,
    },
    {
      name: "Merch B",
      location: "Pulau Pahawang",
      price: "1020",
      image: Merch,
    },
    {
      name: "Merch C",
      location: "Pulau Pahawang",
      price: "900",
      image: Merch,
    },
    {
      name: "Merch A",
      location: "Pulau Pahawang",
      price: "1000",
      image: Merch,
    },
    {
      name: "Merch B",
      location: "Pulau Pahawang",
      price: "1020",
      image: Merch,
    },
    {
      name: "Merch C",
      location: "Pulau Pahawang",
      price: "900",
      image: Merch,
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold p-4">Merchancdise</h1>
      <CardComponent data={villaData} />
    </div>
  );
};

export default Merchandise;
