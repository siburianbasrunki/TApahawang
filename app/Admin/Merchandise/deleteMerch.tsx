"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

type Merchandise = {
    id: string;
    nama: string;
    deskripsi: string;
    harga: number;
    gambar: string;
    ketersediaan: number;
}
const deleteMerch = ({merch} :{merch: Merchandise}) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const handleDelete = async (MerchId: string) => {
    await axios.delete(`/api/merchandise/${MerchId}`)
    router.refresh();
    setIsOpen(false);
  };

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button className="btn btn-error " onClick={handleModal}>
        Delete
      </button>
      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h3 className="font-bold  text-lg">Yakin hapus {merch.nama} ?</h3>

          <div className="modal-action">
            <button type="button" className="btn btn-danger" onClick={handleModal}>
              No
            </button>
            <button className="btn btn-success " type="button" onClick={() => handleDelete(merch.id)}>
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default deleteMerch;
