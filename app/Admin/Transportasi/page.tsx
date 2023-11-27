import React from "react";
import Image from "next/image";
import { PrismaClient } from "@prisma/client";
import AddTransportasi from "./addTransportasi";
import UpdateTranportasi from "./updateTranportasi";
import DeleteTransportasi from "./deleteTransportasi";

const prisma = new PrismaClient();

const getTransportasifromDB = async () => {
  const res = await prisma.transportasiLaut.findMany({
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

const Transportasi = async () => {
  const transportasiDB = await getTransportasifromDB();

  return (
    <div className="bg-white shadow-md rounded-md p-4">
      <h1 className="text-2xl font-bold mb-4">Management Transportasi Laut</h1>
      <div className="flex justify-end mb-4">
        <AddTransportasi />
      </div>

      <table className="w-full overflow-x-auto">
        <thead className="bg-gray-50 text-gray-700 uppercase">
          <tr>
            <th className="px-4 py-3 text-left">ID</th>
            <th className="px-4 py-3 text-left">Nama Kapal</th>
            <th className="px-4 py-3 text-left">Biaya Sewa (Rupiah)</th>
            <th className="px-4 py-3 text-left">Gambar Kapal</th>
            <th className="px-4 py-3 text-left">Jumlah Orang</th>
            <th className="px-4 py-3 text-left">Update</th>
            <th className="px-4 py-3 text-left">Hapus</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {transportasiDB.map((transportasi, index) => (
            <tr key={transportasi.id} className="border-b border-gray-200">
              <td className="px-4 py-3 whitespace-no-wrap text-gray-700">
                {transportasi.id}
              </td>
              <td className="px-4 py-3 whitespace-no-wrap text-gray-700">
                {transportasi.nama}
              </td>
              <td className="px-4 py-3 whitespace-no-wrap text-gray-700">
                Rp {transportasi.harga}
              </td>
              <td className="px-4 py-3 whitespace-no-wrap text-gray-700">
                <Image
                  src={transportasi.gambar}
                  alt={transportasi.nama}
                  width={100}
                  height={100}
                />
              </td>
              <td className="px-4 py-3 whitespace-no-wrap text-gray-700">
                {transportasi.ketersediaan}
              </td>
              <td className="px-4 py-3 whitespace-no-wrap text-gray-700">
                <UpdateTranportasi transportasi={transportasi} />
              </td>
              <td className="px-4 py-3 whitespace-no-wrap text-gray-700">
                <DeleteTransportasi transportasi={transportasi} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Transportasi;
