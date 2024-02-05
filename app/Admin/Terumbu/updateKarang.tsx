"use client";
import { useState, SyntheticEvent, ChangeEvent } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
type TerumbuKarang = {
  id: string;
  nama: string;
  deskripsi: string;
  gambar: string;
};
const UpdateKarang = ({ karang }: { karang: TerumbuKarang }) => {
  const [nama, setNama] = useState(karang.nama);
  const [deskripsi, setDeskripsi] = useState(karang.deskripsi);
  const [gambar, setGambar] = useState<string | null>(karang.gambar);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const handleUpdate = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await axios.patch(`/api/karang/${karang.id}`, {
        nama: nama,
        deskripsi: deskripsi,
      });

      router.refresh();
      setIsOpen(false);
    } catch (error) {
      console.error("Error during update:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleModal = () => {
    setIsOpen(!isOpen);
  };
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

            <div className="modal-action">
              <button type="button" className="btn" onClick={handleModal}>
                Close
              </button>
              <button
                type="submit"
                className={`btn btn-primary ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isLoading}
              >
                {isLoading ? "Updating..." : "Update"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateKarang;
