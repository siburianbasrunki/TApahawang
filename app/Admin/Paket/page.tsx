"use client";
import React, { useEffect, useState } from "react";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import AddPaket from "./addPaket";
import UpdatePaket from "./updatePaket";
import DeletePaket from "./deletePaket";
import { FiRefreshCcw } from "react-icons/fi";
interface PaketData {
  id: string;
  namaPaket: string;
  asalKomunitas: string;
  nomorTelepon: string;
  gambarPaket: string;
}

interface PaketResponse {
  pakets: PaketData[];
}

const SkeletonTable = () => {
  return (
    <div className="animate-pulse bg-gray-200 p-4 rounded mb-4 w-full">
      <table className="w-full">
        <thead className="bg-gray-50 text-gray-700 capitalize">
          <tr>
            <th className="px-4 py-3 text-center text-sm">ID Paket</th>
            <th className="px-4 py-3 text-center text-sm">Nama Paket</th>
            <th className="px-4 py-3 text-center text-sm">Asal Komunitas</th>
            <th className="px-4 py-3 text-center text-sm">Nomor Telepon</th>
            <th className="px-4 py-3 text-center text-sm">Gambar Paket</th>
            <th className="px-4 py-3 text-center text-sm">Update</th>
            <th className="px-4 py-3 text-center text-sm">Hapus</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          <tr className="border-b border-gray-200">
            <td
              className="px-4 py-3 whitespace
                    -no-wrap text-gray-700"
            >
              Loading...
            </td>
            <td
              className="px-4 py-3 whitespace
                    -no-wrap text-gray-700"
            >
              Loading...
            </td>
            <td
              className="px-4 py-3 whitespace
                    -no-wrap text-gray-700"
            >
              Loading...
            </td>
            <td
              className="px-4 py-3 whitespace
                    -no-wrap text-gray-700"
            >
              Loading...
            </td>
            <td
              className="px-4 py-3 whitespace
                    -no-wrap text-gray-700"
            >
              Loading...
            </td>
            <td
              className="px-4 py-3 whitespace
                    -no-wrap text-gray-700"
            >
              Loading...
            </td>
            <td
              className="px-4 py-3 whitespace
                    -no-wrap text-gray-700"
            >
              Loading...
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const Paket = () => {
  const [pakets, setPakets] = useState<PaketResponse | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [paketsPerPage] = useState(5);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/paket");
      const data = await response.json();
      setPakets(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
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

  const indexOfLastPaket = currentPage * paketsPerPage;
  const indexOfFirstPaket = indexOfLastPaket - paketsPerPage;
  const currentPakets = pakets
    ? pakets.pakets.slice(indexOfFirstPaket, indexOfLastPaket)
    : [];

  return (
    <>
      <div>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold mb-4">Management Paket </h1>
          </div>
          <div className="flex justify-end items-center gap-4  mb-4">
            <div
              className="text-2xl cursor-pointer text-black flex items-center gap-x-2 "
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
              <AddPaket />
            </div>
          </div>
        </div>
        {pakets ? (
          <div>
            <table className="w-full">
              <thead className="bg-gray-50 text-gray-700 capitalize rounded-lg">
                <tr>
                  <th className="px-4 py-3 text-center text-sm">Nama Paket</th>
                  <th className="px-4 py-3 text-center text-sm">
                    Owner/Pemilik
                  </th>
                  <th className="px-4 py-3 text-center text-sm">
                    Nomor Telepon
                  </th>
                  <th className="px-4 py-3 text-center text-sm">
                    Gambar Paket
                  </th>
                  <th className="px-4 py-3 text-center text-sm">Update</th>
                  <th className="px-4 py-3 text-center text-sm">Hapus</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {currentPakets.map((paket, index) => (
                  <tr
                    className="border-b border-gray-200 capitalize text-sm text-center"
                    key={paket.id}
                  >
                    <td className="px-4 py-3 whitespace-no-wrap text-gray-700">
                      {paket.namaPaket}
                    </td>
                    <td className="px-4 py-3 whitespace-no-wrap text-gray-700">
                      {paket.asalKomunitas}
                    </td>
                    <td className="px-4 py-3 whitespace-no-wrap text-gray-700">
                      {paket.nomorTelepon}
                    </td>
                    <td className="px-4 py-3 whitespace-no-wrap text-gray-700">
                      <Image
                        src={paket.gambarPaket}
                        alt={paket.gambarPaket}
                        width={100}
                        height={100}
                      />
                    </td>
                    <td className="px-4 py-3 whitespace-no-wrap text-gray-700">
                      <UpdatePaket paket={paket} />
                    </td>
                    <td className="px-4 py-3 whitespace-no-wrap text-gray-700">
                      <DeletePaket paket={paket} />
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
                disabled={indexOfLastPaket >= pakets.pakets.length}
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

export default Paket;
