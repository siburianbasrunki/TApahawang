"use client";
import Image from "next/image";
import React, { useState, useEffect, SyntheticEvent } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import axios from "axios";
interface TransportData {
  id: string;
  nama: string;
  harga: number;
  gambar: string;
}

interface FormTransportBookingProps {
  selectedTransport: TransportData | null;
}

const FormTransportBooking: React.FC<FormTransportBookingProps> = ({
  selectedTransport,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [nama, setNama] = useState("");
  const [tanggalCheckin, setTanggalCheckin] = useState("");
  const [buktiTranfer, setBuktiTranfer] = useState<File | null>(null);
  const [jumlahPenumpang, setJumlahPenumpang] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [noTelepon, setNoTelepon] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    if (!selectedTransport?.id) {
      console.error("invalid villaId");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", buktiTranfer as File);
      formData.append("upload_preset", "buktipembayaran");

      const data = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      );
      const tanggalBooking = new Date().toISOString();

      await axios.post("/api/transportasi/booking", {
        tanggalCheckin: tanggalCheckin,
        buktiTranfer: data.data.secure_url,
        nama: nama,
        noTelepon: noTelepon,
        userId: userId,
        transportasiId: selectedTransport?.id,
        jumlahPenumpang: Number(jumlahPenumpang),
        tanggalBooking: tanggalBooking,
      });

      setNama("");
      setTanggalCheckin("");
      setBuktiTranfer(null);
      setNoTelepon("");
      setJumlahPenumpang("");
      Swal.fire({
        icon: "success",
        title: "Pesan Tranportasi Berhasil",
        text: "Info Pemesanan Akan di Kirim Lewat Nomor WhatsApp Anda",
      });

      router.refresh();
      setIsOpen(false);
    } catch (error) {
      console.error("Error during booking:", error);

      Swal.fire({
        icon: "error",
        title: "Pemesanan Gagal",
        text: "Cek Apakah Anda sudah Login Atau Daftar Akun",
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
        Booking
      </button>
      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box bg-white rounded-md p-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-2xl">
              Formulir Booking Transportasi
            </h3>
            <button
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
              onClick={handleModal}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          {selectedTransport && (
            <div className="mb-4 bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
              <div className="mb-2">
                <h4 className="font-bold text-xl">{selectedTransport.nama}</h4>
                <h4 className="font-semibold italic text-xl">
                  {selectedTransport.harga.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </h4>
              </div>
              <div className="flex justify-center mb-2">
                <Image
                  src={selectedTransport.gambar}
                  alt={selectedTransport.nama}
                  height={100}
                  width={100}
                  className="rounded-md"
                />
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label font-bold" htmlFor="nama">
                Nama
              </label>
              <input
                type="text"
                id="nama"
                className="input input-bordered"
                placeholder="Masukkan nama Anda"
                required
                value={nama}
                onChange={(e) => setNama(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label font-bold" htmlFor="noTelepon">
                Nomor Yang Bisa Dihubungi
              </label>
              <input
                type="number"
                id="noTelepon"
                required
                className="input input-bordered"
                placeholder="Masukkan Nomor Telepon atau WhatsApp"
                value={noTelepon}
                onChange={(e) => setNoTelepon(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label font-bold" htmlFor="penumpang">
                Jumlah Penumpang
              </label>
              <input
                type="number"
                id="jlhpenumpang"
                required
                className="input input-bordered"
                placeholder="Masukkan jumlah orang yang akan berangkat"
                value={jumlahPenumpang}
                onChange={(e) => setJumlahPenumpang(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label font-bold" htmlFor="checkIn">
                Tanggal Booking
              </label>
              <input
                type="date"
                id="checkIn"
                required
                className="input input-bordered"
                value={tanggalCheckin}
                onChange={(e) => setTanggalCheckin(e.target.value)}
              />
            </div>

            <div className="form-control">
              <label className="label font-bold">Nomor Rekening :</label>
              <p className="text-md text-semibold">
                4100301083554 ( Bank Lampung) a.n HERWIN
              </p>
              <label className="label font-bold" htmlFor="buktiPembayaran">
                Upload Bukti Pembayaran
              </label>
              <div className="file-input-wrapper">
                <input
                  type="file"
                  required
                  id="buktiPembayaran"
                  className="file-input"
                  onChange={(e) => setBuktiTranfer(e.target.files?.[0] || null)}
                />
              </div>
            </div>

            <div className="modal-action mt-6">
              <button
                type="button"
                className="btn btn-secondary mr-2"
                onClick={handleModal}
              >
                Tutup
              </button>
              <button
                type="submit"
                className={`btn btn-primary ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isLoading}
              >
                {isLoading ? "Sedang Diproses" : "Pesan"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormTransportBooking;
