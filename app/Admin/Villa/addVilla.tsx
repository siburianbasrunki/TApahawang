'use client';
import { useState, SyntheticEvent } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FaPlus } from "react-icons/fa";
const AddVilla = () => {
  const [nama, setNama] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [hargaPerMalam, setHargaPerMalam] = useState('');
  const [gambar, setGambar] = useState<File | null>(null);
  const [ketersediaan, setKetersediaan] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); 
  const router = useRouter();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    setIsLoading(true); 

    try {
      const formData = new FormData();
      formData.append('file', gambar as File);
      formData.append('upload_preset', 'villas');
      const data = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      );

      await axios.post('/api/villas', {
        nama: nama,
        deskripsi: deskripsi,
        hargaPerMalam: Number(hargaPerMalam),
        gambar: data.data.secure_url,
        ketersediaan: Number(ketersediaan),
      });

      setNama('');
      setDeskripsi('');
      setHargaPerMalam('');
      setGambar(null);
      setKetersediaan('');
      router.refresh();
      setIsOpen(false);
    } catch (error) {
       
      console.error("Error during submission:", error);
    } finally {
      setIsLoading(false);  
    }
  };

  const handleModal = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      <button className='btn flex items-center text-lg' onClick={handleModal}>
       <FaPlus/> Add New
      </button>
      <div className={isOpen ? 'modal modal-open' : 'modal'}>
        <div className='modal-box'>
          <h3 className='font-bold text-lg'>Add New Villa</h3>
          <form onSubmit={handleSubmit}>
            <div className='form-control w-full'>
              <label className='label font-bold'>Nama Villa</label>
              <input
                type='text'
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                className='input input-bordered'
                placeholder='masukan nama villa'
              />
            </div>
            <div className='form-control w-full'>
              <label className='label font-bold'>Deskripsi</label>
              <input
                type='text'
                value={deskripsi}
                onChange={(e) => setDeskripsi(e.target.value)}
                className='input input-bordered'
                placeholder='masukan deskripsi singkat'
              />
            </div>
            <div className='form-control w-full'>
              <label className='label font-bold'>Harga/malam</label>
              <input
                type='text'
                value={hargaPerMalam}
                onChange={(e) => setHargaPerMalam(e.target.value)}
                className='input input-bordered'
                placeholder='price'
              />
            </div>
            <div className='form-control w-full'>
              <label className='label font-bold'>file gambar</label>
              <input
                type='file'  
                onChange={(e) => setGambar(e.target.files?.[0] || null)}  
                className='input input-bordered'
                placeholder='masukan file gambar'
              />
            </div>
            <div className='form-control w-full'>
              <label className='label font-bold'>Jumlah kamar</label>
              <input
                type='text'
                value={ketersediaan}
                onChange={(e) => setKetersediaan(e.target.value)}
                className='input input-bordered'
                placeholder='masukan jumlah kamar'
              />
            </div>
            <div className='modal-action'>
              <button type='button' className='btn' onClick={handleModal}>
                Close
              </button>
              <button
                type='submit'
                className={`btn btn-primary ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={isLoading}
              >
                {isLoading ? "Data sedang dikirim, harap tunggu...." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddVilla;
