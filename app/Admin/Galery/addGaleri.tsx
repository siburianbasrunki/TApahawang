'use client';
import { useState, SyntheticEvent } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const AddGalery = () => {
  const [title, setTitle] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [gambar, setGambar] = useState<File | null>(null);
  const [tanggal, setTanggal] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('file', gambar as File);
    formData.append('upload_preset', 'aktivitas');
    const data = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      formData
    );

    await axios.post('/api/galery', {
      title: title,
      deskripsi: deskripsi,
      gambar: data.data.secure_url,
      tanggal: new Date(tanggal).toISOString(),
    });

    setTitle('');
    setDeskripsi('');
    setGambar(null);
    setTanggal('');
    router.refresh();
    setIsOpen(false);
  };

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button className='btn ' onClick={handleModal}>
        Add Activity
      </button>
      <div className={isOpen ? 'modal modal-open' : 'modal'}>
        <div className='modal-box'>
          <h3 className='font-bold text-lg'>Add New </h3>
          <form onSubmit={handleSubmit}>
            <div className='form-control w-full'>
              <label className='label font-bold'>Judul Kegiatan</label>
              <input
                type='text'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className='input input-bordered'
                placeholder='masukan judul aktivitas'
              />
            </div>
            <div className='form-control w-full'>
              <label className='label font-bold'>Deskripsi</label>
              <input
                type='text'
                value={deskripsi}
                onChange={(e) => setDeskripsi(e.target.value)}
                className='input input-bordered'
                placeholder='masukan deskripsi '
              />
            </div>
            
            <div className='form-control w-full'>
              <label className='label font-bold'>file gambar</label>
              <input
                type='file' // Updated to type="file"
                onChange={(e) => setGambar(e.target.files?.[0] || null)} // Updated to handle file selection
                className='input input-bordered'
                placeholder='masukan file gambar'
              />
            </div>
            <div className='form-control w-full'>
              <label className='label font-bold'>tanggal kegiatan</label>
              <input
                type='datetime-local'
                value={tanggal}
                onChange={(e) => setTanggal(e.target.value)}
                className='input input-bordered'
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
  );
};

export default AddGalery;
