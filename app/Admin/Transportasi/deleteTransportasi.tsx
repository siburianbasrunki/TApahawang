"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

type Transportasi = {
  id: string;
  nama: string;
  deskripsi: string;
  harga: number;
  gambar: string;
  ketersediaan: number;
};
const DeleteTransportasi = ({
  transportasi,
}: {
  transportasi: Transportasi;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const handleDelete = async (villaId: string) => {
    setIsLoading(true);

    try {
      await axios.delete(`/api/transportasi/${villaId}`);
      router.refresh();
      setIsOpen(false);
    } catch (error) {
      console.error("Error during deletion:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button className="btn bg-red-500 " onClick={handleModal}>
        Delete
      </button>
      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h3 className="font-bold  text-lg">
            Yakin hapus {transportasi.nama} ?
          </h3>

          <div className="modal-action">
            <button
              type="button"
              className="btn bg-red-500"
              onClick={handleModal}
            >
              No
            </button>
            <button
              className={`btn btn-success ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              type="button"
              onClick={() => handleDelete(transportasi.id)}
              disabled={isLoading}
            >
              {isLoading ? "Deleting..." : "Yes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteTransportasi;
