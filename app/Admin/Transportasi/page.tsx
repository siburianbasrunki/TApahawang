"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { PrismaClient } from "@prisma/client";
import AddTransportasi from "./addTransportasi";
import UpdateTranportasi from "./updateTranportasi";
import DeleteTransportasi from "./deleteTransportasi";
import NavbarAdmin from "../NavbarAdmin";

const prisma = new PrismaClient();

interface TransportasiData {
  id: string;
  nama: string;
  deskripsi: string;
  harga: number;
  gambar: string;
  ketersediaan: number;
}

interface transportasiResponse {
  transportasis: TransportasiData[];
}
const SkeletonTable = () => {
  return (
    <div className="animate-pulse bg-gray-200 p-4 rounded mb-4 w-full">
      <table className="w-full">
        <thead className="bg-gray-50 text-gray-700 uppercase">
          <tr>
            <th className="px-4 py-3 text-left">ID</th>
            <th className="px-4 py-3 text-left">Nama Villa</th>
            <th className="px-4 py-3 text-left">Deskripsi</th>
            <th className="px-4 py-3 text-left">Harga Permalam (Rupiah)</th>
            <th className="px-4 py-3 text-left">Gambar Villa</th>
            <th className="px-4 py-3 text-left">Ketersedian Kamar</th>
            <th className="px-4 py-3 text-left">Update</th>
            <th className="px-4 py-3 text-left">Hapus</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {/* Placeholder row for skeleton loading */}
          <tr className="border-b border-gray-200">
            <td className="px-4 py-3 whitespace-no-wrap text-gray-700">Loading...</td>
            <td className="px-4 py-3 whitespace-no-wrap text-gray-700">Loading...</td>
            <td className="px-4 py-3 whitespace-no-wrap text-gray-700">Loading...</td>
            <td className="px-4 py-3 whitespace-no-wrap text-gray-700">Loading...</td>
            <td className="px-4 py-3 whitespace-no-wrap text-gray-700">Loading...</td>
            <td className="px-4 py-3 whitespace-no-wrap text-gray-700">Loading...</td>
            <td className="px-4 py-3 whitespace-no-wrap text-gray-700">Loading...</td>
            <td className="px-4 py-3 whitespace-no-wrap text-gray-700">Loading...</td>
          </tr>
          {/* You can repeat the placeholder row as needed */}
        </tbody>
      </table>
    </div>
  );
};
const Transportasi = () => {
  const [transportasis, setTransportasi] = useState<transportasiResponse | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/transportasi");
        const json: transportasiResponse = await res.json();
        setTransportasi(json);
      } catch (error) {
        console.error("Error fetching transportasi:", error);
      }
    }
    fetchData();
  })
  return (
    <>

      <NavbarAdmin />
      <div className="bg-white shadow-md rounded-md p-4">
        <h1 className="text-2xl font-bold mb-4">Management Transportasi Laut</h1>
        <div className="flex justify-end mb-4">
          <AddTransportasi />
        </div>

        <table className="w-full overflow-x-auto">
          <thead className="bg-gray-50 text-gray-700 uppercase">
            <tr>
              <th className="px-4 py-3 text-left">ID</th>
              <th className="px-4 py-3 text-left">Nama Kapal</th>
              <th className="px-4 py-3 text-left">Biaya Sewa (Rupiah)</th>
              <th className="px-4 py-3 text-left">Gambar Kapal</th>
              <th className="px-4 py-3 text-left">Jumlah Orang</th>
              <th className="px-4 py-3 text-left">Update</th>
              <th className="px-4 py-3 text-left">Hapus</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {transportasis?.transportasis?.map((transportasi, index) => (
              <tr key={transportasi.id} className="border-b border-gray-200">
                <td className="px-4 py-3 whitespace-no-wrap text-gray-700">
                  {transportasi.id}
                </td>
                <td className="px-4 py-3 whitespace-no-wrap text-gray-700">
                  {transportasi.nama}
                </td>
                <td className="px-4 py-3 whitespace-no-wrap text-gray-700">
                  Rp {transportasi.harga}
                </td>
                <td className="px-4 py-3 whitespace-no-wrap text-gray-700">
                  <Image
                    src={transportasi.gambar}
                    alt={transportasi.nama}
                    width={100}
                    height={100}
                  />
                </td>
                <td className="px-4 py-3 whitespace-no-wrap text-gray-700">
                  {transportasi.ketersediaan}
                </td>
                <td className="px-4 py-3 whitespace-no-wrap text-gray-700">
                  <UpdateTranportasi transportasi={transportasi} />
                </td>
                <td className="px-4 py-3 whitespace-no-wrap text-gray-700">
                  <DeleteTransportasi transportasi={transportasi} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Transportasi;
