"use client";
import { useState, SyntheticEvent } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

type Villa = {
  id: string;
  nama: string;
  deskripsi: string;
  hargaPerMalam: number;
  gambar: string;
  ketersediaan: number;
};

const UpdateVilla = ({ villa }: { villa: Villa }) => {
  const [nama, setNama] = useState(villa.nama);
  const [deskripsi, setDeskripsi] = useState(villa.deskripsi);
  const [hargaPerMalam, setHargaPerMalam] = useState(villa.hargaPerMalam);
  const [gambar, setGambar] = useState(villa.gambar);
  const [ketersediaan, setKetersediaan] = useState(villa.ketersediaan);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleUpdate = async (e: SyntheticEvent) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      await axios.patch(`/api/villas/${villa.id}`, {
        nama: nama,
        deskripsi: deskripsi,
        hargaPerMalam: Number(hargaPerMalam),
        gambar: gambar,
        ketersediaan: Number(ketersediaan),
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
          <h3 className="font-bold  text-lg">Update {villa.nama}</h3>
          <form onSubmit={handleUpdate}>
            <div className="form-control w-full">
              <label className="label font-bold">Nama Villa</label>
              <input
                type="text"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                className="input input-bordered"
                placeholder="masukan nama villa"
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
              <label className="label font-bold">Harga/malam</label>
              <input
                type="text"
                value={hargaPerMalam}
                onChange={(e) => setHargaPerMalam(Number(e.target.value))}
                className="input input-bordered"
                placeholder="price"
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">file gambar</label>
              <input
                type="text"
                value={gambar}
                onChange={(e) => setGambar(e.target.value)}
                className="input input-bordered"
                placeholder="masukan file gambar"
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">Jumlah kamar</label>
              <input
                type="text"
                value={ketersediaan}
                onChange={(e) => setKetersediaan(Number(e.target.value))}
                className="input input-bordered"
                placeholder="masukan jumlah kamar"
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

export default UpdateVilla;
