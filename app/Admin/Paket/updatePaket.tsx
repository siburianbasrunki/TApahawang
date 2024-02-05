"use client";
import { useState, SyntheticEvent } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
type Paket = {
  id: string;
  namaPaket: string;
  asalKomunitas: string;
  nomorTelepon: string;
  gambarPaket: string;
};
const UpdatePaket = ({ paket }: { paket: Paket }) => {
  const [namaPaket, setNamaPaket] = useState(paket.namaPaket);
  const [asalKomunitas, setAsalKomunitas] = useState(paket.asalKomunitas);
  const [nomorTelepon, setNomorTelepon] = useState(paket.nomorTelepon);
  const [gambarPaket, setGambarPaket] = useState(paket.gambarPaket);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleUpdate = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await axios.patch(`/api/paket/${paket.id}`, {
        namaPaket: namaPaket,
        asalKomunitas: asalKomunitas,
        nomorTelepon: nomorTelepon,
        gambarPaket: gambarPaket,
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
        Edit Paket
      </button>
      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h3 className="font-bold  text-lg">Update {paket.namaPaket}</h3>
          <form onSubmit={handleUpdate}>
            <div className="form-control w-full">
              <label className="label font-bold">Nama Paket</label>
              <input
                type="text"
                value={namaPaket}
                onChange={(e) => setNamaPaket(e.target.value)}
                className="input input-bordered"
                placeholder="masukan nama Paket"
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">Asal Komunitas</label>
              <input
                type="text"
                value={asalKomunitas}
                onChange={(e) => setAsalKomunitas(e.target.value)}
                className="input input-bordered"
                placeholder="masukan deskripsi singkat"
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">Nomor Telepon</label>
              <input
                type="text"
                value={nomorTelepon}
                onChange={(e) => setNomorTelepon(e.target.value)}
                className="input input-bordered"
                placeholder="price"
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">file gambar</label>
              <input
                type="text"
                value={gambarPaket}
                onChange={(e) => setGambarPaket(e.target.value)}
                className="input input-bordered"
                placeholder="masukan file gambar"
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

export default UpdatePaket;
