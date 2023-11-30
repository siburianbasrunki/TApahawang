"use client"
import React from "react";
import NavbarAdmin from "./NavbarAdmin";
import Transportasi from "./Transportasi/page";
import Villa from "./Villa/page";
import Merchandise from "./Merchandise/page";
import Karang from "./Terumbu/page";
import Volunteer from "./Volunteer/page";
import Donasi from "./Donasi/page";

const Dashboard = () => {
  const [activePage, setActivePage] = React.useState("Transportasi");

  const handleChangePage = (pageName) => {
    setActivePage(pageName);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white h-full">
        <ul className="flex flex-col h-full">
          <li className="px-4 py-2 text-lg font-bold">Dashboard</li>
          <li className="px-4 py-2 cursor-pointer" onClick={() => handleChangePage("Transportasi")}>
            Transportasi
          </li>
          <li className="px-4 py-2 cursor-pointer" onClick={() => handleChangePage("Villa")}>
            Villa
          </li>
          <li className="px-4 py-2 cursor-pointer" onClick={() => handleChangePage("Merchandise")}>
            Merchandise
          </li>
          <li className="px-4 py-2 cursor-pointer" onClick={() => handleChangePage("Karang")}>
            Terumbu Karang
          </li>
          <li className="px-4 py-2 cursor-pointer" onClick={() => handleChangePage("Volunteer")}>
            Volunteer
          </li>
          <li className="px-4 py-2 cursor-pointer" onClick={() => handleChangePage("Donasi")}>
            Donasi
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <NavbarAdmin />

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-4">
          {activePage === "Transportasi" && <Transportasi />}
          {activePage === "Villa" && <Villa />}
          {activePage === "Merchandise" && <Merchandise />}
          {activePage === "Karang" && <Karang />}
          {activePage === "Volunteer" && <Volunteer />}
          {activePage === "Donasi" && <Donasi />}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
