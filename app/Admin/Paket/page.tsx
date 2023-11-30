import React from 'react'
import imgPaket from "../../../public/assets/packet.png"
import { prisma } from '@/lib/prisma'
import Image from 'next/image'
import AddPaket from "./addPaket"
import UpdatePaket from './updatePaket'
import DeletePaket from './deletePaket'
import NavbarAdmin from '../NavbarAdmin'
const getPaket = async () => {
    const res = await prisma.paket.findMany({
        select: {
            id: true,
            namaPaket: true,
            asalKomunitas: true,
            gambarPaket: true,
            nomorTelepon: true
        }
    })
    return res
}
const Paket = async () => {
    const pakets = await getPaket()
    return (
        <>
            <NavbarAdmin />
            <div>
                <h1 className="text-2xl font-bold mb-4">Management Villa</h1>
                <div className="flex justify-end mb-4">
                    <AddPaket />
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead>
                            <tr>
                                <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                    ID Paket
                                </th>
                                <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                    Nama Paket
                                </th>
                                <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                    Asal Komunitas
                                </th>
                                <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                    Nomor Telepon
                                </th>
                                <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                    Gambar Paket
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
                            {pakets.map((paket, index) => (

                                <tr key={paket.id}>
                                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                        {paket.id}
                                    </td>
                                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                        {paket.namaPaket}
                                    </td>
                                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                        {paket.asalKomunitas}
                                    </td>
                                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                        {paket.nomorTelepon}
                                    </td>

                                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                        <Image
                                            src={paket.gambarPaket}
                                            alt="Villa Image"
                                            width={100}
                                            height={100}
                                        />
                                    </td>

                                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                        <UpdatePaket paket={paket} />
                                    </td>
                                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                        <DeletePaket paket={paket} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Paket