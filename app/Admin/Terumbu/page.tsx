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
  const [karangsPerPage] = useState(5);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredKarangs = karangs
    ? karangs.karangs.filter(
        (karang) =>
          karang.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
          karang.id.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];
  const indexOfLastKarang = currentPage * karangsPerPage;
  const indexOfFirstKarang = indexOfLastKarang - karangsPerPage;
  const currentKarangs = filteredKarangs.slice(
    indexOfFirstKarang,
    indexOfLastKarang
  );

  return (
    <>
      <div className="bg-white shadow-md rounded-md p-4">
        <div className="flex flex-col md:flex-row justify-between items-center w-full">
          <div>
            <h1 className="text-xl md:text-2xl font-bold mb-4">
              Management Terumbu Karang
            </h1>
          </div>
          <div className="flex flex-col sm:flex-row justify-end items-center gap-4 mb-4">
            <div
              className="text-lg md:text-xl cursor-pointer text-black flex items-center gap-x-1 "
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
        <div>
          <label className="input input-bordered flex items-center gap-2 mt-4 mb-4">
            <input
              type="text"
              className="grow w-96"
              placeholder="Cari karang berdasarkan nama atau id karang"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
        </div>
        {karangs ? (
          <div className="overflow-x-auto">
            <table className="min-w-full rounded-lg">
              <thead className="bg-gray-100 text-gray-600 capitalize">
                <tr>
                  <th className="px-6 py-3 text-center text-sm">
                    Nama Terumbu Karang
                  </th>
                  <th className="px-6 py-3 text-center text-sm">
                    Deskripsi Terumbu Karang
                  </th>
                  <th className="px-6 py-3 text-center text-sm">Gambar</th>
                  <th className="px-6 py-3 text-center text-sm">Update</th>
                  <th className="px-6 py-3 text-center text-sm">Hapus</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {currentKarangs.map((karang, index) => (
                  <tr
                    key={karang.id}
                    className="border-b capitalize text-sm text-center"
                  >
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
                        className="rounded-lg"
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

            <div className="mt-4 flex justify-center">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="btn btn-sm bg-gray-300 px-3 py-1 mr-2"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={indexOfLastKarang >= karangs.karangs.length}
                className="btn btn-sm bg-gray-300 px-3 py-1"
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
