"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Donasi from "../Admin/Donasi/page";
import Transportasi from "./Transportasi/page";
import Villa from "../Admin/Villa/page";
import Volunteer from "./Volunteer/Volunteer";
import Merchandise from "../Admin/Merchandise/page";
import Paket from "../Admin/Paket/page";
import Galery from "./Galery/page";
import BookingVillas from "../Admin/BookingVilla/page"
const componentMap = {
  "/Admin/Donasi": <Donasi />,
  "/Admin/Transportasi": <Transportasi />,
  "/Admin/Villa": <Villa />,
  "/Admin/BookingVilla": <BookingVillas />,
  "/Admin/Volunteer": <Volunteer />,
  "/Admin/Merchandise": <Merchandise />,
  "/Admin/Paket": <Paket/>,
  "/Admin/Galery" : <Galery/>,
};

const DashboardUser = () => {
  const pathName = usePathname();
  const [content, setContent] = useState(null);

  useEffect(() => {
    if (componentMap[pathName]) {
      setContent(componentMap[pathName]);
    } else {
      setContent(null);
    }
  }, [pathName]);

  return (
    <div className="flex">
      <div className="w-1/4 p-4 bg-[#F8F9FA] flex justify-center">
        <ul>
          <li className="mb-2">
            <Link href="/Admin/Donasi"
                className={`cursor-pointer ${
                  pathName === "/Admin/Donasi" ? "text-[#030DFF]" : ""
                }`}
              >
                Donasi
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/Admin/Transportasi"
                className={`cursor-pointer ${
                  pathName === "/Admin/Transportasi" ? "text-[#030DFF]" : ""
                }`}
              >
                Transportasi
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/Admin/Villa"
                className={`cursor-pointer ${
                  pathName === "/Admin/Villa" ? "text-[#030DFF]" : ""
                }`}
              >
                Villa
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/Admin/BookingVillas"
                className={`cursor-pointer ${
                  pathName === "/Admin/BookingVillas" ? "text-[#030DFF]" : ""
                }`}
              >
                Data Booking Villas
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/Admin/Volunteer"
                className={`cursor-pointer ${
                  pathName === "/Admin/Volunteer" ? "text-[#030DFF]" : ""
                }`}
              >
                Volunteer
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/Admin/Merchandise"
                className={`cursor-pointer ${
                  pathName === "/Admin/Merchandise" ? "text-[#030DFF]" : ""
                }`}
              >
                Merchandise
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/Admin/Paket"
                className={`cursor-pointer ${
                  pathName === "/Admin/Paket" ? "text-[#030DFF]" : ""
                }`}
              >
                Paket
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/Admin/Galery"
                className={`cursor-pointer ${
                  pathName === "/Admin/Galery" ? "text-[#030DFF]" : ""
                }`}
              >
                Galery
            </Link>
          </li>
        </ul>
      </div>
      <div className="w-3/4 p-4 renderContent">
        {/* Render komponen yang sesuai dengan rute */}
        {content}
      </div>
    </div>
  );
};

export default DashboardUser;
