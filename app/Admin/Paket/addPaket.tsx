"use client"
import { useState, SyntheticEvent } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"

const addPaket = () => {
    const [namaPaket, setNamaPaket] = useState("");
    const [asalKomunitas, setAsalKomunitas] = useState("");
    const [nomorTelepon, setNomorTelepon] = useState("");
    const [gambarPaket, setGambarPaket] = useState<File | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('file', gambarPaket as File);
        formData.append('upload_preset', 'paketpahawang');
        const data = await axios.post(
            `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
            formData
        );

        await axios.post('/api/paket', {
            namaPaket: namaPaket,
            asalKomunitas: asalKomunitas,
            gambarPaket: data.data.secure_url,
            nomorTelepon: nomorTelepon
        })
        setNamaPaket('');
        setAsalKomunitas('');
        setGambarPaket(null);
        setNomorTelepon('');
        router.refresh();
        setIsOpen(false);
    }
    const handleModal = () => {
        setIsOpen(!isOpen)
    }


    return (
        <div>
            <button className="btn" onClick={handleModal}>
                Add New Paket
            </button>

            <div className={isOpen ? 'modal modal-open' : 'modal'}>
                <div className='modal-box'>
                    <h3 className='font-bold text-lg'>Add New Paket</h3>
                    <form onSubmit={handleSubmit}>
                        <div className='form-control w-full'>
                            <label className='label font-bold'>Nama Paket</label>
                            <input
                                type='text'
                                value={namaPaket}
                                onChange={(e) => setNamaPaket(e.target.value)}
                                className='input input-bordered'
                                placeholder='masukan nama Paket'
                            />
                        </div>
                        <div className='form-control w-full'>
                            <label className='label font-bold'>Asal Komunitas</label>
                            <input
                                type='text'
                                value={asalKomunitas}
                                onChange={(e) => setAsalKomunitas(e.target.value)}
                                className='input input-bordered'
                                placeholder='masukan nama komunitas'
                            />
                        </div>
                        <div className='form-control w-full'>
                            <label className='label font-bold'>Nomor Telepon</label>
                            <input
                                type='text'
                                value={nomorTelepon}
                                onChange={(e) => setNomorTelepon(e.target.value)}
                                className='input input-bordered'
                                placeholder='masukan nomor telepon'
                            />
                        </div>
                        <div className='form-control w-full'>
                            <label className='label font-bold'>file gambar paket</label>
                            <input
                                type='file' // Updated to type="file"
                                onChange={(e) => setGambarPaket(e.target.files?.[0] || null)} // Updated to handle file selection
                                className='input input-bordered'
                                placeholder='masukan file gambar'
                            />
                        </div>

                        <div className='modal-action'>
                            <button type='button' className='btn' onClick={handleModal}>
                                Close
                            </button>
                            <button type='submit' className='btn btn-primary'>
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )

}


export default addPaket