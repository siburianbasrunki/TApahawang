import React from "react";
import Transportasi from "../../public/assets/Transportasi.png";
import SwiperComponent from "./Swiper";
import CardComponent from "./CardComponent";

const TransportasiComponent = () => {
  const transportasiData = [
    {
      name: "Transportasi A",
      location: "Pulau Pahawang",
      price: "500",
      image: Transportasi,
    },
    {
      name: "Transportasi B",
      location: "Pulau Pahawang",
      price: "600",
      image: Transportasi,
    },
    {
      name: "Transportasi C",
      location: "Pulau Pahawang",
      price: "400",
      image: Transportasi,
    },
    {
      name: "Transportasi A",
      location: "Pulau Pahawang",
      price: "500",
      image: Transportasi,
    },
    {
      name: "Transportasi B",
      location: "Pulau Pahawang",
      price: "600",
      image: Transportasi,
    },
    {
      name: "Transportasi C",
      location: "Pulau Pahawang",
      price: "400",
      image: Transportasi,
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold p-4">Transportasi</h1>
      <CardComponent data={transportasiData} />
    </div>
  );
};

export default TransportasiComponent;
