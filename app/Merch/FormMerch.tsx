"use client"

import Image from "next/image";
import { useState } from "react";
// import type { Merchandise } from "@prisma/client";
interface MerchData {
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

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button className="btn btn-primary" onClick={handleModal}>
        Order
      </button>

      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box bg-white rounded-md p-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-2xl">Formulir Order Merch Pahawang</h3>
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
                <Image src={selectedMerch.gambar} alt={selectedMerch.nama} height={100} width={100} className="rounded-md" />
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
              <label className="label font-bold" htmlFor="telepon">
                Nomor Telepon
              </label>
              <input
                type="number"
                id="telepon"
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
                className="input input-bordered"
                placeholder="Masukkan Alamat Rumah"
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

export default FormMerch;
