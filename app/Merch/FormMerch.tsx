"use client";

import Image from "next/image";
import { useState, useEffect, SyntheticEvent } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import axios from "axios";

interface MerchData {
  id: string;
  nama: string;
  deskripsi: string;
  harga: number;
  gambar: string;
}

interface FormVMerchProps {
  selectedMerch: MerchData | null;
}

const FormMerch: React.FC<FormVMerchProps> = ({ selectedMerch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [nama, setNama] = useState("");
  const [tanggalPembelian, setTanggalPembelian] = useState("");
  const [buktiTranfer, setBuktiTranfer] = useState<File | null>(null);
  const [jumlahBarang, setJumlahBarang] = useState("");
  const [totalHarga, setTotalHarga] = useState("");
  const [noTelepon, setNoTelepon] = useState("");
  const [alamat, setAlamat] = useState("");
  const router = useRouter();

  const handleTotalHarga = (jumlahBarang: string) => {
    const hargaMerchandise = selectedMerch?.harga || 0;
    const jumlahBarangInt = parseInt(jumlahBarang, 10) || 0;

    const total = hargaMerchandise * jumlahBarangInt;
    setTotalHarga(
      total.toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
      })
    );
  };

  const handleJumlahBarangChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newJumlahBarang = e.target.value;
    setJumlahBarang(newJumlahBarang);
    handleTotalHarga(newJumlahBarang);
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (!selectedMerch?.id) {
      console.error("invalid id merch");
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

      await axios.post("api/merchandise/pembelian", {
        tanggalPembelian: tanggalPembelian,
        buktiTranfer: data.data.secure_url,
        nama: nama,
        noTelepon: noTelepon,
        userId: userId,
        merchandiseId: selectedMerch?.id,
        jumlahBarang: Number(jumlahBarang),
        totalHarga: Number(totalHarga),
        Alamat: alamat,
      });

      setNama("");
      setBuktiTranfer(null);
      setJumlahBarang("");
      setNoTelepon("");
      setTanggalPembelian("");
      setTotalHarga("");
      Swal.fire({
        icon: "success",
        title: "PO Merchandise Sukses",
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
        Order
      </button>

      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box bg-white rounded-md p-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-2xl">
              Formulir Order Merch Pahawang
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
          {selectedMerch && (
            <div className="mb-4 bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
              <div className=" mb-2">
                <h4 className="font-bold text-xl">{selectedMerch.nama}</h4>
                <h4 className="font-semibold italic text-xl">
                  {selectedMerch.harga.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </h4>
              </div>
              <div className="flex justify-center mb-2">
                <Image
                  src={selectedMerch.gambar}
                  alt={selectedMerch.nama}
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
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                className="input input-bordered"
                placeholder="Masukkan nama Anda"
              />
            </div>
            <div className="form-control">
              <label className="label font-bold" htmlFor="telepon">
                Nomor Telepon
              </label>
              <input
                type="number"
                id="telepon"
                value={noTelepon}
                onChange={(e) => setNoTelepon(e.target.value)}
                className="input input-bordered"
                placeholder="Masukkan Nomor Akti Anda"
              />
            </div>
            <div className="form-control">
              <label className="label font-bold" htmlFor="nama">
                Alamat Pengiriman
              </label>
              <input
                type="text"
                id="alamat"
                value={alamat}
                onChange={(e) => setAlamat(e.target.value)}
                className="input input-bordered"
                placeholder="Masukkan Alamat Rumah"
              />
            </div>
            <div className="form-control">
              <label className="label font-bold" htmlFor="noTelepon">
                Tanggal Pembelian
              </label>
              <input
                type="date"
                id="tanggalpembelian"
                value={tanggalPembelian}
                onChange={(e) => setTanggalPembelian(e.target.value)}
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label font-bold" htmlFor="jumlahbarang">
                Jumlah Barang Yang Dipesan
              </label>
              <input
                type="number"
                id="jumlahbarang"
                value={jumlahBarang}
                onChange={handleJumlahBarangChange}
                className="input input-bordered"
                placeholder="Masukkan Jumlah Barang "
              />
            </div>
            <div>
              <label className="label font-bold" htmlFor="jumlahbarang">
                Total Harga
              </label>
              <div className="flex items-center">
                <span className="text-lg mr-2">{totalHarga}</span>
              </div>
            </div>
            <div className="form-control">
              <label className="label font-bold" htmlFor="buktiPembayaran">
                Upload Bukti Pembayaran
              </label>
              <div className="file-input-wrapper">
                <input
                  type="file"
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

export default FormMerch;
