"use client";
// Importing necessary modules and components
import { useEffect, useState } from "react";
import { NextPage } from "next";
import { useSession } from "next-auth/react";

const ProfilePage: NextPage = () => {
  const [session, setSession] = useState(null);
  const [showBookingHistory, setShowBookingHistory] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const sessionData = await fetch("/api/auth/session").then((res) => res.json());
      setSession(sessionData);
    };

    fetchData();
  }, []);

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
              showBookingHistory ? "bg-blue-500 text-white" : "bg-gray-300 text-blue-500"
            }`}
            onClick={() => setShowBookingHistory(true)}
          >
            Riwayat Booking
          </button>
          <button
            className={`px-4 py-2 focus:outline-none ${
              !showBookingHistory ? "bg-blue-500 text-white" : "bg-gray-300 text-blue-500"
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
              <p>Riwayat Donasi</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
