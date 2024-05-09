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
  const [searchQuery, setSearchQuery] = useState("");

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

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const indexOfLastVilla = currentPage * villasPerPage;
  const indexOfFirstVilla = indexOfLastVilla - villasPerPage;
  const currentVillas = villas
    ? villas.villas
        .filter(
          (villa) =>
            villa.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
            villa.deskripsi.toLowerCase().includes(searchQuery.toLowerCase()) ||
            villa.id.includes(searchQuery)
        )
        .slice(indexOfFirstVilla, indexOfLastVilla)
    : [];

  return (
    <div>
      <div className="bg-white shadow-md rounded-md p-4">
        <div className="flex flex-col md:flex-row justify-between items-center w-full">
          <div>
            <h1 className="text-xl md:text-2xl font-bold mb-4">
              Management Villa
            </h1>
          </div>
          <div className="flex flex-col sm:flex-row justify-end items-center gap-4 mb-4">
            <div
              className="text-lg md:text-xl cursor-pointer text-black flex items-center gap-x-1"
              onClick={handleRefreshClick}
            >
              <small>refresh data</small>
              <FiRefreshCcw />
            </div>
            <div>
              <AddVilla />
            </div>
          </div>
        </div>

        <div>
          <label className="input input-bordered flex items-center gap-2 mt-4 mb-4">
            <input
              type="text"
              className="grow w-96"
              placeholder="Cari villa berdasarkan nama atau id villa"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
        </div>
        {villas ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-max rounded-lg">
              <thead className="bg-gray-50 text-gray-700 capitalize rounded-lg">
                <tr>
                  <th className="px-4 py-3 text-center text-sm">Nama Villa</th>
                  {/* <th className="px-4 py-3 text-center text-sm">ID Villa</th> */}
                  <th className="px-4 py-3 text-center text-sm">Deskripsi</th>
                  <th className="px-4 py-3 text-center text-sm">
                    Harga Permalam (Rupiah)
                  </th>
                  <th className="px-4 py-3 text-center text-sm">
                    Gambar Villa
                  </th>
                  <th className="px-4 py-3 text-center text-sm">
                    Ketersedian Kamar
                  </th>
                  <th className="px-4 py-3 text-center text-sm">Update</th>
                  <th className="px-4 py-3 text-center text-sm">Hapus</th>
                </tr>
              </thead>
              <tbody className="bg-white rounded-lg">
                {currentVillas.map((villa, index) => (
                  <tr
                    key={villa.id}
                    className="border-b border-gray-200 rounded-lg text-sm"
                  >
                    <td className="px-4 py-3 whitespace-no-wrap text-gray-700 text-center items-center">
                      {villa.nama}
                    </td>
                    {/* <td className="px-4 py-3 whitespace-no-wrap text-gray-700 text-center items-center">
                      {villa.id.slice(0, 5)}
                    </td> */}
                    <td className="px-4 py-3 whitespace-no-wrap text-gray-700 text-center items-center">
                      {villa.deskripsi}
                    </td>
                    <td className="px-4 py-3 whitespace-no-wrap text-gray-700 text-center items-center">
                      Rp {villa.hargaPerMalam}
                    </td>
                    <td className="px-4 py-3 whitespace-no-wrap text-gray-700 text-center items-center ">
                      <Image
                        src={villa.gambar}
                        alt="Villa Image"
                        width={100}
                        height={100}
                        className="rounded rounded-lg"
                      />
                    </td>
                    <td className="px-4 py-3 whitespace-no-wrap text-gray-700 text-center items-center">
                      {villa.ketersediaan}
                    </td>
                    <td className="px-4 py-3 whitespace-no-wrap text-gray-700 text-center items-center">
                      <UpdateVilla villa={villa} />
                    </td>
                    <td className="px-4 py-3 whitespace-no-wrap text-gray-700 text-center items-center">
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
                className="btn btn-sm bg-gray-300 px-3 py-1 mr-2"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={indexOfLastVilla >= villas.villas.length}
                className="btn btn-sm bg-gray-300 px-3 py-1"
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
