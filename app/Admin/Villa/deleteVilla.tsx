"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
type Villa = {
    id: string;
    nama: string;
    deskripsi: string;
    hargaPerMalam: number;
    gambar: string;
    ketersediaan: number;
}
const deleteVilla = ({villa} :{villa: Villa}) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const handleDelete = async (villaId: string) => {
    console.log(villaId)
    await axios.delete(`/api/villas/${villaId}`)
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
          <h3 className="font-bold  text-lg">Yakin hapus {villa.nama} ?</h3>

          <div className="modal-action">
            <button type="button" className="btn btn-danger" onClick={handleModal}>
              No
            </button>
            <button className="btn btn-success " type="button" onClick={() => handleDelete(villa.id)}>
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default deleteVilla;
