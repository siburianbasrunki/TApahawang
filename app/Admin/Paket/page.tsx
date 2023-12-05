"use client"
import React, { useEffect, useState } from 'react'
import { prisma } from '@/lib/prisma'
import Image from 'next/image'
import AddPaket from "./addPaket"
import UpdatePaket from './updatePaket'
import DeletePaket from './deletePaket'
interface PaketData {
    id: string;
    namaPaket: string;
    asalKomunitas: string;
    nomorTelepon: string;
    gambarPaket: string;
}

interface PaketResponse {
    pakets: PaketData[];
}

const SkeletonTable = () => {
    return (
        <div className="animate-pulse bg-gray-200 p-4 rounded mb-4 w-full">
            <table className="w-full">
                <thead className="bg-gray-50 text-gray-700 uppercase">
                    <tr>
                        <th className="px-4 py-3 text-left">ID Paket</th>
                        <th className="px-4 py-3 text-left">Nama Paket</th>
                        <th className="px-4 py-3 text-left">Asal Komunitas</th>
                        <th className="px-4 py-3 text-left">Nomor Telepon</th>
                        <th className="px-4 py-3 text-left">Gambar Paket</th>
                        <th className="px-4 py-3 text-left">Update</th>
                        <th className="px-4 py-3 text-left">Hapus</th>
                    </tr>
                </thead>
                <tbody className="bg-white">
                    {/* Placeholder row for skeleton loading */}
                    <tr className="border-b border-gray-200">
                        <td className="px-4 py-3 whitespace
                    -no-wrap text-gray-700">Loading...</td>
                        <td className="px-4 py-3 whitespace
                    -no-wrap text-gray-700">Loading...</td>
                        <td className="px-4 py-3 whitespace
                    -no-wrap text-gray-700">Loading...</td>
                        <td className="px-4 py-3 whitespace
                    -no-wrap text-gray-700">Loading...</td>
                        <td className="px-4 py-3 whitespace
                    -no-wrap text-gray-700">Loading...</td>
                        <td className="px-4 py-3 whitespace
                    -no-wrap text-gray-700">Loading...</td>
                        <td className="px-4 py-3 whitespace
                    -no-wrap text-gray-700">Loading...</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );

}

const Paket = () => {
    const [pakets, setPakets] = useState<PaketResponse | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/paket');
                const data = await response.json();
                setPakets(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <div>
                <h1 className="text-2xl font-bold mb-4">Management Villa</h1>
                <div className="flex justify-end mb-4">
                    <AddPaket />
                </div>
                {
                    pakets ? (
                        <div>
                            <table className="w-full">
                                <thead className="bg-gray-50 text-gray-700 uppercase">
                                    <tr>
                                        <th className="px-4 py-3 text-left">ID Paket</th>
                                        <th className="px-4 py-3 text-left">Nama Paket</th>
                                        <th className="px-4 py-3 text-left">Asal Komunitas</th>
                                        <th className="px-4 py-3 text-left">Nomor Telepon</th>
                                        <th className="px-4 py-3 text-left">Gambar Paket</th>
                                        <th className="px-4 py-3 text-left">Update</th>
                                        <th className="px-4 py-3 text-left">Hapus</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white">
                                    {pakets.pakets.map((paket, index) => (
                                        <tr className="border-b border-gray-200" key={paket.id}>
                                            <td className="px-4 py-3 whitespace-no-wrap text-gray-700">{paket.id}</td>
                                            <td className="px-4 py-3 whitespace-no-wrap text-gray-700">{paket.namaPaket}</td>
                                            <td className="px-4 py-3 whitespace-no-wrap text-gray-700">{paket.asalKomunitas}</td>
                                            <td className="px-4 py-3 whitespace-no-wrap text-gray-700">{paket.nomorTelepon}</td>
                                            <td className="px-4 py-3 whitespace-no-wrap text-gray-700">
                                                <Image src={paket.gambarPaket} alt={paket.gambarPaket} width={100} height={100} />
                                            </td>
                                            <td className="px-4 py-3 whitespace-no-wrap text-gray-700"><UpdatePaket paket={paket} /></td>
                                            <td className="px-4 py-3 whitespace-no-wrap text-gray-700"><DeletePaket paket={paket} /></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <SkeletonTable />
                    )
                }
            </div>
        </>
    )
}

export default Paket;
