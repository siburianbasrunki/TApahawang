"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
type terumbuKarang = {
  id: string;
  nama: string;
  deskripsi: string;
};
const DeleteKarang = ({ karang }: { karang: terumbuKarang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const handleDelete = async (karangId: string) => {
    await axios.delete(`/api/karang/${karangId}`);
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
          <h3 className="font-bold  text-lg">Yakin hapus {karang.nama} ?</h3>

          <div className="modal-action">
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleModal}
            >
              No
            </button>
            <button
              className="btn btn-success "
              type="button"
              onClick={() => handleDelete(karang.id)}
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteKarang;
