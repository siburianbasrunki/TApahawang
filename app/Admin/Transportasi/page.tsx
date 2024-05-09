"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import AddTransportasi from "./addTransportasi";
import UpdateTranportasi from "./updateTranportasi";
import DeleteTransportasi from "./deleteTransportasi";
import { FiRefreshCcw } from "react-icons/fi";

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
        <thead className="bg-gray-50 text-gray-700 capitalize">
          <tr>
            <th className="px-4 py-3 text-left">ID</th>
            <th className="px-4 py-3 text-left">Nama Villa</th>
            <th className="px-4 py-3 text-left">Deskripsi</th>
            <th className="px-4 py-3 text-left">Harga Permalam (Rupiah)</th>
            <th className="px-4 py-3 text-left">Gambar Villa</th>
            <th className="px-4 py-3 text-left">Ketersedian Kamar</th>
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
const Transportasi = () => {
  const [transportasis, setTransportasi] =
    useState<transportasiResponse | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [transportasisPerPage] = useState(5);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchData = async () => {
    try {
      const res = await fetch("/api/transportasi");
      const json: transportasiResponse = await res.json();
      setTransportasi(json);
    } catch (error) {
      console.error("Error fetching transportasi:", error);
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

  const filteredTransportasis = transportasis
    ? transportasis.transportasis.filter(
        (trans) =>
          trans.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
          trans.id.includes(searchQuery)
      )
    : [];
  const indexOfLastTransportasi = currentPage * transportasisPerPage;
  const indexOfFirstTransportasi =
    indexOfLastTransportasi - transportasisPerPage;
  const currentTransportasis = filteredTransportasis.slice(
    indexOfFirstTransportasi,
    indexOfLastTransportasi
  );

  return (
    <>
      <div className="bg-white shadow-md rounded-md p-4">
        <div className="flex flex-col md:flex-row justify-between items-center w-full">
          <div>
            <h1 className="text-xl md:text-2xl font-bold mb-4">
              Management Transportasi Laut
            </h1>
          </div>
          <div className="flex flex-col sm:flex-row justify-end items-center gap-4 mb-4">
            <div
              className="text-lg md:text-xl cursor-pointer text-black flex items-center gap-x-1"
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
              <AddTransportasi />
            </div>
          </div>
        </div>
        <div>
          <label className="input input-bordered flex items-center gap-2 mt-4 mb-4">
            <input
              type="text"
              className="grow w-96"
              placeholder="Cari transportasi berdasarkan nama atau id transportasi"
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
        {transportasis ? (
          <div className="overflow-x-auto">
            <table className="w-full mix-w-max rounded-lg">
              <thead className="bg-gray-50 text-gray-700 capitalize  rounded-lg">
                <tr>
                  <th className="px-4 py-3 text-center items-center align-center text-sm">
                    Nama Kapal
                  </th>
                  {/* <th className="px-4 py-3 text-center items-center align-center text-sm">
                    ID Kapal
                  </th> */}
                  <th className="px-4 py-3 text-center items-center align-center text-sm">
                    Biaya Sewa (Rupiah)
                  </th>
                  <th className="px-4 py-3 text-center items-center align-center text-sm">
                    Gambar Kapal
                  </th>
                  <th className="px-4 py-3 text-center items-center align-center text-sm">
                    Jumlah Orang
                  </th>
                  <th className="px-4 py-3 text-center items-center align-center text-sm">
                    Update
                  </th>
                  <th className="px-4 py-3 text-center items-center align-center text-sm">
                    Hapus
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {currentTransportasis.map((transport, index) => (
                  <tr
                    key={transport.id}
                    className="border-b border-gray-200 capitalize text-sm text-center items-center align-center rounded-lg"
                  >
                    <td className="px-4 py-3 whitespace-no-wrap text-gray-700">
                      {transport.nama}
                    </td>
                    {/* <td className="px-4 py-3 whitespace-no-wrap text-gray-700">
                      {transport.id.slice(0, 5)}
                    </td> */}
                    <td className="px-4 py-3 whitespace-no-wrap text-gray-700">
                      Rp {transport.harga}
                    </td>
                    <td className="px-4 py-3 whitespace-no-wrap text-gray-700">
                      <Image
                        src={transport.gambar}
                        alt={transport.gambar}
                        width={100}
                        height={100}
                        className="rounded rounded-lg"
                      />
                    </td>
                    <td className="px-4 py-3 whitespace-no-wrap text-gray-700">
                      {transport.ketersediaan}
                    </td>
                    <td className="px-4 py-3 whitespace-no-wrap text-gray-700">
                      <UpdateTranportasi transportasi={transport} />
                    </td>
                    <td className="px-4 py-3 whitespace-no-wrap text-gray-700">
                      <DeleteTransportasi transportasi={transport} />
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
                disabled={
                  indexOfLastTransportasi >= transportasis.transportasis.length
                }
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

export default Transportasi;
