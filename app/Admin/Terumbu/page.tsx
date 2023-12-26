"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import AddKarang from "./addkarang";
import UpdateKarang from "./updateKarang";
import DeleteKarang from "./deleteKarang";
import { FiRefreshCcw } from "react-icons/fi";

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

const TerumbuKarang = () => {
  const [karangs, setKarangs] = useState<KarangResponse | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [karangsPerPage] = useState(5); // Number of karangs items per page, adjust as needed
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/karang");
      const json: KarangResponse = await res.json();
      setKarangs(json);
    } catch (error) {
      console.error("Error fetching terumbu karang:", error);
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

  // Calculate current karangs items based on pagination
  const indexOfLastKarang = currentPage * karangsPerPage;
  const indexOfFirstKarang = indexOfLastKarang - karangsPerPage;
  const currentKarangs = karangs
    ? karangs.karangs.slice(indexOfFirstKarang, indexOfLastKarang)
    : [];

  return (
    <>
      <div className="bg-white shadow-md rounded-md p-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold mb-4">
              Management Terumbu Karang
            </h1>
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
              <AddKarang />
            </div>
          </div>
        </div>
        {karangs ? (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-100 text-gray-600 uppercase">
                <tr>
                  <th className="px-6 py-3 text-left">Nama Terumbu Karang</th>
                  <th className="px-6 py-3 text-left">
                    Deskripsi Terumbu Karang
                  </th>
                  <th className="px-6 py-3 text-left">Gambar</th>
                  <th className="px-6 py-3 text-left">Update</th>
                  <th className="px-6 py-3 text-left">Hapus</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {currentKarangs.map((karang, index) => (
                  <tr key={karang.id} className="border-b">
                    <td className="px-6 py-4 text-gray-700">{karang.nama}</td>
                    <td className="px-6 py-4 text-gray-700">
                      {karang.deskripsi}
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      <Image
                        src={karang.gambar}
                        alt={karang.gambar}
                        width={100}
                        height={100}
                      />
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
                disabled={indexOfLastKarang >= karangs.karangs.length}
                className="bg-gray-300 px-3 py-1"
              >
                Next
              </button>
            </div>
          </div>
        ) : (
          <SkeletonTable />
        )}
      </div>
    </>
  );
};

export default TerumbuKarang;
