"use client"
import { useState } from "react";

const FormVillaBooking = () => {
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
        <div className="modal-box">
          <h3>Formulir Pesan Villa</h3>
          <h4>Nama Villa: Villa Name</h4>
          <h4>Harga Per Malam: Rp 1.000.000</h4>

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

            <div className="modal-action">
              <button type="button" className="btn" onClick={handleModal}>
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
