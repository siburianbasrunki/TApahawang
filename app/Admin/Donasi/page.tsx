import React from "react";
import { prisma } from "@/lib/prisma";
import AddDonasi from "./addDonasi";
import Image from "next/image";

const getDonasi = async () => {
  const res = await prisma.donasi.findMany({
    select: {
      id: true,
      terumbuKarangId: true,
      jumlahDonasi: true,
      nomortelepon: true,
      buktiPembayaran: true,
      terumbuKarang: true,
    },
  });
  return res;
};

const getKarang = async () => {
  const res = await prisma.terumbuKarang.findMany();
  return res;
};

const Donasi = async () => {
  const [Donasis, Karangs] = await Promise.all([getDonasi(), getKarang()]);

  return (
    <div className="bg-white shadow-md rounded-md p-4">
      <h1 className="text-2xl font-bold mb-4">Manajemen Donasi</h1>
      <div className="mb-2">
        <AddDonasi karangs={Karangs} />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-100 text-gray-600 uppercase">
            <tr>
              <th className="px-6 py-3 text-left">ID</th>
              <th className="px-6 py-3 text-left">Jumlah Donasi</th>
              <th className="px-6 py-3 text-left">Bukti Pembayaran</th>
              <th className="px-6 py-3 text-left">Nomor WhatsApp</th>
              <th className="px-6 py-3 text-left">Terumbu Karang</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {Donasis.map((donasi, index) => {
              return (
                <tr key={donasi.id} className="border-b">
                  <td className="px-6 py-4 text-gray-700">{donasi.id}</td>
                  <td className="px-6 py-4 text-gray-700">
                    Rp. {donasi.jumlahDonasi}
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
                      src={donasi.terumbuKarang.gambar}
                      alt={donasi.terumbuKarang.nama}
                      width={100}
                      height={100}
                      className="rounded-md"
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Donasi;
