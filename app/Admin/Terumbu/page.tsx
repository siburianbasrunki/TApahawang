import React from "react";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import imgKarang from "../../../public/assets/terumbukarang.jpeg";
import AddKarang from "./addkarang";
import UpdateKarang from "./updateKarang";
import DeleteKarang from "./deleteKarang";

const getTerumbuKarang = async () => {
  const res = await prisma.terumbuKarang.findMany({
    select: {
      id: true,
      nama: true,
      deskripsi: true,
      gambar: true,
    },
  });
  return res;
};

const TerumbuKarang = async () => {
  const karangs = await getTerumbuKarang();

  return (
    <div className="bg-white shadow-md rounded-md p-4">
      <h1 className="text-2xl font-bold mb-4">Management Terumbu Karang</h1>
      <div className="flex justify-end mb-4">
        <AddKarang />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-100 text-gray-600 uppercase">
            <tr>
              <th className="px-6 py-3 text-left">ID</th>
              <th className="px-6 py-3 text-left">Nama Terumbu Karang</th>
              <th className="px-6 py-3 text-left">Deskripsi Terumbu Karang</th>
              <th className="px-6 py-3 text-left">Gambar</th>
              <th className="px-6 py-3 text-left">Update</th>
              <th className="px-6 py-3 text-left">Hapus</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {karangs.map((karang, index) => (
              <tr key={karang.id} className="border-b">
                <td className="px-6 py-4 text-gray-700">{karang.id}</td>
                <td className="px-6 py-4 text-gray-700">{karang.nama}</td>
                <td className="px-6 py-4 text-gray-700">{karang.deskripsi}</td>
                <td className="px-6 py-4">
                  <Image
                    src={karang.gambar}
                    alt="Terumbu Karang"
                    width={100}
                    height={100}
                    className="rounded-md"
                  />
                </td>
                <td className="px-6 py-4 text-gray-700">
                  <UpdateKarang karang={karang} />
                </td>
                <td className="px-6 py-4 text-gray-700">
                  <DeleteKarang karang={karang} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TerumbuKarang;
