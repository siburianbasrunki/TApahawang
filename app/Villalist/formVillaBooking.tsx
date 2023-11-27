"use client"

import Image from "next/image";
import { useState } from "react";

interface VillaData {
  nama: string;
  deskripsi: string;
  hargaPerMalam: number;
  gambar: string;
}

interface FormVillaBookingProps {
  selectedVilla: VillaData | null;
}

const FormVillaBooking: React.FC<FormVillaBookingProps> = ({ selectedVilla }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

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
              <div className=" mb-2">
                <h4 className="font-bold text-xl">{selectedVilla.nama}</h4>
                <h4 className="font-semibold italic text-xl">
                  {selectedVilla.hargaPerMalam.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </h4>
              </div>
              <div className="flex justify-center mb-2">
                <Image src={selectedVilla.gambar} alt={selectedVilla.nama} height={100} width={100} className="rounded-md" />
              </div>
              
            </div>

          )}
          <form>
            <div className="form-control">
              <label className="label font-bold" htmlFor="nama">
                Nama
              </label>
              <input
                type="text"
                id="nama"
                className="input input-bordered"
                placeholder="Masukkan nama Anda"
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
              />
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
              <button type="button" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormVillaBooking;
