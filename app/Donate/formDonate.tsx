"use client";
import { useState, SyntheticEvent } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { prisma } from "@/lib/prisma";

const getTerumbu = async () => {
    const res = await prisma.terumbuKarang.findMany();
    return res;
  };
const formDonate = () => {
  const [terumbuKarang, setTerumbu] = useState("");
  const [jlhDonasi, setJlhDonasi] = useState("");
  const [tglDonasi, setTglDonasi] = useState("");
  const [bukti, setBukti] = useState("");
  const [telepon, setTelepon] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const hadleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await axios.post("/api/donasi", {
      terumbuKarangId: terumbuKarang,
      jumlahDonasi: jlhDonasi,
      tanggalDonasi: tglDonasi,
      buktiPembayaran: bukti,
      nomortelepon: telepon,
    });
    setTerumbu("");
    setJlhDonasi("");
    setTglDonasi("");
    setBukti("");
    setTelepon("");
    router.refresh();
    setIsOpen(false);
  };
  const handleModal = () => {
    setIsOpen(!isOpen);
  };
  

  return (
    <>
      <div>
        <button className="btn btn-primary" onClick={handleModal}>
          Ayo Donasi{" "}
        </button>
        <div className={isOpen ? "modal modal-open" : "modal"}>
          <div className="modal-box">
            <h3>Form Donasi Terumbu Karang</h3>
            <form onSubmit={hadleSubmit}>
              <div className="form-control w-full">
                <label className="label font-bold">Pilih Terumbu Karang</label>
                <select className="select select-bordered w-full max-w-xs">
                  <option disabled selected>
                    Pilih Terumbu Karang
                  </option>
                  <option>terumbu karang 1</option>
                  <option>Terumbu Karang 2</option>
                </select>
              </div>
              <div className="form-control w-full">
                <label className="label font-bold">
                  Jumlah Donasi (Rupiah)
                </label>
                <input
                  type="text"
                  value={jlhDonasi}
                  onChange={(e) => setJlhDonasi(e.target.value)}
                  className="input input-bordered"
                  placeholder="masukan jumlah donasi "
                />
              </div>
              <div className="form-control w-full">
                <label className="label font-bold">Tanggal Donasi </label>
                <input
                  type="date"
                  value={tglDonasi}
                  onChange={(e) => setTglDonasi(e.target.value)}
                  className="input input-bordered"
                />
              </div>
              <div className="form-control w-full">
                <label className="label font-bold">Telepon </label>
                <input
                  type="text"
                  value={telepon}
                  onChange={(e) => setTelepon(e.target.value)}
                  className="input input-bordered"
                  placeholder="masukan nomor telepon"
                />
              </div>
              <div className="form-control w-full">
                <label className="label font-bold">file butki pembayaran</label>
                <input
                  type="text"
                  value={bukti}
                  onChange={(e) => setBukti(e.target.value)}
                  className="input input-bordered"
                  placeholder="masukan file gambar"
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
    </>
  );
};

export default formDonate;
