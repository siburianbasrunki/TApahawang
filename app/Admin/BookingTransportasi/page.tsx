"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FiRefreshCcw } from "react-icons/fi";

interface BookingTranportasiData {
  transportasiId: string;
  jumlahPenumpang: string;
  tanggalCheckin: string;
  userId: string;
  buktiTranfer: string;
  nama: string;
  noTelepon: string;
}

interface BookingTranportasiResponse {
  bookings: BookingTranportasiData[];
}
const SkeletonTable = () => {
  return (
    <div className="animate-pulse bg-gray-200 p-4 rounded mb-4 w-full">
      <table className="w-full">
        <thead className="bg-gray-50 text-gray-700 uppercase">
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

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="bg-white shadow-md rounded-md p-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold mb-4">Data Booking Transportasi</h1>
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

        {bookingTransportasis ? (
          <div>
            <table className="w-full overflow-x-auto">
              <thead className="bg-gray-50 text-gray-700 uppercase">
                <tr>
                  <th className="px-4 py-3 text-left">Villa ID</th>
                  <th className="px-4 py-3 text-left">Nama Pemesan</th>
                  <th className="px-4 py-3 text-left">Check In</th>
                  <th className="px-4 py-3 text-left">Jumlah Penumpang</th>
                  <th className="px-4 py-3 text-left">Nomor Telepon</th>
                  <th className="px-4 py-3 text-left">Bukti Pembayaran</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {bookingTransportasis.bookings.map((booking, index) => (
                  <tr key={index} className="border-b border-gray-200">
                    <td className="px-4 py-3 whitespace-no-wrap text-gray-700">
                      {booking.transportasiId}
                    </td>
                    <td className="px-4 py-3 whitespace-no-wrap text-gray-700">
                      {booking.nama}
                    </td>
                    <td className="px-4 py-3 whitespace-no-wrap text-gray-700">
                      {booking.tanggalCheckin}
                    </td>
                    <td className="px-4 py-3 whitespace-no-wrap text-gray-700">
                      {booking.jumlahPenumpang}
                    </td>
                    <td className="px-4 py-3 whitespace-no-wrap text-gray-700">
                      {booking.noTelepon}
                    </td>
                    <td className="px-4 py-3 whitespace-no-wrap text-gray-700">
                      <Image
                        src={booking.buktiTranfer}
                        alt="Villa Image"
                        width={100}
                        height={100}
                      />
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
