"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
type Paket = {
    id: string;
    namaPaket: string
    asalKomunitas: string
    nomorTelepon: string
    gambarPaket: string
}
const DeletePaket = ({ paket }: { paket: Paket }) => {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const handleDelete = async (PaketId: string) => {
        await axios.delete(`/api/paket/${PaketId}`)
        router.refresh();
        setIsOpen(false);
    };

    const handleModal = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <button className="btn btn-error " onClick={handleModal}>
                Delete Paket
            </button>
            <div className={isOpen ? "modal modal-open" : "modal"}>
                <div className="modal-box">
                    <h3 className="font-bold  text-lg">Yakin hapus {paket.namaPaket} ?</h3>

                    <div className="modal-action">
                        <button type="button" className="btn btn-danger" onClick={handleModal}>
                            No
                        </button>
                        <button className="btn btn-success " type="button" onClick={() => handleDelete(paket.id)}>
                            Yes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeletePaket;
