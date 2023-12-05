"use client"
import Image from "next/image";
import AddGalery from "./addGaleri";
import UpdateGalery from "./updateGaleri"
import { prisma } from "@/lib/prisma";
import NavbarAdmin from "../NavbarAdmin";
import { useEffect, useState } from "react";

interface GaleryData {
  id: string;
  title: string;
  deskripsi: string;
  gambar: string;
  tanggal: Date;
}

interface GaleryResponse {
  galeries: GaleryData[];
}

const SkeletonTable = () => {
  return (
    <div className="animate-pulse bg-gray-200 p-4 rounded mb-4 w-full">
      <table className="w-full">
        <thead className="bg-gray-50 text-gray-700 uppercase">
          <tr>
            <th className="px-4 py-3 text-left">ID</th>
            <th className="px-4 py-3 text-left">Judul</th>
            <th className="px-4 py-3 text-left">Deskripsi</th>
            <th className="px-4 py-3 text-left">Gambar</th>
            <th className="px-4 py-3 text-left">Update</th>
            <th className="px-4 py-3 text-left">Hapus</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {/* Placeholder row for skeleton loading */}
          <tr className="border-b border-gray-200">
            <td className="px-4 py-3 whitespace
            -no-wrap text-gray-700">Loading...</td>
            <td className="px-4 py-3 whitespace
            -no-wrap text-gray-700">Loading...</td>
            <td className="px-4 py-3 whitespace
            -no-wrap text-gray-700">Loading...</td>
            <td className="px-4 py-3 whitespace
            -no-wrap text-gray-700">Loading...</td>
            <td className="px-4 py-3 whitespace
            -no-wrap text-gray-700">Loading...</td>
            <td className="px-4 py-3 whitespace
            -no-wrap text-gray-700">Loading...</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}


const Villa = () => {
  const [galeries, setGaleries] = useState<GaleryResponse | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/galery');
        const data = await response.json();
        setGaleries(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Management Aktivitas/Galeri</h1>
      <div className="flex justify-end mb-4">
        <AddGalery />
      </div>
      <div className="overflow-x-auto">
        {
          galeries ? (
            <table className="w-full">
              <thead className="bg-gray-50 text-gray-700 uppercase">
                <tr>
                  <th className="px-4 py-3 text-left">ID</th>
                  <th className="px-4 py-3 text-left">Judul</th>
                  <th className="px-4 py-3 text-left">Deskripsi</th>
                  <th className="px-4 py-3 text-left">Gambar</th>
                  <th className="px-4 py-3 text-left">Update</th>
                  <th className="px-4 py-3 text-left">Hapus</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {galeries.galeries.map((galery) => (
                  <tr key={galery.id} className="border-b border-gray-200">
                    <td className="px-4 py-3 whitespace
                    -no-wrap text-gray-700">{galery.id}</td>
                    <td className="px-4 py-3 whitespace
                    -no-wrap text-gray-700">{galery.title}</td>
                    <td className="px-4 py-3 whitespace
                    -no-wrap text-gray-700">{galery.deskripsi}</td>
                    <td className="px-4 py-3 whitespace
                    -no-wrap text-gray-700">
                      <Image
                        src={galery.gambar}
                        alt="Gambar"
                        width={100}
                        height={100}
                      />
                    </td>
                    {/* <td className="px-4 py-3 whitespace
                    -no-wrap text-gray-700">
                      <UpdateGalery galery={galery} />
                    </td>
                    <td className="px-4 py-3 whitespace
                    -no-wrap text-gray-700">
                      <DeleteGalery galery={galery} />
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <SkeletonTable />
          )
        }
      </div>
    </div>
  );
};

export default Villa;
