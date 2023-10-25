"use client";
import React, { useState } from "react";
import Donasi from "./Donasi";
import Villa from "./Villa";
import Transportasi from "./Transportasi";
import Merchandise from "./Merchandise";
import Volunteer from "./Volunteer";

const DashboardUser = () => {
  const [selectedItem, setSelectedItem] = useState("Dashboard");

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const renderContent = () => {
    switch (selectedItem) {
      case "Donasi":
        return <Donasi />;
      case "Transportasi":
        return <Transportasi />;
      case "Villa":
        return <Villa />;
      case "Volunteer":
        return <Volunteer />;
      case "Merchandise":
        return <Merchandise />;
      default:
        return null;
    }
  };
  return (
    <div className="flex">
      <div className="w-1/4  p-4 bg-[#F8F9FA] flex justify-center">
        <ul>
          <li className="mb-2">
            <a
              href="#"
              onClick={() => handleItemClick("Donasi")}
              className={`cursor-pointer ${
                selectedItem === "Donasi" ? "text-[#030DFF]" : ""
              }`}
            >
              Donasi
            </a>
          </li>
          <li className="mb-2">
            <a
              href="#"
              onClick={() => handleItemClick("Transportasi")}
              className={`cursor-pointer ${
                selectedItem === "Transportasi" ? "text-[#030DFF]" : ""
              }`}
            >
              Transportasi
            </a>
          </li>
          <li className="mb-2">
            <a
              href="#"
              onClick={() => handleItemClick("Villa")}
              className={`cursor-pointer ${
                selectedItem === "Villa" ? "text-[#030DFF]" : ""
              }`}
            >
              Villa
            </a>
          </li>
          <li className="mb-2">
            <a
              href="#"
              onClick={() => handleItemClick("Volunteer")}
              className={`cursor-pointer ${
                selectedItem === "Volunteer" ? "text-[#030DFF]" : ""
              }`}
            >
              Volunteer
            </a>
          </li>
          <li className="mb-2">
            <a
              href="#"
              onClick={() => handleItemClick("Merchandise")}
              className={`cursor-pointer ${
                selectedItem === "Merchandise" ? "text-[#030DFF]" : ""
              }`}
            >
              Merchandise
            </a>
          </li>
        </ul>
      </div>
      <div className="w-3/4 p-4">
        <div className="content">{renderContent()}</div>
      </div>
    </div>
  );
};

export default DashboardUser;
