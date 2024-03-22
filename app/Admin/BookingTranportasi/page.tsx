"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FiRefreshCcw } from "react-icons/fi";
import { IoMdDownload } from "react-icons/io";
import jsPDF from "jspdf";
import "jspdf-autotable";

interface BookingTranportasiData {
  id: string;
  transportasiId: string;
  jumlahPenumpang: string;
  tanggalCheckin: string;
  userId: string;
  buktiTranfer: string;
  nama: string;
  noTelepon: string;
  validasiPembayaran: boolean;
}

interface BookingTranportasiResponse {
  bookings: BookingTranportasiData[];
}

const SkeletonTable = () => {
  return (
    <div className="animate-pulse bg-gray-200 p-4 rounded mb-4 w-full">
      <table className="w-full">
        <thead className="bg-gray-50 text-gray-700 capitalize">
          <tr>
            <th className="px-4 py-3 text-left">Tranportasi ID</th>
            <th className="px-4 py-3 text-left">Tangal CheckIn</th>
            <th className="px-4 py-3 text-left">Tangal CheckOut</th>
            <th className="px-4 py-3 text-left">Bukti Pembayaran</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          <tr className="border-b border-gray-200">
            <td className="px-4 py-3 whitespace-no-wrap text-gray-700">
              Loading...
            </td>
            <td className="px-4 py-3 whitespace-no-wrap text-gray-700">
              Loading...
            </td>
            <td className="px-4 py-3 whitespace-no-wrap text-gray-700">
              Loading...
            </td>
            <td className="px-4 py-3 whitespace-no-wrap text-gray-700">
              Loading...
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const BookingTransportasi = () => {
  const [bookingTransportasis, setBookingTranportasis] =
    useState<BookingTranportasiResponse | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [validationStatus, setValidationStatus] = useState<
    Record<string, string>
  >({});

  const fetchData = async () => {
    try {
      const res = await fetch("/api/transportasi/booking");
      const json: BookingTranportasiResponse = await res.json();
      setBookingTranportasis(json);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleRefreshClick = () => {
    setIsRefreshing(true);
    fetchData();
  };

  const handleValidationChange = async (id: any, isValid: any) => {
    try {
      await fetch("/api/transportasi/booking", {
        method: "PUT",
        body: JSON.stringify({ id, isValid }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      setValidationStatus({ ...validationStatus, [id]: isValid });
    } catch (error) {
      console.error("Error updating validation status:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getRowClassName = (isValid: boolean) => {
    return isValid ? " " : "bg-red-400";
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Laporan Sewa Transportasi ", 10, 10);
    doc.autoTable({
      head: [
        [
          "Tranportasi ID",
          "Nama Pemesan",
          "Check In",
          "Jumlah Penumpang",
          "Nomor Telepon",
          "Validasi Pembayaran",
        ],
      ],
      body: bookingTransportasis?.bookings.map((booking) => [
        booking.transportasiId.slice(0, 5),
        booking.nama,
        booking.tanggalCheckin,
        booking.jumlahPenumpang,
        booking.noTelepon,
        booking.validasiPembayaran ? "Valid" : "Unvalid",
      ]),
    });
    doc.save("booking_transportasi.pdf");
  };

  return (
    <div>
      <div className="bg-white shadow-md rounded-md p-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold mb-4">
              Data Booking Transportasi
            </h1>
          </div>
          <div className="flex justify-end items-center gap-4 mb-4">
            <div
              className="text-2xl cursor-pointer text-black flex items-center gap-x-2 "
              onClick={handleRefreshClick}
            >
              <div>
                <small>refresh data</small>
              </div>
              <div>
                <FiRefreshCcw />
              </div>
            </div>
            <button
              className="btn"
              onClick={downloadPDF}
            >
              <IoMdDownload />
              Export PDF
            </button>
          </div>
        </div>
        {bookingTransportasis ? (
          <div>
            <table className="w-full overflow-x-auto rounded-lg">
              <thead className="bg-gray-50 text-gray-700 capitalize rounded-lg">
                <tr>
                  <th className="px-4 py-3 text-center text-sm">Villa ID</th>
                  <th className="px-4 py-3 text-center text-sm">Nama Pemesan</th>
                  <th className="px-4 py-3 text-center text-sm">Check In</th>
                  <th className="px-4 py-3 text-center text-sm">Jumlah Penumpang</th>
                  <th className="px-4 py-3 text-center text-sm">Nomor Telepon</th>
                  <th className="px-4 py-3 text-center text-sm">Bukti Pembayaran</th>
                  <th className="px-4 py-3 text-center text-sm">Validasi Pembayaran</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {bookingTransportasis.bookings.map((booking, index) => (
                  <tr
                    key={index}
                    className={`border-b border-gray-200 capitalize rounded-lg text-center ${getRowClassName(
                      booking.validasiPembayaran
                    )}`}
                  >
                    <td className="px-4 py-3 whitespace-no-wrap text-gray-700">
                      {booking.transportasiId.slice(0, 5)}
                    </td>
                    <td className="px-4 py-3 whitespace-no-wrap text-gray-700">
                      {booking.nama}
                    </td>
                    <td className="px-4 py-3 whitespace-no-wrap text-gray-700">
                      {booking.tanggalCheckin}
                    </td>
                    <td className="px-4 py-3 whitespace-no-wrap text-gray-700">
                      {booking.jumlahPenumpang} orang
                    </td>
                    <td className="px-4 py-3 whitespace-no-wrap text-gray-700">
                      {booking.noTelepon}
                    </td>
                    <td className="px-4 py-3 whitespace-no-wrap text-gray-700 ">
                      <Image
                        src={booking.buktiTranfer}
                        alt="Villa Image"
                        width={100}
                        height={100}
                        className="rounded-lg"
                      />
                    </td>
                    <td className="px-4 py-3 whitespace-no-wrap text-gray-700">
                      <select
                        value={validationStatus[booking.id] || ""}
                        onChange={(e) =>
                          handleValidationChange(booking.id, e.target.value)
                        }
                        className="select select-bordered w-full max-w-xs bg-blue-500 text-white"
                      >
                        <option value="" disabled>
                          Pilih
                        </option>
                        <option value="Valid">Valid</option>
                        <option value="Unvalid">Unvalid</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <SkeletonTable />
        )}
      </div>
    </div>
  );
};

export default BookingTransportasi;
