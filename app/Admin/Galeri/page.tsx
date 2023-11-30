import Image from "next/image";
import imgVilla from "../../../public/assets/villa.png";
import Link from "next/link";
import AddGalery from "./addGaleri";
import UpdateGalery from "./updateGaleri"
import { prisma } from "@/lib/prisma";
import NavbarAdmin from "../NavbarAdmin";
const getGaleri = async () => {
  const res = await prisma.galery.findMany({
    select: {
      id: true,
      title: true,
      deskripsi: true,
      gambar: true,
      tanggal:true
    },
  });
  return res;
};

const Villa = async () => {
  const galeries = await getGaleri();

  return (
    <div>
      <NavbarAdmin/>
      <h1 className="text-2xl font-bold mb-4">Management Aktivitas/Galeri</h1>
      <div className="flex justify-end mb-4">
        <AddGalery/>
      </div>
      <div className="overflow-x-auto"> 
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                Nama Ativitas 
              </th>
              <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                Deskripsi
              </th>
              
              <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                Gambar Aktivitas
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
            {galeries.map((galeri, index) => (
              
              <tr key={galeri.id}>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  {galeri.id}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  {galeri.title}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  {galeri.deskripsi}
                </td>

                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <Image
                    src={galeri.gambar}
                    alt="galeri Image"
                    width={100}
                    height={100}
                  />
                </td>
                
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <UpdateGalery  galeri={galeri}/>
                </td>
                {/* <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <DeleteVilla villa={villa} />
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Villa;
