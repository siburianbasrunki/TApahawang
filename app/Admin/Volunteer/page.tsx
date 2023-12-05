"use client"
import React, { useEffect, useState } from "react";
import { prisma } from "@/lib/prisma";
import { FaWhatsapp } from "react-icons/fa";
import NavbarAdmin from "../NavbarAdmin";
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

const Volunteer = () => {
  const [volunteers, setVolunteers] = useState<VolunteerResponse | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/volunteer');
        const data = await response.json();
        setVolunteers(data);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="bg-white shadow-md rounded-md p-4">
        <h1 className="text-2xl font-bold mb-4">List Daftar Volunteer</h1>
        <div className="overflow-x-auto">
          {
            volunteers ? (
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
                  {volunteers.volunteers.map((volunteer, index) => (

                    <tr className="border-b border-gray-200" key={volunteer.id}>
                      <td className="px-4 py-3 whitespace
                      -no-wrap text-gray-700">{volunteer.id}</td>
                      <td className="px-4 py-3 whitespace
                      -no-wrap text-gray-700">{volunteer.namaOrganisasi}</td>
                      <td className="px-4 py-3 whitespace
                      -no-wrap text-gray-700">{volunteer.asal}</td>
                      <td className="px-4 py-3 whitespace
                      -no-wrap text-gray-700">{volunteer.email}</td>
                      <td className="px-4 py-3 whitespace
                      -no-wrap text-gray-700">{volunteer.noTelepon}</td>
                      <td className="px-4 py-3 whitespace
                      -no-wrap text-gray-700">{volunteer.surat}</td>
                      <td className="px-4 py-3 whitespace
                      -no-wrap text-gray-700">Update</td>
                      <td className="px-4 py-3 whitespace
                      -no-wrap text-gray-700">Hapus</td>
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
    </>
  );
};

export default Volunteer;
