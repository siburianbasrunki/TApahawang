"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image";
import AddKarang from "./addkarang";
import UpdateKarang from "./updateKarang";
import DeleteKarang from "./deleteKarang";


interface KarangData {
  id: string;
  nama: string;
  deskripsi: string;
  gambar: string;
}

interface KarangResponse {
  karangs: KarangData[];
}

const SkeletonTable = () => {
  return (
    <div className="animate-pulse bg-gray-200 p-4 rounded mb-4 w-full">
      <table className="w-full">
        <thead className="bg-gray-50 text-gray-700 uppercase">
          <tr>
            <th className="px-4 py-3 text-left">ID</th>
            <th className="px-4 py-3 text-left">Nama Terumbu Karang</th>
            <th className="px-4 py-3 text-left">Deskripsi</th>
            <th className="px-4 py-3 text-left">Gambar Terumbu Karang</th>
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
          </tr>
        </tbody>
      </table>
    </div>
  );
}


const TerumbuKarang = () => {
  const [karangs, setkarangs] = useState<KarangResponse | null>(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/karang");
        const json: KarangResponse = await res.json();
        setkarangs(json);
      } catch (error) {
        console.error("Error fetching terumbu karang:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <div className="bg-white shadow-md rounded-md p-4">
        <h1 className="text-2xl font-bold mb-4">Management Terumbu Karang</h1>
        <div className="flex justify-end mb-4">
          <AddKarang />
        </div>
        {
          karangs ? (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-100 text-gray-600 uppercase">
                  <tr>
                    <th className="px-6 py-3 text-left">ID</th>
                    <th className="px-6 py-3 text-left">Nama Terumbu Karang</th>
                    <th className="px-6 py-3 text-left">Deskripsi Terumbu Karang</th>
                    <th className="px-6 py-3 text-left">Gambar</th>
                    <th className="px-6 py-3 text-left">Update</th>
                    <th className="px-6 py-3 text-left">Hapus</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {karangs.karangs.map((karang, index) => (

                    <tr key={karang.id} className="border-b">
                      <td className="px-6 py-4 text-gray-700">{karang.id}</td>
                      <td className="px-6 py-4 text-gray-700">{karang.nama}</td>
                      <td className="px-6 py-4 text-gray-700">{karang.deskripsi}</td>
                      <td className="px-6 py-4 text-gray-700">
                        <Image src={karang.gambar} alt={karang.gambar} width={100} height={100} />
                      </td>
                      <td className="px-6 py-4 text-gray-700">
                        <UpdateKarang karang={karang} />
                      </td>
                      <td className="px-6 py-4 text-gray-700">
                        <DeleteKarang karang={karang} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <SkeletonTable />
          )}
      </div>
    </>
  );
};
export default TerumbuKarang