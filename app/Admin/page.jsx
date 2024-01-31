"use client";
import React from "react";
import NavbarAdmin from "./NavbarAdmin";
import Transportasi from "./Transportasi/page";
import Villa from "./Villa/page";
import Merchandise from "./Merchandise/page";
import Karang from "./Terumbu/page";
import Volunteer from "./Volunteer/page";
import Donasi from "./Donasi/page";
import Paket from "./Paket/page";
import Galery from "../Admin/Galery/page";
import BookingVilla from "../Admin/BookingVilla/page"
import BookingTransportasi from "../Admin/BookingTransportasi/page"
const Dashboard = () => {
  const [activePage, setActivePage] = React.useState("Villa");

  const handleChangePage = (pageName) => {
    setActivePage(pageName);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-gray-800 text-white h-full">
        <ul className="flex flex-col h-full">
          <li className="px-4 py-2 text-2xl  font-bold ">Dashboard</li>
          <li
            className="px-4 py-2 cursor-pointer"
            onClick={() => handleChangePage("Villa")}
          >
            Villa
          </li>
          <li
            className="px-4 py-2 cursor-pointer"
            onClick={() => handleChangePage("BookingVilla")}
          >
            Data Booking Villa
          </li>

          <li
            className="px-4 py-2 cursor-pointer"
            onClick={() => handleChangePage("Merchandise")}
          >
            Merchandise
          </li>
          <li
            className="px-4 py-2 cursor-pointer"
            onClick={() => handleChangePage("Karang")}
          >
            Terumbu Karang
          </li>
          <li
            className="px-4 py-2 cursor-pointer"
            onClick={() => handleChangePage("Volunteer")}
          >
            Volunteer
          </li>
          <li
            className="px-4 py-2 cursor-pointer"
            onClick={() => handleChangePage("Transportasi")}
          >
            Transportasi
          </li>
          <li
            className="px-4 py-2 cursor-pointer"
            onClick={() => handleChangePage("BookingTransportasi")}
          >
            Data Booking Transportasi
          </li>
          <li
            className="px-4 py-2 cursor-pointer"
            onClick={() => handleChangePage("Paket")}
          >
            Paket
          </li>
          <li
            className="px-4 py-2 cursor-pointer"
            onClick={() => handleChangePage("Galery")}
          >
            Galery
          </li>
          <li
            className="px-4 py-2 cursor-pointer"
            onClick={() => handleChangePage("Donasi")}
          >
            Donasi
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-4">
          {activePage === "Donasi" && <Donasi />}
          {activePage === "Transportasi" && <Transportasi />}
          {activePage === "BookingTransportasi" && <BookingTransportasi/>}
          {activePage === "Villa" && <Villa />}
          {activePage === "BookingVilla" && <BookingVilla />}
          {activePage === "Merchandise" && <Merchandise />}
          {activePage === "Karang" && <Karang />}
          {activePage === "Volunteer" && <Volunteer />}
          {activePage === "Paket" && <Paket />}
          {activePage === "Galery" && <Galery />}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
