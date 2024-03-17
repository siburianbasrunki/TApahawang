"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FiRefreshCcw } from "react-icons/fi";
import LaporanVilla from "./laporanvilla";
import dynamic from "next/dynamic";
const DynamicPDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then((module) => module.PDFDownloadLink),
  { ssr: false }
);

interface BookingVillaData {
  id: string;
  villaId: string;
  tanggalCheckin: string;
  tanggalCheckout: string;
  bukti: string;
  userId: string;
  totalbayar: string;
}
interface BookingVillaResponse {
  bookings: BookingVillaData[];
}

const SkeletonTable = () => {
  return (
    <div className="animate-pulse bg-gray-200 p-4 rounded mb-4 w-full">
      <table className="w-full">
        <thead className="bg-gray-50 text-gray-700 uppercase">
          <tr>
            <th className="px-4 py-3 text-left">Villa ID</th>
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

const BookingVilla = () => {
  const [bookingVillas, setBookingVillas] = useState<BookingVillaData[]>([]);

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [validationStatus, setValidationStatus] = useState<
    Record<string, string>
  >({});

  const fetchData = async () => {
    try {
      const res = await fetch("/api/villas/booking");
      const json = await res.json();
      setBookingVillas(json.bookings);
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
      await fetch("/api/villas/booking", {
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

  return (
    <div>
      <div className="bg-white shadow-md rounded-md p-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold mb-4">Data Booking Villa</h1>
          </div>
          <div className="flex justify-end items-center gap-4 mb-4">
            <div
              className="text-2xl cursor-pointer text-green-700 flex items-center gap-x-2 "
              onClick={handleRefreshClick}
            >
              <div>
                <small>refresh data</small>
              </div>
              <div>
                <FiRefreshCcw />
              </div>
            </div>
          </div>
        </div>

        {bookingVillas.length > 0 ? (
          <div>
            <table className="w-full overflow-x-auto">
              <thead className="bg-gray-50 text-gray-700 uppercase">
                <tr>
                  <th className="px-4 py-3 text-left">Villa ID</th>
                  <th className="px-4 py-3 text-left">Id Pemesan</th>
                  <th className="px-4 py-3 text-left">Check In</th>
                  <th className="px-4 py-3 text-left">Check Out</th>
                  <th className="px-4 py-3 text-left">Bukti Pembayaran</th>
                  <th className="px-4 py-3 text-left">Total Pembayaran</th>
                  <th className="px-4 py-3 text-left">Validasi Pembayaran</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {bookingVillas.map((booking, index) => (
                  <tr key={index} className="border-b border-gray-200">
                    <td className="px-4 py-3 whitespace-no-wrap text-gray-700">
                      {booking.villaId}
                    </td>
                    <td className="px-4 py-3 whitespace-no-wrap text-gray-700">
                      {booking.userId}
                    </td>
                    <td className="px-4 py-3 whitespace-no-wrap text-gray-700">
                      {booking.tanggalCheckin}
                    </td>
                    <td className="px-4 py-3 whitespace-no-wrap text-gray-700">
                      {booking.tanggalCheckout}
                    </td>
                    <td className="px-4 py-3 whitespace-no-wrap text-gray-700">
                      <img
                        src={booking.bukti}
                        alt="Villa Image"
                        width={100}
                        height={100}
                      />
                    </td>
                    <td className="px-4 py-3 whitespace-no-wrap text-gray-700">
                      {booking.totalbayar}
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
          <div className="animate-pulse bg-gray-200 p-4 rounded mb-4 w-full">
            <table className="w-full">
              <thead className="bg-gray-50 text-gray-700 uppercase">
                <tr>
                  <th className="px-4 py-3 text-left">Villa ID</th>
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
        )}
      </div>
    </div>
  );
};

export default BookingVilla;
