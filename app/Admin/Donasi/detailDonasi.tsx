// File: DetailDonasiModal.tsx
import React from "react";

interface DetailDonasiModalProps {
  selectedDonasi: DonasiData;
  onClose: () => void;
}

interface DonasiData {
  id: number;
  jumlahDonasi: number;
  nomortelepon: string;
  buktiPembayaran: string;
  terumbuKarang: {
    nama: string;
    gambar: string;
  };
  // Tambahkan properti lainnya sesuai kebutuhan
}

const DetailDonasiModal: React.FC<DetailDonasiModalProps> = ({
  selectedDonasi,
  onClose,
}) => {
  // Sesuaikan tampilan modal sesuai kebutuhan
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md">
        <h2 className="text-xl font-bold mb-4">Detail Donasi</h2>
        <p>ID: {selectedDonasi.id}</p>
        <p>Jumlah Donasi: Rp. {selectedDonasi.jumlahDonasi}</p>
        <p>Nomor WhatsApp: {selectedDonasi.nomortelepon}</p>
        {/* Tambahkan informasi lainnya sesuai kebutuhan */}
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
          onClick={onClose}
        >
          Tutup
        </button>
      </div>
    </div>
  );
};

export default DetailDonasiModal;
