"use client";
import Image from "next/image";
import imgVilla from "../../../public/assets/villa.png";
import Link from "next/link";
import AddVilla from "./addVilla";
import DeleteVilla from "./deleteVilla";
import UpdateVilla from "./updateVilla";
import { prisma } from "@/lib/prisma";
import NavbarAdmin from "../NavbarAdmin";
import { useEffect, useState } from "react";

interface VillaData {
  id: string;
  nama: string;
  deskripsi: string;
  hargaPerMalam: number;
  gambar: string;
  ketersediaan: number;
}

interface VillaResponse {
  villas: VillaData[];
}

// Skeleton table component
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

const Villa = () => {
  const [villas, setVillas] = useState<VillaResponse | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/villas");
        const json: VillaResponse = await res.json();
        setVillas(json);
      } catch (error) {
        console.error("Error fetching villas:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <NavbarAdmin />
      <div className="bg-white shadow-md rounded-md p-4">
        <h1 className="text-2xl font-bold mb-4">Management Villa</h1>
        <div className="flex justify-end mb-4">
          <AddVilla />
        </div>

        {/* Display either the skeleton table or the actual data */}
        {villas ? (
          <table className="w-full overflow-x-auto">
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
              {villas.villas.map((villa, index) => (
                <tr key={villa.id} className="border-b border-gray-200">
                  <td className="px-4 py-3 whitespace-no-wrap text-gray-700">{villa.id}</td>
                  <td className="px-4 py-3 whitespace-no-wrap text-gray-700">{villa.nama}</td>
                  <td className="px-4 py-3 whitespace-no-wrap text-gray-700">{villa.deskripsi}</td>
                  <td className="px-4 py-3 whitespace-no-wrap text-gray-700">Rp {villa.hargaPerMalam}</td>
                  <td className="px-4 py-3 whitespace-no-wrap text-gray-700">
                    <Image src={villa.gambar} alt="Villa Image" width={100} height={100} />
                  </td>
                  <td className="px-4 py-3 whitespace-no-wrap text-gray-700">{villa.ketersediaan}</td>
                  <td className="px-4 py-3 whitespace-no-wrap text-gray-700">
                    <UpdateVilla villa={villa} />
                  </td>
                  <td className="px-4 py-3 whitespace-no-wrap text-gray-700">
                    <DeleteVilla villa={villa} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <SkeletonTable />
        )}
      </div>
    </>
  );
};

export default Villa;
