"use client";
import { useState, SyntheticEvent } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

// Interface to describe the expected structure of Cloudinary response
interface CloudinaryResponse {
  secure_url: string;
  // Add other fields if necessary
}

const AddTransportasi = () => {
  const [nama, setNama] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [harga, setHarga] = useState("");
  const [gambar, setGambar] = useState<File | null>(null);
  const [ketersediaan, setKetersediaan] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("file", gambar as File);
    formData.append("upload_preset", "transportasi");

    try {
      const { data } = await axios.post<CloudinaryResponse>(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      );

      await axios.post("/api/transportasi", {
        nama: nama,
        deskripsi: deskripsi,
        harga: Number(harga),
        gambar: data.secure_url,
        ketersediaan: Number(ketersediaan),
      });

      setNama("");
      setDeskripsi("");
      setHarga("");
      setGambar(null);
      setKetersediaan("");
      router.refresh();
      setIsOpen(false);
    } catch (error) {
      console.error("Error during submission:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button className="btn" onClick={handleModal}>
        Add New
      </button>
      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add New Transportasi</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-control w-full">
              <label className="label font-bold">Nama Transportasi</label>
              <input
                type="text"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                className="input input-bordered"
                placeholder="Masukkan nama transportasi"
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">Deskripsi</label>
              <input
                type="text"
                value={deskripsi}
                onChange={(e) => setDeskripsi(e.target.value)}
                className="input input-bordered"
                placeholder="Masukkan deskripsi singkat"
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">Harga Sewa</label>
              <input
                type="text"
                value={harga}
                onChange={(e) => setHarga(e.target.value)}
                className="input input-bordered"
                placeholder="Harga sewa"
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">File Gambar</label>
              <input
                type="file"
                onChange={(e) => setGambar(e.target.files?.[0] || null)}
                className="input input-bordered"
                placeholder="Masukkan file gambar"
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">Jumlah Kursi</label>
              <input
                type="text"
                value={ketersediaan}
                onChange={(e) => setKetersediaan(e.target.value)}
                className="input input-bordered"
                placeholder="Masukkan jumlah kursi"
              />
            </div>
            <div className="modal-action">
              <button type="button" className="btn" onClick={handleModal}>
                Close
              </button>
              <button
                type="submit"
                className={`btn btn-primary ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isLoading}
              >
                {isLoading ? "Data sedang dikirim, harap tunggu...." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTransportasi;
