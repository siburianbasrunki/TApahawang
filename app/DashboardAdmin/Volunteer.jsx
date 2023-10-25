import React from 'react';

const Volunteer = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Management Volunteer</h1>
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
                Nama Organisasi
              </th>
              <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                Jumlah Anggota
              </th>
              <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                Asal Organisasi
              </th>
              <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                Email/noTelepon
              </th>
              <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                Waktu Ketersediaan
              </th>
              <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                Surat Pengajuan
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
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">1</td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">1</td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">Contoh Organisasi</td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">10</td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">Pahawang Community</td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">example@example.com / 08123456789</td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">2023-11-15</td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <a href="[Link Surat Pengajuan]" className="text-blue-500 hover:underline">Surat Pengajuan</a>
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <button className="bg-green-500 text-white rounded px-4 py-2">Terima</button>
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <button className="bg-red-500 text-white rounded px-4 py-2">Tolak</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Volunteer;
