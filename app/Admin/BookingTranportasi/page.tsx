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
  const [currentPage, setCurrentPage] = useState(1);
  const [BookingPerPage] = useState(4);
  const [searchQuery, setSearchQuery] = useState("");

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
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
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
  const filteredBooking = bookingTransportasis
    ? bookingTransportasis.bookings.filter(
        (bookingTransport) =>
          bookingTransport.nama
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          bookingTransport.id.includes(searchQuery)
      )
    : [];
  const indexofLastBooking = currentPage * BookingPerPage;
  const indexOfFirstBooking = indexofLastBooking - BookingPerPage;
  const currentBooking = filteredBooking.slice(
    indexOfFirstBooking,
    indexofLastBooking
  );
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
            <button className="btn" onClick={downloadPDF}>
              <IoMdDownload />
              Export PDF
            </button>
          </div>
        </div>
        <div>
          <label className="input input-bordered flex items-center gap-2 mt-4 mb-4">
            <input
              type="text"
              className="grow w-96"
              placeholder="Cari pesanan berdasarkan nama atau id pesanan"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
        </div>
        {bookingTransportasis ? (
          <div>
            <table className="w-full overflow-x-auto rounded-lg">
              <thead className="bg-gray-50 text-gray-700 capitalize rounded-lg">
                <tr>
                  <th className="px-4 py-3 text-center text-sm">
                    Transportasi ID
                  </th>
                  <th className="px-4 py-3 text-center text-sm">
                    Nama Pemesan
                  </th>
                  <th className="px-4 py-3 text-center text-sm">Check In</th>
                  <th className="px-4 py-3 text-center text-sm">
                    Jumlah Penumpang
                  </th>
                  <th className="px-4 py-3 text-center text-sm">
                    Nomor Telepon
                  </th>
                  <th className="px-4 py-3 text-center text-sm">
                    Bukti Pembayaran
                  </th>
                  <th className="px-4 py-3 text-center text-sm">
                    Validasi Pembayaran
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {currentBooking.map((booking, index) => (
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
            <div className="mt-4 flex justify-center">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="btn btn-sm bg-gray-300 px-3 py-1 mr-2"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={
                  indexofLastBooking >= bookingTransportasis.bookings.length
                }
                className="btn btn-sm bg-gray-300 px-3 py-1"
              >
                Next
              </button>
            </div>
          </div>
        ) : (
          <SkeletonTable />
        )}
      </div>
    </div>
  );
};

export default BookingTransportasi;
