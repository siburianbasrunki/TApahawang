"use client"
import { useState, SyntheticEvent, ChangeEvent } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { title } from 'process';
// import { Galery } from '@prisma/client';
type Galery = {
    id: string;
    title: string;
    deskripsi: string;
    gambar: string;
    tanggal: Date;
}

const UpdateMerch = ({ galeri }: { galeri: Galery }) => {
  const [title, setTitle] = useState(galeri.title);
  const [deskripsi, setDeskripsi] = useState(galeri.deskripsi);
  const [gambar, setGambar] = useState<string | null>(galeri.gambar);
  const [tanggal, setTanggal] = useState(galeri.tanggal);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleUpdate = async (e: SyntheticEvent) => {
    e.preventDefault();

    const formData = new FormData();
    if (selectedFile) {
      formData.append('file', selectedFile);
      formData.append('upload_preset', 'aktivitas');

      try {
        const { data } = await axios.post(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          formData
        );

        // setGambar(data.secure_url || null);
        await axios.patch(`/api/galery/${galeri.id}`, {
          title: title,
          deskripsi: deskripsi,
          gambar: data?.secure_url || null,
          tanggal: tanggal,
        });
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }

   

    router.refresh();
    setIsOpen(false);
  };

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
  };
  return (
    <div>
      <button className="btn btn-info" onClick={handleModal}>
        Edit
      </button>
      <div className={isOpen ? 'modal modal-open' : 'modal'}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Update {galeri.title}</h3>
          <form onSubmit={handleUpdate}>
            <div className="form-control w-full">
              <label className="label font-bold">Nama Aktivitas</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input input-bordered"
                placeholder="masukan nama merch"
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">Deskripsi</label>
              <input
                type="text"
                value={deskripsi}
                onChange={(e) => setDeskripsi(e.target.value)}
                className="input input-bordered"
                placeholder="masukan deskripsi singkat"
              />
            </div>
            
            <div className="form-control w-full">
              <label className="label font-bold">Gambar</label>
              <input
                type="file"
                onChange={handleFileChange}
                className="input input-bordered"
              />
            </div>
            {/* <div className="form-control w-full">
              <label className="label font-bold">Tanggal</label>
              <input
                type="datetime-local"
                onChange={(e) => setT(Number(e.target.value))}
                className="input input-bordered"
                placeholder="masukan jumlah stok"
              />
            </div> */}
            <div className="modal-action">
              <button type="button" className="btn" onClick={handleModal}>
                Close
              </button>
              <button type="submit" className="btn btn-primary">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateMerch;
