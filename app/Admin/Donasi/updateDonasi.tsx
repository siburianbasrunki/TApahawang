"use client"
import { useState, SyntheticEvent, ChangeEvent } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
type Donasi = {
    id: string;
    nama: string;
    terumbuKarangId: string;
    jumlahDonasi: string;
    buktiPembayaran: string;
    nomortelepon: string;
    createAt: Date;
    updateAt: Date;
}
const UpdateDonasi = ({ donasi }: { donasi: Donasi }) => {
  
  const [karangid, setKarangId] = useState<string | null>(donasi.terumbuKarangId);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleUpdate = async (e: SyntheticEvent) => {
    e.preventDefault();

    const formData = new FormData();
    if (selectedFile) {
      formData.append('file', selectedFile);
      formData.append('upload_preset', 'buktipembayaran');

      try {
        const { data } = await axios.post(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          formData
        );

        // setGambar(data.secure_url || null);
        await axios.patch(`/api/donasi/${donasi.id}`, {
          
          gambar: data?.secure_url || null,
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
          <h3 className="font-bold text-lg">Update {donasi.nama}</h3>
          <form onSubmit={handleUpdate}>
            
            
            
            <div className="form-control w-full">
              <label className="label font-bold">Gambar</label>
              <input
                type="file"
                onChange={handleFileChange}
                className="input input-bordered"
              />
            </div>
            
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

export default UpdateDonasi;
