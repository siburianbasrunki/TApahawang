import imgMerchandise from "../../../public/assets/merch.jpg";
import Image from "next/image";
import React from "react";
import { PrismaClient } from "@prisma/client";
import AddMerch from "./addMerch";
import UpdateMerch from "./updateMerch";
import DeleteMerch from "./deleteMerch";
const prisma = new PrismaClient()

const getMerch = async () => {
  const res = await prisma.merchandise.findMany({
    select : {
      id : true,
      nama : true , 
      deskripsi : true,
      harga : true,
      gambar : true,
      ketersediaan: true 
    }
  });
  return  res;
}

const Merchandise = async () => {
  const merchs = await getMerch();
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Management Merchandise</h1>
      <div className="flex justify-end mb-4">
        <AddMerch/>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                Nama Barang
              </th>
              <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                Deskripsi
              </th>
              <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                Harga ( Rupiah )
              </th>
              <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                Gambar Barang
              </th>

              <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                Udpate
              </th>
              <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                Hapus
              </th>
            </tr>
          </thead>
          <tbody>
            {merchs.map((merch , index) => (
              <tr key={merch.id}>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  {merch.id}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  {merch.nama}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  {merch.deskripsi}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  {merch.harga}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <Image
                    src={imgMerchandise}
                    alt={merch.nama}
                    width={200}
                  />
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <UpdateMerch merch={merch}/>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <DeleteMerch merch={merch}/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Merchandise;
