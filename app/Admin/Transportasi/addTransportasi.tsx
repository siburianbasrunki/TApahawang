"use client";
import { useState, SyntheticEvent } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
const addTransportasi = () => {
  const [nama, setNama] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [harga, setHarga] = useState("");
  const [gambar, setGambar] = useState("");
  const [ketersediaan, setKetersediaan] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await axios.post("/api/transportasi", {
      nama: nama,
      deskripsi: deskripsi,
      harga: Number(harga),
      gambar: gambar,
      ketersediaan: Number(ketersediaan),
    });
    setNama("");
    setDeskripsi("");
    setHarga("");
    setGambar("");
    setKetersediaan("");
    router.refresh();
    setIsOpen(false);
  };

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button className="btn" onClick={handleModal}>
        Add New
      </button>
      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h3 className="font-bold  text-lg">Add New Transportasi</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-control w-full">
              <label className="label font-bold">Nama Trasnportasi</label>
              <input
                type="text"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                className="input input-bordered"
                placeholder="masukan nama transportasi"
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
              <label className="label font-bold">Harga Sewa</label>
              <input
                type="text"
                value={harga}
                onChange={(e) => setHarga(e.target.value)}
                className="input input-bordered"
                placeholder="harga sewa"
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
              <label className="label font-bold">Jumlah Kursi</label>
              <input
                type="text"
                value={ketersediaan}
                onChange={(e) => setKetersediaan(e.target.value)}
                className="input input-bordered"
                placeholder="masukan jumlah Kursi"
              />
            </div>
            <div className="modal-action">
              <button type="button" className="btn" onClick={handleModal}>
                Close
              </button>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default addTransportasi;
