import Image from "next/image";
import React from "react";
import { PrismaClient } from "@prisma/client";
import AddMerch from "./addMerch";
import UpdateMerch from "./updateMerch";
import DeleteMerch from "./deleteMerch";
import NavbarAdmin from "../NavbarAdmin";

const prisma = new PrismaClient();

const getMerch = async () => {
  const res = await prisma.merchandise.findMany({
    select: {
      id: true,
      nama: true,
      deskripsi: true,
      harga: true,
      gambar: true,
      ketersediaan: true,
    },
  });
  return res;
};

const Merchandise = async () => {
  const merchs = await getMerch();

  return (
    <>
      <NavbarAdmin />
      <div className="bg-white shadow-md rounded-md p-4">
        <h1 className="text-2xl font-bold mb-4">Management Merchandise</h1>
        <div className="flex justify-end mb-4">
          <AddMerch />
        </div>

        <table className="w-full overflow-x-auto">
          <thead className="bg-gray-50 text-gray-700 uppercase">
            <tr>
              <th className="px-4 py-3 text-left">ID</th>
              <th className="px-4 py-3 text-left">Nama Barang</th>
              <th className="px-4 py-3 text-left">Deskripsi</th>
              <th className="px-4 py-3 text-left">Harga (Rupiah)</th>
              <th className="px-4 py-3 text-left">Gambar Barang</th>
              <th className="px-4 py-3 text-left">Update</th>
              <th className="px-4 py-3 text-left">Hapus</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {merchs.map((merch, index) => (
              <tr key={merch.id} className="border-b border-gray-200">
                <td className="px-4 py-3 whitespace-no-wrap text-gray-700">
                  {merch.id}
                </td>
                <td className="px-4 py-3 whitespace-no-wrap text-gray-700">
                  {merch.nama}
                </td>
                <td className="px-4 py-3 whitespace-no-wrap text-gray-700">
                  {merch.deskripsi}
                </td>
                <td className="px-4 py-3 whitespace-no-wrap text-gray-700">
                  Rp {merch.harga}
                </td>
                <td className="px-4 py-3 whitespace-no-wrap text-gray-700">
                  <Image
                    src={merch.gambar}
                    alt={merch.nama}
                    width={100}
                    height={100}
                  />
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
      </div>
    </>
  );
};

export default Merchandise;
