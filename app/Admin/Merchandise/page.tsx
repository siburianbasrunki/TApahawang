"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import AddMerch from "./addMerch";
import UpdateMerch from "./updateMerch";
import DeleteMerch from "./deleteMerch";
import type { Merchandise } from "@prisma/client";
import { FiRefreshCcw } from "react-icons/fi";

interface MerchData {
  id: string;
  nama: string;
  deskripsi: string;
  harga: number;
  gambar: string;
  ketersediaan: number;
  noTelepon : string;
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
            <th className="px-4 py-3 text-left">Nomor Telepon </th>
            <th className="px-4 py-3 text-left">Gambar Barang</th>
            <th className="px-4 py-3 text-left">Update</th>
            <th className="px-4 py-3 text-left">Hapus</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          <tr className="border-b border-gray-200">
            <td className="px-4 py-3 whitespace-no-wrap text-gray-700">
              Loading...
            </td>
            <td className="px-4 py-3 whitespace-no-wrap text-gray-700">
              Loading...
            </td>
            <td className="px-4 py-3 whitespace-no-wrap text-gray-700">
              Loading...
            </td>
            <td className="px-4 py-3 whitespace-no-wrap text-gray-700">
              Loading...
            </td>
            <td className="px-4 py-3 whitespace-no-wrap text-gray-700">
              Loading...
            </td>
            <td className="px-4 py-3 whitespace-no-wrap text-gray-700">
              Loading...
            </td>
            <td className="px-4 py-3 whitespace-no-wrap text-gray-700">
              Loading...
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
const Merchandise = () => {
  const [merchs, setMerchs] = useState<MerchData[] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [merchsPerPage] = useState(5); // Number of merchandise items per page, adjust as needed
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/merchandise");
      const json: MerchResponse = await res.json();
      setMerchs(json.merchs);
    } catch (error) {
      console.error("Error fetching merchandise:", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleRefreshClick = () => {
    setIsRefreshing(true);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  const indexOfLastMerch = currentPage * merchsPerPage;
  const indexOfFirstMerch = indexOfLastMerch - merchsPerPage;
  const currentMerchs = merchs
    ? merchs.slice(indexOfFirstMerch, indexOfLastMerch)
    : [];

  const handleSortByName = () => {
    const sortedMerchs = [...currentMerchs].sort((a, b) => {
      const nameA = a.nama.toUpperCase();
      const nameB = b.nama.toUpperCase();

      return nameA.localeCompare(nameB);
    });

    setMerchs(sortedMerchs);
  };

  return (
    <>
      <div className="bg-white shadow-md rounded-md p-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold mb-4">Management Merchandise</h1>
          </div>
          <div className="flex justify-end items-center gap-4  mb-4">
            <div
              className="text-2xl cursor-pointer text-green-700 flex items-center gap-x-2 "
              onClick={handleRefreshClick}
            >
              <div>
                <small>refresh data</small>
              </div>
              <div>
                <FiRefreshCcw />
              </div>
            </div>
            <div>
              <AddMerch />
            </div>
          </div>
        </div>

        {merchs ? (
          <div>
            <table className="w-full overflow-x-auto">
              <thead className="bg-gray-50 text-gray-700 uppercase">
                <tr>
                  <th className="px-4 py-3 text-left">
                    <button onClick={handleSortByName}>Nama Barang</button>
                  </th>
                  <th className="px-4 py-3 text-left">Deskripsi</th>
                  <th className="px-4 py-3 text-left">Gambar Barang</th>
                  <th className="px-4 py-3 text-left">Nomor Telepon</th>
                  <th className="px-4 py-3 text-left">Harga (Rupiah)</th>
                  <th className="px-4 py-3 text-left">Update</th>
                  <th className="px-4 py-3 text-left">Hapus</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {currentMerchs.map((merch, index) => (
                  <tr key={merch.id} className="border-b border-gray-200">
                    <td className="px-4 py-3 whitespace-no-wrap text-gray-700">
                      {merch.nama}
                    </td>
                    <td className="px-4 py-3 whitespace-no-wrap text-gray-700">
                      {merch.deskripsi}
                    </td>
                    <td className="px-4 py-3 whitespace-no-wrap text-gray-700">
                      <Image
                        src={merch.gambar}
                        alt={merch.gambar}
                        width={100}
                        height={100}
                      />
                    </td>
                    
                    <td className="px-4 py-3 whitespace-no-wrap text-gray-700">
                      {merch.noTelepon}
                    </td>
                    <td className="px-4 py-3 whitespace-no-wrap text-gray-700">
                      {merch.harga}
                    </td>
                    <td className="px-4 py-3 whitespace-no-wrap text-gray-700">
                      <UpdateMerch merch={merch} />
                    </td>
                    <td className="px-4 py-3 whitespace-no-wrap text-gray-700">
                      <DeleteMerch merch={merch} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="bg-gray-300 px-3 py-1 mr-2"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={indexOfLastMerch >= merchs.length}
                className="bg-gray-300 px-3 py-1"
              >
                Next
              </button>
            </div>
          </div>
        ) : (
          <SkeletonTabel />
        )}
      </div>
    </>
  );
};

export default Merchandise;
