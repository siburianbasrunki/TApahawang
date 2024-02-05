"use client";
import React, { useEffect, useState, SyntheticEvent } from "react";
import type { TerumbuKarang } from "@prisma/client";
import { useRouter } from "next/navigation";
import axios from "axios";
import Swal from "sweetalert2";

const AddDonasi = ({ karangs }: { karangs: TerumbuKarang[] }) => {
  const [jlhDonasi, setJlhDonasi] = useState("");
  const [bukti, setBukti] = useState<File | null>(null);
  const [telepon, setTelepon] = useState("");
  const [terumbuKarang, setTerumbuKarang] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true); 

    try {
      const gambar_karang = karangs.find((karang) => karang.id === terumbuKarang);

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
        gambar: gambar_karang?.gambar,
      });

      setTerumbuKarang("");
      setJlhDonasi("");
      setBukti(null);
      setTelepon("");
      router.refresh();
      setIsOpen(false);

      Swal.fire({
        icon: "success",
        title: "Donasi Berhasil!",
        text: "Informasi Selanjutnya Akan Dikirim Melalui WhatsApp. Cek riwayat donasi Anda di profil.",
      });
    } catch (error) {
      console.error("Error during submission:", error);
      Swal.fire({
        icon: "error",
        title: "Donasi Gagal!",
        text: "Terjadi kesalahan saat mengirim donasi. Silakan coba lagi.",
      });
    } finally {
      setIsLoading(false); 
    }
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
              <label className="label font-bold">Nomor Rekening :</label>
              <p className="text-md text-semibold">
                4100301083554 ( Bank Lampung) a.n HERWIN
              </p>
              <label className="label font-bold">
                Bukti Pembayaran (image)
              </label>
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
              <button
                type="submit"
                className={` bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark focus:outline-none focus:ring focus:ring-primary focus:ring-opacity-50 ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isLoading}
              >
                {isLoading ? "Data sedang dikirim, harap tunggu...." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddDonasi;
