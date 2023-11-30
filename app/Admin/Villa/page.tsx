import Image from "next/image";
import imgVilla from "../../../public/assets/villa.png";
import Link from "next/link";
import AddVilla from "./addVilla";
import DeleteVilla from "./deleteVilla";
import UpdateVilla from "./updateVilla";
import { prisma } from "@/lib/prisma";
import NavbarAdmin from "../NavbarAdmin";

const getVilla = async () => {
  const res = await prisma.villa.findMany({
    select: {
      id: true,
      nama: true,
      deskripsi: true,
      hargaPerMalam: true,
      gambar: true,
      ketersediaan: true,
    },
  });
  return res;
};

const Villa = async () => {
  const villas = await getVilla();

  return (
    <>
      <NavbarAdmin />
      <div className="bg-white shadow-md rounded-md p-4">
        <h1 className="text-2xl font-bold mb-4">Management Villa</h1>
        <div className="flex justify-end mb-4">
          <AddVilla />
        </div>

        <table className="w-full overflow-x-auto">
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
            {villas.map((villa, index) => (
              <tr key={villa.id} className="border-b border-gray-200">
                <td className="px-4 py-3 whitespace-no-wrap text-gray-700">
                  {villa.id}
                </td>
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
      </div>
    </>
  );
};

export default Villa;
