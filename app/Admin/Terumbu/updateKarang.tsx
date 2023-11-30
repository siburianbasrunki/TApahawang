"use client";
import { useState, SyntheticEvent, ChangeEvent } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
type TerumbuKarang = {
  id: string;
  nama: string;
  deskripsi: string;
  gambar: string
}
const UpdateKarang = ({ karang }: { karang: TerumbuKarang }) => {
  const [nama, setNama] = useState(karang.nama);
  const [deskripsi, setDeskripsi] = useState(karang.deskripsi);
  const [gambar, setGambar] = useState<string | null>(karang.gambar);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const handleUpdate = async (e: SyntheticEvent) => {
    e.preventDefault();

    const formData = new FormData();
    if (selectedFile) {
      formData.append('file', selectedFile);
      formData.append('upload_preset', 'terumbukarang');
      try {
        const { data } = await axios.post(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          formData
        )
        await axios.patch(`/api/karang/${karang.id}`, {
          nama:nama,
          deskripsi:deskripsi,
          gambar:data?.secure_url || null,
        })
      } catch (error) {

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
  }

  return (
    <div>
      <button className="btn btn-info " onClick={handleModal}>
        Edit
      </button>
      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h3 className="font-bold  text-lg">Update {karang.nama}</h3>
          <form onSubmit={handleUpdate}>
            <div className="form-control w-full">
              <label className="label font-bold">Nama karang</label>
              <input
                type="text"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                className="input input-bordered"
                placeholder="masukan nama karang"
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

export default UpdateKarang;
