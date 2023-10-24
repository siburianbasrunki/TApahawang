import React from "react";
import Villa from "../../public/assets/villa.png";
import CardComponent from "./CardComponent";

const VillaComponent = () => {
  const villaData = [
    {
      name: "Villa A",
      location: "Pulau Pahawang",
      price: "1000",
      image: Villa,
    },
    {
      name: "Villa B",
      location: "Pulau Pahawang",
      price: "1200",
      image: Villa,
    },
    {
      name: "Villa C",
      location: "Pulau Pahawang",
      price: "900",
      image: Villa,
    },
    {
      name: "Villa A",
      location: "Pulau Pahawang",
      price: "1000",
      image: Villa,
    },
    {
      name: "Villa B",
      location: "Pulau Pahawang",
      price: "1200",
      image: Villa,
    },
    {
      name: "Villa C",
      location: "Pulau Pahawang",
      price: "900",
      image: Villa,
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold p-4">Villa</h1>
      <CardComponent data={villaData} />
    </div>
  );
};

export default VillaComponent;
