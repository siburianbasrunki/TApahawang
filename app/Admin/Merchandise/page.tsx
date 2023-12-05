"use client"

import Image from "next/image";
import React, { useEffect, useState } from "react";
import AddMerch from "./addMerch";
import UpdateMerch from "./updateMerch";
import DeleteMerch from "./deleteMerch";
import NavbarAdmin from "../NavbarAdmin";
import type { Merchandise } from "@prisma/client";

interface MerchData {
  id: string;
  nama: string;
  deskripsi: string;
  harga: number;
  gambar: string;
  ketersediaan: number;
}


interface MerchResponse {
  merchs: MerchData[];
}

const SkeletonTabel = () => {
  return (
    <div className="animate-pulse bg-gray-200 p-4 rounded mb-4 w-full">
      <table className="w-full">
        <thead className="bg-gray-50 text-gray-700 uppercase">
          <tr>
            <th className="px-4 py-3 text-left">ID</th>
            <th className="px-4 py-3 text-left">Nama Barang</th>
            <th className="px-4 py-3 text-left">Deskripsi</th>
            <th className="px-4 py-3 text-left">Harga (Rupiah)</th>
            <th className="px-4 py-3 text-left">Gambar Barang</th>
            <th className="px-4 py-3 text-left">Update</th>
            <th className="px-4 py-3 text-left">Hapus</th>
          </tr>
        </thead>
        <tbody className="bg-white">

          <tr className="border-b border-gray-200">
            <td className="px-4 py-3 whitespace-no-wrap text-gray-700">Loading...</td>
            <td className="px-4 py-3 whitespace-no-wrap text-gray-700">Loading...</td>
            <td className="px-4 py-3 whitespace-no-wrap text-gray-700">Loading...</td>
            <td className="px-4 py-3 whitespace-no-wrap text-gray-700">Loading...</td>
            <td className="px-4 py-3 whitespace-no-wrap text-gray-700">Loading...</td>
            <td className="px-4 py-3 whitespace-no-wrap text-gray-700">Loading...</td>
            <td className="px-4 py-3 whitespace-no-wrap text-gray-700">Loading...</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
const Merchandise = () => {
  const [merchs, setMerchs] = useState<MerchData[] | null>(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/merchandise");
        const json: MerchResponse = await res.json();
        setMerchs(json.merchs);
      }
      catch (error) {
        console.error("Error fetching merchandise:", error);
      }
    };
    fetchData();
  }, []);





  return (
    <>
      <div className="bg-white shadow-md rounded-md p-4">
        <h1 className="text-2xl font-bold mb-4">Management Merchandise</h1>
        <div className="flex justify-end mb-4">
          <AddMerch />
        </div>

      {
        merchs ? (
          <table className="w-full overflow-x-auto">
            <thead className="bg-gray-50 text-gray-700 uppercase">
              <tr>
                <th className="px-4 py-3 text-left">ID</th>
                <th className="px-4 py-3 text-left">Nama Barang</th>
                <th className="px-4 py-3 text-left">Deskripsi</th>
                <th className="px-4 py-3 text-left">Gambar Barang</th>
                <th className="px-4 py-3 text-left">Harga (Rupiah)</th>
                <th className="px-4 py-3 text-left">Update</th>
                <th className="px-4 py-3 text-left">Hapus</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {merchs.map((merch, index) => (
                <tr key={merch.id} className="border-b border-gray-200">
                  <td className="px-4 py-3 whitespace-no-wrap text-gray-700">
                    {merch.id}
                  </td>
                  <td className="px-4 py-3 whitespace-no-wrap text-gray-700">
                    {merch.nama}
                  </td>
                  <td className="px-4 py-3 whitespace-no-wrap text-gray-700">
                    {merch.deskripsi}
                  </td>
                  <td className="px-4 py-3 whitespace-no-wrap text-gray-700">
                    <Image src={merch.gambar} alt={merch.gambar} width={100} height={100} />
                  </td>
                  <td className="px-4 py-3 whitespace-no-wrap text-gray-700">
                    {merch.harga}
                  </td>
                  {/* <td className="px-4 py-3 whitespace-no-wrap text-gray-700">
                    <UpdateMerch id={merch.id} />
                  </td>
                  <td className="px-4 py-3 whitespace-no-wrap text-gray-700">
                    <DeleteMerch id={merch.id} />
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <SkeletonTabel />
        )
      }

      </div>
    </>
  );
};

export default Merchandise;
