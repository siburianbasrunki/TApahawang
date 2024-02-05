"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
type Galery = {
  id: string;
  title: string;
  deskripsi: string;
  gambar: string;
  tanggal: Date;
};

const DeleteGalery = ({ galeri }: { galeri: Galery }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleDelete = async (GaleryId: string) => {
    setIsLoading(true);

    try {
      await axios.delete(`/api/galery/${GaleryId}`);
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
      <button className="btn btn-error " onClick={handleModal}>
        Delete
      </button>
      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h3 className="font-bold  text-lg">Yakin hapus {galeri.title} ?</h3>

          <div className="modal-action">
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleModal}
            >
              No
            </button>
            <button
              className={`btn btn-success ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              type="button"
              onClick={() => handleDelete(galeri.id)}
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

export default DeleteGalery;
