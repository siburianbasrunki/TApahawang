import React from "react";
import imgTransportasi from "../../../public/assets/Transportasi.png";
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
    <div>
      <h1 className="text-2xl font-bold mb-4">Management Transportasi</h1>
      <div className="flex justify-end mb-4">
        <AddTransportasi />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                Nama Kapal
              </th>
              <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                Biaya Sewa (Rupiah)
              </th>
              <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                Gambar Kapal
              </th>
              <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                Jumlah Orang
              </th>
              <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                Update
              </th>
              <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                Hapus
              </th>
            </tr>
          </thead>
          <tbody>
            {transportasiDB.map((transportasi, index) => (
              <tr key={transportasi.id}>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  {transportasi.id}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  {transportasi.nama}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  {transportasi.harga}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <Image
                    src={imgTransportasi}
                    alt={transportasi.nama}
                    width={200}
                    height={200}
                  />
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  {transportasi.ketersediaan}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <UpdateTranportasi transportasi={transportasi} />
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <DeleteTransportasi transportasi={transportasi}/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transportasi;
