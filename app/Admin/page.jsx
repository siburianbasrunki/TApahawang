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
      

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <NavbarAdmin />

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-4">
          {/* <Donasi/>
          <Karang />
          <Volunteer />
          <Villa />
          <Transportasi />
          <Merchandise /> */}
          {/* Add other components here */}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
