"use client";
// Importing necessary modules and components
import { useEffect, useState } from "react";
import { NextPage } from "next";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";

const ProfilePage: NextPage = () => {
  const [session, setSession] = useState(null);
  const [userId, setUserId] = useState("");
  const [showBookingHistory, setShowBookingHistory] = useState(true);
  const [dataDonasi, setDataDonasi] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const fetchData = async () => {
    const sessionData = await fetch("/api/auth/session").then((res) =>
      res.json()
    );
    setUserId(sessionData.id);
    setSession(sessionData);
  };

  const fetcDataDonasi = async (userId: string) => {
    const data_donasi = await axios.post("/api/donasi/user", {
      userId: userId,
    });
    setDataDonasi([...data_donasi.data.donasis]);
    console.log(data_donasi.data.donasis);
  };

  useEffect(() => {
    fetchData();
    fetcDataDonasi(userId);
  }, [userId]);

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-blue-500 text-2xl font-bold">
          Anda belum masuk. Silahkan Login atau Daftar Akun.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-screen-md mx-auto">
      <div className="bg-blue-500 p-4 text-white text-center w-full">
        <h1 className="text-2xl font-bold">Profile Page</h1>
        <p>Welcome, {session.user ? session.user.name : "Guest"}!</p>
      </div>
      <div className="mt-4">
        <div className="flex justify-around">
          <button
            className={`px-4 py-2 focus:outline-none ${
              showBookingHistory
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-blue-500"
            }`}
            onClick={() => setShowBookingHistory(true)}
          >
            Riwayat Booking
          </button>
          <button
            className={`px-4 py-2 focus:outline-none ${
              !showBookingHistory
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-blue-500"
            }`}
            onClick={() => setShowBookingHistory(false)}
          >
            Riwayat Donasi
          </button>
        </div>
        <div className="mt-4">
          {showBookingHistory ? (
            <div className="bg-white p-4 rounded shadow">
              <p>Riwayat Booking</p>
            </div>
          ) : (
            <div className="bg-white p-4 rounded shadow">
              <p className="text-2xl font-bold mb-4">Riwayat Donasi</p>
              {dataDonasi.length > 0 &&
                dataDonasi.map((donasi) => (
                  <div
                    key={donasi.id}
                    className="bg-base-200 mb-4 p-4 sm:p-6 lg:p-8"
                  >
                    <div className="flex flex-col md:flex-row">
                      <Image
                        src={donasi.gambar}
                        alt="gambarkarang"
                        className="max-w-md md:max-w-xs lg:max-w-md rounded-lg shadow-2xl mb-4 md:mb-0 items-center flex"
                        width={isMobile ? 200 : 300}
                        height={isMobile ? 200 : 300}
                      />
                      <div className="flex-1 p-4">
                        <p className="text-xl md:text-2xl lg:text-xl font-bold mb-4">
                          ID Donasi: {donasi.id}
                        </p>
                        <p className="text-lg py-2">
                          <span className="font-semibold">Jumlah Donasi:</span>
                          {donasi.jumlahDonasi.toLocaleString("id-ID", {
                            style: "currency",
                            currency: "IDR",
                          })}
                          <br />
                          <span className="font-semibold">
                            Terumbu Karang ID:
                          </span>{" "}
                          {donasi.terumbuKarangId}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
