"use client";
import React, { useState } from "react";
import VillaComponent from "../components/Villa";
import TransportasiComponent from "../components/Transportasi";
import MerchandiseComponent from "../components/Merchandise"; 
import {MdVilla,MdDirectionsBoat,MdCardGiftcard} from "react-icons/md"
const Special = () => {
  const [activeSection, setActiveSection] = useState("Villa");

  return (
    <div>
      <div className="btn-group flex justify-center items-center mt-8">
        <button
          className={`btn ${activeSection === "Villa" ? "bg-primary text-white" : ""}`}
          onClick={() => setActiveSection("Villa")}
        >
          <MdVilla/> Villa
        </button>

        <button
          className={`btn ${activeSection === "Transportasi" ? "bg-primary text-white" : ""}`}
          onClick={() => setActiveSection("Transportasi")}
        >
          <MdDirectionsBoat/> Transportasi
        </button>

        <button
          className={`btn ${activeSection === "Merchandise" ? "bg-primary text-white" : ""}`}
          onClick={() => setActiveSection("Merchandise")}
        >
          <MdCardGiftcard/> Merchandise
        </button>
      </div>

      {activeSection === "Villa" && <VillaComponent />}
      {activeSection === "Transportasi" && <TransportasiComponent />}
      {activeSection === "Merchandise" && <MerchandiseComponent />}
    </div>
  );
};

export default Special;

