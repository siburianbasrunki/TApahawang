import React from "react";

const Donasi = () => {
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
                Nama
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
              <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                Aksi Terima
              </th>
              <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                Aksi Tolak
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                1
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                1
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                Contoh Nama
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                101
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                100,000
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <a
                  href="[Link Bukti Pembayaran]"
                  className="text-blue-500 hover:underline"
                >
                  Bukti Pembayaran
                </a>
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                08123456789
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <button className="bg-green-500 text-white rounded px-4 py-2">
                  Terima
                </button>
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <button className="bg-red-500 text-white rounded px-4 py-2">
                  Tolak
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Donasi;
