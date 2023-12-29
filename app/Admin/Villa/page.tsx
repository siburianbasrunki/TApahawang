"use client";
import Image from "next/image";
import Link from "next/link";
import AddVilla from "./addVilla";
import DeleteVilla from "./deleteVilla";
import UpdateVilla from "./updateVilla";
import { useEffect, useState } from "react";
import { FiRefreshCcw } from "react-icons/fi";

interface VillaData {
  id: string;
  nama: string;
  deskripsi: string;
  hargaPerMalam: number;
  gambar: string;
  ketersediaan: number;
}

interface VillaResponse {
  villas: VillaData[];
}

const SkeletonTable = () => {
  return (
    <div className="animate-pulse bg-gray-200 p-4 rounded mb-4 w-full">
      <table className="w-full">
        <thead className="bg-gray-50 text-gray-700 uppercase">
          <tr>
            <th className="px-4 py-3 text-left">ID</th>
            <th className="px-4 py-3 text-left">Nama Villa</th>
            <th className="px-4 py-3 text-left">Deskripsi</th>
            <th className="px-4 py-3 text-left">Harga Permalam (Rupiah)</th>
            <th className="px-4 py-3 text-left">Gambar Villa</th>
            <th className="px-4 py-3 text-left">Ketersedian Kamar</th>
            <th className="px-4 py-3 text-left">Update</th>
            <th className="px-4 py-3 text-left">Hapus</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {/* Placeholder row for skeleton loading */}
          <tr className="border-b border-gray-200">
            <td className="px-4 py-3 whitespace-no-wrap text-gray-700">
              Loading...
            </td>
            <td className="px-4 py-3 whitespace-no-wrap text-gray-700">
              Loading...
            </td>
            <td className="px-4 py-3 whitespace-no-wrap text-gray-700">
              Loading...
            </td>
            <td className="px-4 py-3 whitespace-no-wrap text-gray-700">
              Loading...
            </td>
            <td className="px-4 py-3 whitespace-no-wrap text-gray-700">
              Loading...
            </td>
            <td className="px-4 py-3 whitespace-no-wrap text-gray-700">
              Loading...
            </td>
            <td className="px-4 py-3 whitespace-no-wrap text-gray-700">
              Loading...
            </td>
            <td className="px-4 py-3 whitespace-no-wrap text-gray-700">
              Loading...
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const Villa = () => {
  const [villas, setVillas] = useState<VillaResponse | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [villasPerPage] = useState(4);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/villas");
      const json: VillaResponse = await res.json();
      setVillas(json);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleRefreshClick = () => {
    setIsRefreshing(true);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  const indexOfLastVilla = currentPage * villasPerPage;
  const indexOfFirstVilla = indexOfLastVilla - villasPerPage;
  const currentVillas = villas
    ? villas.villas.slice(indexOfFirstVilla, indexOfLastVilla)
    : [];

  return (
    <div>
      <div className="bg-white shadow-md rounded-md p-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold mb-4">Management Villa</h1>
          </div>
          <div className="flex justify-end items-center gap-4 mb-4">
            <div
              className="text-2xl cursor-pointer text-green-700 flex items-center gap-x-2 "
              onClick={handleRefreshClick}
            >
              <div>
                <small>refresh data</small>
              </div>
              <div>
                <FiRefreshCcw />
              </div>
            </div>
            <div>
              <AddVilla />
            </div>
          </div>
        </div>

        {villas ? (
          <div>
            <table className="w-full overflow-x-auto">
              <thead className="bg-gray-50 text-gray-700 uppercase">
                <tr>
                  <th className="px-4 py-3 text-left">Nama Villa</th>
                  <th className="px-4 py-3 text-left">Deskripsi</th>
                  <th className="px-4 py-3 text-left">
                    Harga Permalam (Rupiah)
                  </th>
                  <th className="px-4 py-3 text-left">Gambar Villa</th>
                  <th className="px-4 py-3 text-left">Ketersedian Kamar</th>
                  <th className="px-4 py-3 text-left">Update</th>
                  <th className="px-4 py-3 text-left">Hapus</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {currentVillas.map((villa, index) => (
                  <tr key={villa.id} className="border-b border-gray-200">
                    <td className="px-4 py-3 whitespace-no-wrap text-gray-700">
                      {villa.nama}
                    </td>
                    <td className="px-4 py-3 whitespace-no-wrap text-gray-700">
                      {villa.deskripsi}
                    </td>
                    <td className="px-4 py-3 whitespace-no-wrap text-gray-700">
                      Rp {villa.hargaPerMalam}
                    </td>
                    <td className="px-4 py-3 whitespace-no-wrap text-gray-700">
                      <Image
                        src={villa.gambar}
                        alt="Villa Image"
                        width={100}
                        height={100}
                      />
                    </td>
                    <td className="px-4 py-3 whitespace-no-wrap text-gray-700">
                      {villa.ketersediaan}
                    </td>
                    <td className="px-4 py-3 whitespace-no-wrap text-gray-700">
                      <UpdateVilla villa={villa} />
                    </td>
                    <td className="px-4 py-3 whitespace-no-wrap text-gray-700">
                      <DeleteVilla villa={villa} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-4 flex justify-center">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="bg-gray-300 px-3 py-1 mr-2"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={indexOfLastVilla >= villas.villas.length}
                className="bg-gray-300 px-3 py-1"
              >
                Next
              </button>
            </div>
          </div>
        ) : (
          <SkeletonTable />
        )}
      </div>
    </div>
  );
};

export default Villa;
