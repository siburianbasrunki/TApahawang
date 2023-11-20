import Image from "next/image";
import imgVilla from "../../../public/assets/villa.png";
import Link from "next/link";
import AddVilla from "./addVilla";
import DeleteVilla from "./deleteVilla";
import UpdateVilla from "./updateVilla";
import { prisma } from "@/lib/prisma";
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
    <div>
      <h1 className="text-2xl font-bold mb-4">Management Villa</h1>
      <div className="flex justify-end mb-4">
        <AddVilla />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                Nama Villa
              </th>
              <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                Deskripsi
              </th>
              <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                Harga Permalam (Rupiah)
              </th>
              <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                Gambar Villa
              </th>
              <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                Ketersedian Kamar
              </th>
              <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                update
              </th>
              <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                hapus
              </th>
            </tr>
          </thead>
          <tbody>
            {villas.map((villa, index) => (
              <tr key={villa.id}>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  {villa.id}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  {villa.nama}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  {villa.deskripsi}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  Rp {villa.hargaPerMalam}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <Image
                    src={imgVilla}
                    alt="Villa Image"
                    width={50}
                    height={50}
                  />
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  {villa.ketersediaan}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <UpdateVilla villa={villa}/>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <DeleteVilla villa={villa} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Villa;