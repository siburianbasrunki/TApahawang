"use client";
import Image from "next/image";
import AddGalery from "./addGaleri";
import UpdateGalery from "./updateGaleri";
import { useEffect, useState } from "react";
import DeleteGalery from "./DeleteGalery";
import { FiRefreshCcw } from "react-icons/fi";
interface GaleryData {
  id: string;
  title: string;
  deskripsi: string;
  gambar: string;
  tanggal: Date;
}

interface GaleryResponse {
  galeries: GaleryData[];
}

const SkeletonTable = () => {
  return (
    <div className="animate-pulse bg-gray-200 p-4 rounded mb-4 w-full">
      <table className="w-full">
        <thead className="bg-gray-50 text-gray-700 capitalize">
          <tr>
            <th className="px-4 py-3 text-left">ID</th>
            <th className="px-4 py-3 text-left">Judul</th>
            <th className="px-4 py-3 text-left">Deskripsi</th>
            <th className="px-4 py-3 text-left">Gambar</th>
            <th className="px-4 py-3 text-left">Update</th>
            <th className="px-4 py-3 text-left">Hapus</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          <tr className="border-b border-gray-200">
            <td
              className="px-4 py-3 whitespace
            -no-wrap text-gray-700"
            >
              Loading...
            </td>
            <td
              className="px-4 py-3 whitespace
            -no-wrap text-gray-700"
            >
              Loading...
            </td>
            <td
              className="px-4 py-3 whitespace
            -no-wrap text-gray-700"
            >
              Loading...
            </td>
            <td
              className="px-4 py-3 whitespace
            -no-wrap text-gray-700"
            >
              Loading...
            </td>
            <td
              className="px-4 py-3 whitespace
            -no-wrap text-gray-700"
            >
              Loading...
            </td>
            <td
              className="px-4 py-3 whitespace
            -no-wrap text-gray-700"
            >
              Loading...
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const Galery = () => {
  const [galeries, setGaleries] = useState<GaleryResponse | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [galeriPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const fetchData = async () => {
    try {
      const response = await fetch("/api/galery");
      const data = await response.json();
      setGaleries(data);
      console.log(data);
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

  const indexOfLastGaleri = currentPage * galeriPerPage;
  const indexOfFirstGaleri = indexOfLastGaleri - galeriPerPage;
  const currentsGaleri = galeries
    ? galeries.galeries.slice(indexOfFirstGaleri, indexOfLastGaleri)
    : [];
  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold mb-4">
            Management Aktivitas/Galeri
          </h1>
        </div>
        <div className="flex justify-end items-center gap-4  mb-4">
          <div
            className="text-2xl cursor-pointer text-black flex items-center gap-x-2 "
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
            <AddGalery />
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        {galeries ? (
          <div>
            <table className="w-full rounded-lg">
              <thead className="bg-gray-100 text-gray-700 capitalize ">
                <tr>
                  <th className="px-4 py-3 text-center text-sm">Judul</th>
                  <th className="px-4 py-3 text-center text-sm">Deskripsi</th>
                  <th className="px-4 py-3 text-center text-sm">Gambar</th>
                  <th className="px-4 py-3 text-center text-sm">Update</th>
                  <th className="px-4 py-3 text-center text-sm">Hapus</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {galeries.galeries.map((galery) => (
                  <tr
                    key={galery.id}
                    className="border-b border-gray-200 capitalize text-sm text-center"
                  >
                    <td
                      className="px-4 py-3 whitespace
                    -no-wrap text-gray-700"
                    >
                      {galery.title}
                    </td>
                    <td
                      className="px-4 py-3 whitespace
                    -no-wrap text-gray-700"
                    >
                      {galery.deskripsi}
                    </td>
                    <td
                      className="px-4 py-3 whitespace
                    -no-wrap text-gray-700"
                    >
                      <Image
                        src={galery.gambar}
                        alt="Gambar"
                        width={100}
                        height={100}
                      />
                    </td>
                    <td
                      className="px-4 py-3 whitespace
                    -no-wrap text-gray-700"
                    >
                      <UpdateGalery galeri={galery} />
                    </td>
                    <td
                      className="px-4 py-3 whitespace
                    -no-wrap text-gray-700"
                    >
                      <DeleteGalery galeri={galery} />
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
                disabled={indexOfLastGaleri >= galeries.galeries.length}
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

export default Galery;
