"use client";
import React, { useEffect, useState } from "react";
import { prisma } from "@/lib/prisma";
import { FaWhatsapp, FaFile } from "react-icons/fa";
import NavbarAdmin from "../NavbarAdmin";
import Link from "next/link";
import { FiRefreshCcw } from "react-icons/fi";

interface VolunteerData {
  id: string;
  namaOrganisasi: string;
  asal: string;
  email: string;
  noTelepon: string;
  surat: string;
}
interface VolunteerResponse {
  volunteers: VolunteerData[];
}

const SkeletonTable = () => {
  return (
    <div className="animate-pulse bg-gray-200 p-4 rounded mb-4 w-full">
      <table className="w-full">
        <thead className="bg-gray-50 text-gray-700 capitalize">
          <tr>
            <th className="px-4 py-3 text-left">ID</th>
            <th className="px-4 py-3 text-left">Nama Organisasi</th>
            <th className="px-4 py-3 text-left">Asal Organisasi</th>
            <th className="px-4 py-3 text-left">Email</th>
            <th className="px-4 py-3 text-left">No. Telepon</th>
            <th className="px-4 py-3 text-left">Surat</th>
            <th className="px-4 py-3 text-left">Update</th>
            <th className="px-4 py-3 text-left">Hapus</th>
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

const Volunteer = () => {
  const [volunteers, setVolunteers] = useState<VolunteerResponse | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const fetchData = async () => {
    try {
      const response = await fetch("/api/volunteer");
      const data = await response.json();
      setVolunteers(data);
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

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;

  const currentdata = volunteers
    ? volunteers.volunteers
        .filter(
          (volunteer) =>
            volunteer.namaOrganisasi
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            volunteer.asal.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(indexOfFirstData, indexOfLastData)
    : [];

  return (
    <>
      <div className="bg-white shadow-md rounded-md p-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold mb-4">List Daftar Volunteer</h1>
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
          </div>
        </div>
        <div>
          <label className="input input-bordered flex items-center gap-2 mt-4 mb-4">
            <input
              type="text"
              className="grow w-96"
              placeholder="Cari volunteer"
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
        {volunteers ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 text-gray-700 capitalize">
                <tr>
                  <th className="px-4 py-3 text-center text-sm">
                    Nama Organisasi
                  </th>
                  <th className="px-4 py-3 text-center text-sm">
                    Asal Organisasi
                  </th>
                  <th className="px-4 py-3 text-center text-sm">Email</th>

                  <th className="px-4 py-3 text-center text-sm">Surat</th>
                  <th className="px-4 py-3 text-center text-sm">Chat WA</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {currentdata.map((volunteer, index) => (
                  <tr
                    className="border-b border-gray-200 text-center text-sm capitalize"
                    key={volunteer.id}
                  >
                    <td
                      className="px-4 py-3 whitespace
                      -no-wrap text-gray-700"
                    >
                      {volunteer.namaOrganisasi}
                    </td>
                    <td
                      className="px-4 py-3 whitespace
                      -no-wrap text-gray-700"
                    >
                      {volunteer.asal}
                    </td>
                    <td
                      className="px-4 py-3 whitespace
                      -no-wrap text-gray-700"
                    >
                      {volunteer.email}
                    </td>

                    <td
                      className="px-4 py-3 whitespace
                      -no-wrap text-gray-700 hover:text-blue-500 items-center text-center"
                    >
                      <Link href={volunteer.surat}>
                        <div className="flex gap-2 items-center align-center text-center">
                          <div>
                            <FaFile />
                          </div>
                          <div>Cek Berkas</div>
                        </div>
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-gray-700 text-4xl text-green-500">
                      <Link href={`https://wa.me/${volunteer.noTelepon}`}>
                        <FaWhatsapp />
                      </Link>
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
                disabled={indexOfLastData >= volunteers.volunteers.length}
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

export default Volunteer;
