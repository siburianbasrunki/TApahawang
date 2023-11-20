import React from "react";
import { prisma } from "@/lib/prisma";

const getDonasi = async () => {
  const res = await prisma.donasi.findMany({
    select: {
      id: true,
      terumbuKarangId: true,
      jumlahDonasi: true,
      nomortelepon: true,
      buktiPembayaran: true,
      userId: true,
      tanggalDonasi: true,
    },
  });
  return res;
};



const Donasi = async () => {
  const Donasis = await getDonasi();
  console.log(Donasis);
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Management Donasi</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                User ID
              </th>
              <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                ID Terumbu Karang
              </th>
              <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                Jumlah Donasi (Rupiah)
              </th>
              <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                Bukti Pembayaran
              </th>
              <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                Nomor WhatsApp
              </th>
            </tr>
          </thead>
          <tbody>
            {Donasis.map((donasi, index) => {
              return (
                <tr key={donasi.id} className="text-center">
                  <td>{donasi.id}</td>
                  <td>{donasi.userId}</td>
                  <td>{donasi.terumbuKarangId}</td>
                  <td>{donasi.jumlahDonasi}</td>
                  <td>{donasi.buktiPembayaran}</td>
                  <td>{donasi.nomortelepon}</td>
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
