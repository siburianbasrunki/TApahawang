"use client";
import React from "react";
import Transportasi from "./Transportasi/page";
import Villa from "./Villa/page";
import Merchandise from "./Merchandise/page";
import Karang from "./Terumbu/page";
import Volunteer from "./Volunteer/page";
import Donasi from "./Donasi/page";
import Paket from "./Paket/page";
import Galery from "../Admin/Galery/page";
import BookingVilla from "../Admin/BookingVilla/page";
import BookingTransportasi from "../Admin/BookingTranportasi/page";
import {
  MdDashboard,
  MdHolidayVillage,
  MdOutlineDirectionsBoat,
  MdNewspaper,
  MdOutlineVolunteerActivism,
} from "react-icons/md";
import { TbReportAnalytics } from "react-icons/tb";
import { GiCoral } from "react-icons/gi";
import { FaDonate } from "react-icons/fa";
import { FaPhotoVideo } from "react-icons/fa";
import { IoBagHandle } from "react-icons/io5";

const Dashboard = () => {
  const [activePage, setActivePage] = React.useState("Villa");

  const handleChangePage = (pageName) => {
    setActivePage(pageName);
  };

  return (
    <div className="flex h-screen bg-white rounded rounded-lg">
      <div className="w-64 bg-white text-black  h-full rounded rounded-lg">
        <ul className="flex flex-col h-full ">
          <li className="flex items-center px-4 py-2 text-3xl font-bold">
            <MdDashboard className="mr-2 text-2xl" /> Dashboard
          </li>

          <li
            className={`flex items-center px-4 py-2 cursor-pointer font-semibold ${
              activePage === "Villa" && "text-blue-500"
            }`}
            onClick={() => handleChangePage("Villa")}
          >
            <MdHolidayVillage className="mr-2 text-xl" /> Villa
          </li>

          <li
            className={`flex items-center px-4 py-2 cursor-pointer font-semibold ${
              activePage === "BookingVilla" && "text-blue-500"
            }`}
            onClick={() => handleChangePage("BookingVilla")}
          >
            <TbReportAnalytics className="mr-2 text-xl" /> Data Booking Villa
          </li>

          <li
            className={`flex items-center px-4 py-2 cursor-pointer font-semibold ${
              activePage === "Transportasi" && "text-blue-500"
            }`}
            onClick={() => handleChangePage("Transportasi")}
          >
            <MdOutlineDirectionsBoat className="mr-2 text-xl" /> Transportasi
          </li>

          <li
            className={`flex items-center px-4 py-2 cursor-pointer font-semibold ${
              activePage === "BookingTransportasi" && "text-blue-500"
            }`}
            onClick={() => handleChangePage("BookingTransportasi")}
          >
            <TbReportAnalytics className="mr-2 text-xl" /> Data Sewa
            Transportasi
          </li>

          <li
            className={`flex items-center px-4 py-2 cursor-pointer font-semibold ${
              activePage === "Karang" && "text-blue-500"
            }`}
            onClick={() => handleChangePage("Karang")}
          >
            <GiCoral className="mr-2 text-xl" /> Terumbu Karang
          </li>

          <li
            className={`flex items-center px-4 py-2 cursor-pointer font-semibold ${
              activePage === "Donasi" && "text-blue-500"
            }`}
            onClick={() => handleChangePage("Donasi")}
          >
            <FaDonate className="mr-2 text-xl" /> Donasi
          </li>

          <li
            className={`flex items-center px-4 py-2 cursor-pointer font-semibold ${
              activePage === "Merchandise" && "text-blue-500"
            }`}
            onClick={() => handleChangePage("Merchandise")}
          >
            <IoBagHandle className="mr-2 text-xl" /> Merchandise
          </li>

          <li
            className={`flex items-center px-4 py-2 cursor-pointer font-semibold ${
              activePage === "Paket" && "text-blue-500"
            }`}
            onClick={() => handleChangePage("Paket")}
          >
            <MdNewspaper className="mr-2 text-xl" /> Paket
          </li>

          <li
            className={`flex items-center px-4 py-2 cursor-pointer font-semibold ${
              activePage === "Volunteer" && "text-blue-500"
            }`}
            onClick={() => handleChangePage("Volunteer")}
          >
            <MdOutlineVolunteerActivism className="mr-2 text-xl" /> Volunteer
          </li>

          <li
            className={`flex items-center px-4 py-2 cursor-pointer font-semibold ${
              activePage === "Galery" && "text-blue-500"
            }`}
            onClick={() => handleChangePage("Galery")}
          >
            <FaPhotoVideo className="mr-2 text-xl" /> Galery
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
          {activePage === "Villa" && <Villa />}
          {activePage === "BookingVilla" && <BookingVilla />}
          {activePage === "BookingTransportasi" && <BookingTransportasi />}
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
