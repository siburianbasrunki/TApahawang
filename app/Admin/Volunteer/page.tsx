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
        <thead className="bg-gray-50 text-gray-700 uppercase">
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
          {/* Placeholder row for skeleton loading */}
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

  return (
    <>
      <div className="bg-white shadow-md rounded-md p-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold mb-4">List Daftar Volunteer</h1>
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
          </div>
        </div>
        <div className="overflow-x-auto">
          {volunteers ? (
            <table className="w-full">
              <thead className="bg-gray-50 text-gray-700 uppercase">
                <tr>
                  <th className="px-4 py-3 text-left">Nama Organisasi</th>
                  <th className="px-4 py-3 text-left">Asal Organisasi</th>
                  <th className="px-4 py-3 text-left">Email</th>

                  <th className="px-4 py-3 text-left">Surat</th>
                  <th className="px-4 py-3 text-left">Chat WA</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {volunteers.volunteers.map((volunteer, index) => (
                  <tr className="border-b border-gray-200" key={volunteer.id}>
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
                      -no-wrap text-gray-700 hover:text-blue-500"
                    >
                      <Link href={volunteer.surat}>
                        <FaFile />
                        Cek Berkas
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
          ) : (
            <SkeletonTable />
          )}
        </div>
      </div>
    </>
  );
};

export default Volunteer;
