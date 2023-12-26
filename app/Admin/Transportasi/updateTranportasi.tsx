"use client";
import { useState, SyntheticEvent } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
type Transportasi ={
    id: string;
    nama: string;
    deskripsi: string;
    harga: number;
    gambar: string;
    ketersediaan: number;
}
const UpdateTranportasi = ({transportasi} : {transportasi:Transportasi}) => {
  const [nama, setNama] = useState(transportasi.nama);
  const [deskripsi, setDeskripsi] = useState(transportasi.deskripsi);
  const [harga, setHarga] = useState(transportasi.harga);
  const [gambar, setGambar] = useState(transportasi.gambar);
  const [ketersediaan, setKetersediaan] = useState(transportasi.ketersediaan);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const handleUpdate = async (e: SyntheticEvent) => {
    e.preventDefault();
    await axios.patch(`/api/transportasi/${transportasi.id}`, {
      nama: nama,
      deskripsi: deskripsi,
      harga: Number(harga),
      gambar: gambar,
      ketersediaan: Number(ketersediaan),
    });
    
    router.refresh();
    setIsOpen(false);
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
          <h3 className="font-bold  text-lg">Update {transportasi.nama}</h3>
          <form onSubmit={handleUpdate}>
            <div className="form-control w-full">
              <label className="label font-bold">Nama Transportasi</label>
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
                onChange={(e) => setHarga(Number(e.target.value))}
                className="input input-bordered"
                placeholder="price"
              />
            </div>
            {/* <div className="form-control w-full">
              <label className="label font-bold">file gambar</label>
              <input
                type="text"
                value={gambar}
                onChange={(e) => setGambar(e.target.value)}
                className="input input-bordered"
                placeholder="masukan file gambar"
              />
            </div> */}
            <div className="form-control w-full">
              <label className="label font-bold">Jumlah kursi</label>
              <input
                type="text"
                value={ketersediaan}
                onChange={(e) => setKetersediaan(Number(e.target.value))}
                className="input input-bordered"
                placeholder="masukan jumlah kursi"
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

export default UpdateTranportasi;
