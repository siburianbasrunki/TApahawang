import Image from "next/image";
import React, { useState, useEffect, SyntheticEvent } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

interface VillaData {
  id: string;
  nama: string;
  deskripsi: string;
  hargaPerMalam: number;
  gambar: string;
}

interface FormVillaBookingProps {
  selectedVilla: VillaData | null;
}

const FormVillaBooking: React.FC<FormVillaBookingProps> = ({
  selectedVilla,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [nama, setNama] = useState("");
  const [tanggalCheckin, setTanggalCheckin] = useState("");
  const [tanggalCheckout, setTanggalCheckout] = useState("");
  const [bukti, setBukti] = useState<File | null>(null);
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [totalBayar, setTotalBayar] = useState("");
  const [jumlahHari, setJumlahHari] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!selectedVilla?.id) {
      console.error("Invalid villaId");
      setIsLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", bukti as File);
      formData.append("upload_preset", "buktipembayaran");

      const data = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      );

      await axios.post("/api/villas/booking", {
        villaId: selectedVilla?.id,
        tanggalCheckin: tanggalCheckin,
        tanggalCheckout: tanggalCheckout,
        bukti: data.data.secure_url,
        nama: nama,
        userId: userId,
        totalbayar: totalBayar,
      });

      setNama("");
      setTanggalCheckin("");
      setTanggalCheckout("");
      setBukti(null);
      setAlertSuccess(true);
      setTotalBayar("");
      Swal.fire({
        icon: "success",
        title: "Pesan Villa Berhasil",
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

  const hitungJumlahHari = () => {
    const checkinDate = new Date(tanggalCheckin);
    const checkoutDate = new Date(tanggalCheckout);
    const differenceInTime = checkoutDate.getTime() - checkinDate.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);
    setJumlahHari(differenceInDays);
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

  useEffect(() => {
    hitungJumlahHari();
  }, [tanggalCheckin, tanggalCheckout]);

  useEffect(() => {
    if (selectedVilla) {
      const hargaPerMalam = selectedVilla.hargaPerMalam;
      const total = hargaPerMalam * jumlahHari;
      setTotalBayar(
        total.toLocaleString("id-ID", {
          style: "currency",
          currency: "IDR",
        })
      );
    }
  }, [jumlahHari, selectedVilla]);

  return (
    <div>
      <button className="btn btn-primary" onClick={handleModal}>
        Pesan Villa
      </button>

      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box bg-white rounded-md p-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-2xl">Formulir Pesan Villa</h3>
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

          {selectedVilla && (
            <div className="mb-4 bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
              <div className="mb-2">
                <h4 className="font-bold text-xl">{selectedVilla.nama}</h4>
                <h4 className="font-semibold italic text-xl">
                  {selectedVilla.hargaPerMalam.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </h4>
              </div>
              <div className="flex justify-center mb-2">
                <Image
                  src={selectedVilla.gambar}
                  alt={selectedVilla.nama}
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
                value={nama}
                onChange={(e) => setNama(e.target.value)}
              />
            </div>

            <div className="form-control">
              <label className="label font-bold" htmlFor="checkIn">
                Tanggal Check In
              </label>
              <input
                type="date"
                id="checkIn"
                className="input input-bordered"
                value={tanggalCheckin}
                onChange={(e) => setTanggalCheckin(e.target.value)}
              />
            </div>

            <div className="form-control">
              <label className="label font-bold" htmlFor="checkOut">
                Tanggal Check Out
              </label>
              <input
                type="date"
                id="checkOut"
                className="input input-bordered"
                value={tanggalCheckout}
                onChange={(e) => setTanggalCheckout(e.target.value)}
              />
            </div>
            <div>
              <label className="label font-bold" htmlFor="jumlahbarang">
                Total Harga
              </label>
              <div className="flex items-center">
                <span className="text-lg mr-2">{totalBayar}</span>
              </div>
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
                  id="buktiPembayaran"
                  className="file-input"
                  onChange={(e) => setBukti(e.target.files?.[0] || null)}
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

export default FormVillaBooking;
