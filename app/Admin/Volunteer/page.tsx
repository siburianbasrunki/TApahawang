import React from "react";
import { prisma } from "@/lib/prisma";
import { FaWhatsapp } from "react-icons/fa";
import NavbarAdmin from "../NavbarAdmin";
const getListDaftarVolunteer = async () => {
  const res = await prisma.volunteer.findMany({
    select: {
      id: true,
      namaOrganisasi: true,
      asal: true,
      email: true,
      noTelepon: true,
      surat: true,
    },
  });
  return res;
};

const Volunteer = async () => {
  const volunteers = await getListDaftarVolunteer();

  return (
    <>
      <NavbarAdmin />
      <div className="bg-white shadow-md rounded-md p-4">
        <h1 className="text-2xl font-bold mb-4">List Daftar Volunteer</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                  Nama Organisasi
                </th>
                <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                  Asal Organisasi
                </th>
                <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                  No Telepon/WA
                </th>
                <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                  Link Berkas
                </th>
                <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                  Chat WA Volunteer
                </th>
              </tr>
            </thead>
            <tbody>
              {volunteers.map((volunteer, index) => (
                <tr key={volunteer.id}>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    {volunteer.id}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    {volunteer.namaOrganisasi}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    {volunteer.asal}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    {volunteer.email}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    {volunteer.noTelepon}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    <a
                      href={volunteer.surat}
                      className="text-blue-500 hover:underline"
                    >
                      {volunteer.surat}
                    </a>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    <a href={`https://wa.me/${volunteer.noTelepon}`}>
                      <FaWhatsapp size={24} color="green" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Volunteer;
