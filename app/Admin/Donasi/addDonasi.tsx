"use client"
import React, { useEffect, useState, SyntheticEvent } from "react";
import type { TerumbuKarang } from "@prisma/client";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";

const AddDonasi = ({ karangs }: { karangs: TerumbuKarang[] }) => {
  const [jlhDonasi, setJlhDonasi] = useState("");
  const [bukti, setBukti] = useState<File | null>(null);
  const [telepon, setTelepon] = useState("");
  const [terumbuKarang, setTerumbuKarang] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [alertSuccess, setAlertSuccess] = useState(false); // State untuk alert
  const router = useRouter();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", bukti as File);
    formData.append("upload_preset", "buktipembayaran");
    const data = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      formData
    );

    await axios.post("/api/donasi", {
      terumbuKarangId: terumbuKarang,
      jumlahDonasi: jlhDonasi,
      buktiPembayaran: data.data.secure_url,
      nomortelepon: telepon,
      userId: userId,
    });

    setTerumbuKarang("");
    setJlhDonasi("");
    setBukti(null);
    setTelepon("");
    setAlertSuccess(true); // Menampilkan alert
    router.refresh();
    setIsOpen(false);
  };

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const fetchData = async () => {
      const sessionData = await fetch("/api/auth/session").then((res) =>
        res.json()
      );
      setUserId(sessionData.id);
    };

    fetchData();
  }, []);

  return (
    <div>
      <button className="btn btn-primary" onClick={handleModal}>
        Ayo Donasi{" "}
      </button>
      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Formulir Donasi Terumbu Karang</h3>

          <form onSubmit={handleSubmit}>
            <div className="form-control w-full">
              <label className="label font-bold">Total Donasi</label>
              <input
                type="text"
                className="input input-bordered"
                value={jlhDonasi}
                onChange={(e) => setJlhDonasi(e.target.value)}
                placeholder="jumlah donasi"
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">
                Bukti Pembayaran (image)
              </label>
              <p className="text-lg text-semibold mb-4 mt-4">
                Nomor Rekening : 123456789
              </p>
              <input
                type="file"
                className="input input-bordered"
                onChange={(e) => setBukti(e.target.files?.[0] || null)}
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">Nomor WhatsApp</label>
              <input
                type="text"
                className="input input-bordered"
                value={telepon}
                onChange={(e) => setTelepon(e.target.value)}
                placeholder="masukkan nomor telepon/WA"
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">Terumbu Karang </label>
              <select
                className="select select-bordered"
                value={terumbuKarang}
                onChange={(e) => setTerumbuKarang(e.target.value)}
              >
                <option value="" disabled>
                  Select Terumbu Karang
                </option>
                {karangs.map((karang) => (
                  <option value={karang.id} key={karang.id} className=" ">
                    {karang.nama}
                  </option>
                ))}
              </select>
            </div>
            <div className="modal-action">
              <button type="button" className="btn" onClick={handleModal}>
                Close
              </button>
              <button type="submit" className="btn btn-primary">
                Simpan
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Alert for Success */}
      {alertSuccess && (
        <div role="alert" className="alert alert-success">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>
            Donasi Berhasil, Informasi Selanjutnya Akan Dikirim Melalui WhatsApp.Cek riwayat donasi Anda di profile
          </span>
        </div>
      )}
    </div>
  );
};

export default AddDonasi;
