"use client"
import React, { useEffect, useState, SyntheticEvent } from "react"
import type { TerumbuKarang } from "@prisma/client"
import { useRouter } from "next/navigation"
import axios from "axios"
import Image from "next/image"
const AddDonasi = ({ karangs }: { karangs: TerumbuKarang[] }) => {

    const [nama, setNama] = useState("")
    const [jlhDonasi, setJlhDonasi] = useState("");
    const [bukti, setBukti] = useState<File | null>(null);
    const [telepon, setTelepon] = useState("");
    const [terumbuKarang, setTerumbuKarang] = useState("")
    const [isOpen, setIsOpen] = useState(false)
    const router = useRouter();


    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault()

        const formData = new FormData();
        formData.append('file', bukti as File);
        formData.append('upload_preset', 'buktipembayaran');
        const data = await axios.post(
            `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
            formData
        );

        await axios.post('/api/donasi', {
            nama: nama,
            terumbuKarangId: terumbuKarang,
            jumlahDonasi: jlhDonasi,
            buktiPembayaran: data.data.secure_url,
            nomortelepon: telepon
        })

        setNama("")
        setTerumbuKarang("")
        setJlhDonasi("")
        setBukti(null)
        setTelepon("")
        router.refresh()
        setIsOpen(false)

    }

    const handleModal = () => {
        setIsOpen(!isOpen)
    }
    return (
        <div>
            <button className="btn btn-primary" onClick={handleModal}>Ayo Donasi </button>
            <div className={isOpen ? 'modal modal-open' : 'modal'}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Add New Donasi</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-control w-full">
                            <label className="label font-bold">Nama Donasi</label>
                            <input type="text" className="input input-bordered" value={nama} onChange={(e) => setNama(e.target.value)} placeholder="nama donasi" />
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">Jumlah Donasi</label>
                            <input type="text" className="input input-bordered" value={jlhDonasi} onChange={(e) => setJlhDonasi(e.target.value)} placeholder="jumlah donasi" />
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">Bukti Pembayaran (image)</label>
                            <input type="file" className="input input-bordered" onChange={(e) => setBukti(e.target.files?.[0] || null)} />
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">Nomor Telepon</label>
                            <input type="text" className="input input-bordered" value={telepon} onChange={(e) => setTelepon(e.target.value)} placeholder="masukan nomor telepon/WA" />
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">Terumbu Karang </label>
                            <select className="select select-bordered" value={terumbuKarang} onChange={(e) => setTerumbuKarang(e.target.value)}>
                                <option value="" disabled>
                                    Select Terumbu Karang
                                </option>
                                {karangs.map((karang) => (
                                    <option value={karang.id} key={karang.id} className=" ">

                                        <Image src={karang.gambar} alt={karang.nama} height={100} width={100} />
                                        <p>{karang.nama}</p>

                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="modal-action">
                            <button type="button" className="btn" onClick={handleModal}>Close</button>
                            <button type="submit" className="btn btn-primary">Simpan</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddDonasi