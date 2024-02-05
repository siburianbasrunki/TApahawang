"use client";
import { useState, SyntheticEvent, ChangeEvent } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

type Merchandise = {
  id: string;
  nama: string;
  deskripsi: string;
  harga: number;
  gambar: string;
  ketersediaan: number;
  noTelepon: string;
};

const UpdateMerch = ({ merch }: { merch: Merchandise }) => {
  const [nama, setNama] = useState(merch.nama);
  const [deskripsi, setDeskripsi] = useState(merch.deskripsi);
  const [harga, setHarga] = useState(merch.harga);
  const [ketersediaan, setKetersediaan] = useState(merch.ketersediaan);
  const [noTelepon, setNoTelepon] = useState(merch.noTelepon);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdate = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
       await axios.patch(`/api/merchandise/${merch.id}`, {
      nama: nama,
      deskripsi: deskripsi,
      harga: Number(harga),
      ketersediaan: Number(ketersediaan),
      noTelepon: noTelepon,
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
      <button className="btn btn-info" onClick={handleModal}>
        Edit
      </button>
      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Update {merch.nama}</h3>
          <form onSubmit={handleUpdate}>
            <div className="form-control w-full">
              <label className="label font-bold">Nama Merch</label>
              <input
                type="text"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
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
              <label className="label font-bold">Harga</label>
              <input
                type="text"
                value={harga}
                onChange={(e) => setHarga(Number(e.target.value))}
                className="input input-bordered"
                placeholder="harga"
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">Nomor Telepon/WA</label>
              <input
                type="text"
                value={noTelepon}
                onChange={(e) => setNoTelepon(e.target.value)}
                className="input input-bordered"
                placeholder="nomor telepon/Wa"
              />
            </div>

            <div className="form-control w-full">
              <label className="label font-bold">Jumlah stok</label>
              <input
                type="text"
                value={ketersediaan}
                onChange={(e) => setKetersediaan(Number(e.target.value))}
                className="input input-bordered"
                placeholder="masukan jumlah stok"
              />
            </div>
            <div className="modal-action">
              <button type="button" className="btn" onClick={handleModal}>
                Close
              </button>
              <button
                type="submit"
                className={`btn btn-primary ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
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

export default UpdateMerch;
