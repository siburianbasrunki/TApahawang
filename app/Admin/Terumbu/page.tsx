import Image from "next/image";
import { prisma } from "@/lib/prisma";
import imgKarang from "../../../public/assets/terumbukarang.jpeg"
import AddKarang from "./addkarang";
import UpdateKarang from "./updateKarang";
import DeleteKarang from "./deleteKarang";
const getKakrang = async () => {
    const res =await prisma.terumbuKarang.findMany({
        select : {
            id:true,
            nama : true,
            deskripsi : true ,
        }
    });
    return res;
}
const Karang =async () => {
    const karangs= await getKakrang();
    return(
        <div>
      <h1 className="text-2xl font-bold mb-4">Management Terumbu Karang</h1>
      <div className="flex justify-end mb-4">
        <AddKarang />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                Nama Terumbu Karang
              </th>
              
              <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
               Deskripsi Terumbu Karang
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
            {karangs.map((karang, index) => (
              <tr key={karang.id}>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  {karang.id}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  {karang.nama}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  {karang.deskripsi}
                </td>
                
                
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <UpdateKarang karang={karang}/>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <DeleteKarang karang={karang}/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    )
}

export default Karang