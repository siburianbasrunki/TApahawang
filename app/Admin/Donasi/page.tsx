"use client";
import React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import UpdateDonasi from "./updateDonasi";
import { FaWhatsapp } from "react-icons/fa";
import { FiRefreshCcw } from "react-icons/fi";
import Link from "next/link";

interface DonasiData {
  id: string;
  user: {
    name: string;
  };
  terumbuKarangId: string;
  jumlahDonasi: string;
  buktiPembayaran: string;
  nomortelepon: string;
  tanggalDonasi: string;
  terumbuKarang: {
    nama: string;
    gambar: string;
  };
  validasiPembayaran: boolean;
  userId: string;
  gambar: string;
}

interface DonasiResponse {
  donasis: DonasiData[];
}

const SkeletonTable = () => {
  return (
    <div className="animate-pulse bg-gray-200 p-4 rounded mb-4 w-full">
      <table className="w-full">
        <thead className="bg-gray-50 text-gray-700 capitalize">
          <tr>
            <th className="px-6 py-3 text-left">ID</th>
            <th className="px-6 py-3 text-left">Nama Donatur</th>
            <th className="px-6 py-3 text-left">Jumlah Donasi</th>
            <th className="px-6 py-3 text-left">Bukti Pembayaran</th>
            <th className="px-6 py-3 text-left">Nomor WhatsApp</th>
            <th className="px-6 py-3 text-left">Terumbu Karang</th>
            <th className="px-6 py-3 text-left">Update</th>
            <th className="px-6 py-3 text-left">Chat</th>
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
            <td className="px-4 py-3 whitespace-no-wrap text-gray-700">
              Loading...
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const Donasi = () => {
  const [karangs, setKarangs] = useState([]);
  const [donasis, setDonasis] = useState<DonasiResponse | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [donasisPerPage] = useState(4);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [validationStatus, setValidationStatus] = useState<
    Record<string, string>
  >({});
  const [searchQuery, setSearchQuery] = useState("");

  const fetchData = async () => {
    try {
      const res = await fetch("/api/karang");
      const res2 = await fetch("/api/donasi");
      const json = await res.json();
      const json2: DonasiResponse = await res2.json();
      setKarangs(json.karangs);
      setDonasis(json2);
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
  const handleValidationChange = async (id: any, isValid: any) => {
    try {
      await fetch("/api/donasi", {
        method: "PUT",
        body: JSON.stringify({ id, isValid }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      setValidationStatus({ ...validationStatus, [id]: isValid });
    } catch (error) {
      console.error("Error updating validation status:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const getRowClassName = (isValid: boolean) => {
    return isValid ? " " : "bg-red-500";
  };
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredDonasi = donasis
    ? donasis.donasis.filter(
        (donasi) =>
          donasi.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          donasi.id.includes(searchQuery)
      )
    : [];

  const indexOfLastDonasi = currentPage * donasisPerPage;
  const indexOfFirstDonasi = indexOfLastDonasi - donasisPerPage;
  const currentDonasis = filteredDonasi.slice(
    indexOfFirstDonasi,
    indexOfLastDonasi
  );

  return (
    <>
      <div className="bg-white shadow-md rounded-md p-4">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold mb-4">Manajemen Donasi</h1>
          <div className="flex justify-end items-center gap-4 mb-4">
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
          </div>
        </div>
        <div>
          <label className="input input-bordered flex items-center gap-2 mt-4 mb-4">
            <input
              type="text"
              className="grow w-96"
              placeholder="Cari donasi berdasarkan nama donatur"
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
        {donasis ? (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-100 text-gray-600 capitalize">
                <tr>
                  <th className="px-6 py-3 text-center text-sm">ID</th>
                  <th className="px-6 py-3 text-center text-sm">
                    Nama Donatur
                  </th>
                  <th className="px-6 py-3 text-center text-sm">
                    Jumlah Uang Donasi
                  </th>
                  <th className="px-6 py-3 text-center text-sm">
                    Bukti Donasi
                  </th>
                  <th className="px-6 py-3 text-center text-sm">
                    Nomor WhatsApp
                  </th>
                  <th className="px-6 py-3 text-center text-sm">
                    Terumbu Karang
                  </th>
                  <th className="px-6 py-3 text-center text-sm">
                    Validasi Donasi
                  </th>
                  <th className="px-6 py-3 text-center text-sm">Update</th>
                  <th className="px-6 py-3 text-center text-sm">Chat</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {currentDonasis.map((donasi, index) => {
                  return (
                    <tr
                      key={index}
                      className={`border-b capitalize text-center text-sm ${getRowClassName(
                        donasi.validasiPembayaran
                      )}`}
                    >
                      <td className="px-6 py-4 text-gray-700 ">
                        {donasi.id.slice(0, 8)}
                      </td>
                      <td className="px-6 py-4 text-gray-700">
                        {donasi.user ? donasi.user.name : "Unknown User"}
                      </td>
                      <td className="px-6 py-4 text-gray-700">
                        Rp{donasi.jumlahDonasi}
                      </td>
                      <td className="px-6 py-4 text-gray-700">
                        <Image
                          src={donasi.buktiPembayaran}
                          alt={donasi.terumbuKarang.nama}
                          width={100}
                          height={100}
                          className="rounded-md"
                        />
                      </td>
                      <td className="px-6 py-4 text-gray-700">
                        {donasi.nomortelepon}
                      </td>
                      <td className="px-6 py-4 text-gray-700">
                        <Image
                          src={donasi.gambar}
                          alt={donasi.terumbuKarang.nama}
                          width={100}
                          height={100}
                          className="rounded-md"
                        />
                      </td>
                      <td className="px-4 py-3 whitespace-no-wrap text-gray-700">
                        <select
                          value={validationStatus[donasi.id] || ""}
                          onChange={(e) =>
                            handleValidationChange(donasi.id, e.target.value)
                          }
                          className="select select-bordered w-full max-w-xs bg-blue-500 text-white"
                        >
                          <option value="" disabled>
                            Pilih
                          </option>
                          <option value="Valid">Valid</option>
                          <option value="Unvalid">Unvalid</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 text-gray-700">
                        <UpdateDonasi donasi={donasi} />
                      </td>
                      <td className="px-6 py-4 text-gray-700 text-4xl text-green-500">
                        <Link href={`https://wa.me/${donasi.nomortelepon}`}>
                          <FaWhatsapp />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
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
                disabled={indexOfLastDonasi >= donasis.donasis.length}
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

export default Donasi;
