// Dashboard.jsx
import React from "react";
import NavbarAdmin from "./NavbarAdmin";
import Transportasi from "./Transportasi/page";
import Villa from "./Villa/page";
import Merchandise from "./Merchandise/page";
import Karang from "./Terumbu/page";
import Volunteer from "./Volunteer/page";
import Donasi from "./Donasi/page"

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white">
        <div className="p-4">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        </div>
        {/* Add your sidebar navigation links here */}
        {/* Example: */}
        <ul className="space-y-2">
          <li><a href="#" className="block p-2">Dashboard</a></li>
          <li><a href="#" className="block p-2">Transportasi</a></li>
          <li><a href="#" className="block p-2">Villa</a></li>
          {/* Add other navigation links for your components */}
        </ul>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <NavbarAdmin />

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-4">
          <Donasi/>
          <Karang />
          <Volunteer />
          <Villa />
          <Transportasi />
          <Merchandise />
          {/* Add other components here */}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
