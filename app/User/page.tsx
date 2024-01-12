"use client";
import { useEffect, useState } from "react";
import { NextPage } from "next";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import dynamic from "next/dynamic";
import PdfTiketFile from "./pdftiketvilla";
// Import PDFDownloadLink dynamically (only on the client side)
const DynamicPDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then((module) => module.PDFDownloadLink),
  { ssr: false }
);
interface Donasi {
  id: string;
  user: string;
  terumbuKarangId: string;
  chatDonasi: string;
  buktiPembayaran: string;
  nomortelepon: string;
  terumbuKarang: string;
  tanggalDonasi: string;
  jumlahDonasi: string;
  userId: string;
  gambar: string;
}

interface BoVillas {
  id: string;
  villaId: string;
  tanggalCheckin: string;
  tanggalCheckout: string;
}

const ProfilePage: NextPage = () => {
  const [session, setSession] = useState<{ user: { name: string } } | null>(
    null
  );
  const [userId, setUserId] = useState("");
  const [showBookingHistory, setShowBookingHistory] = useState(true);
  const [dataBoVillas, setDataBoVillas] = useState<BoVillas[]>([]);
  const [dataDonasi, setDataDonasi] = useState<Donasi[]>([]);

  const fetchData = async () => {
    try {
      const sessionData = await fetch("/api/auth/session").then((res) =>
        res.json()
      );
      setUserId(sessionData.id);
      setSession(sessionData);
    } catch (error) {
      console.error("Error fetching session data:", error);
    }
  };

  const fetchDataDonasi = async (userId: string) => {
    try {
      const data_donasi = await axios.post("/api/donasi/user", {
        userId: userId,
      });
      setDataDonasi([...data_donasi.data.donasis]);
    } catch (error) {
      console.error("Error fetching donation data:", error);
    }
  };

  const fetchDataBoVillas = async (userId: string) => {
    try {
      const data_villa = await axios.post("/api/villas/user", {
        userId: userId,
      });
      setDataBoVillas([...data_villa.data.bovillas]);
    } catch (error) {
      console.error("Error fetching booking data:", error);
    }
  };
  function formatDate(dateString: string): string {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  }

  useEffect(() => {
    fetchData();
    fetchDataDonasi(userId);
    fetchDataBoVillas(userId);
  }, [userId]);

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-blue-500 text-2xl font-bold">
          Please Wait.... Sedang Cek Data
        </p>
      </div>
    );
  }

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="max-w-screen-md mx-auto">
        <div className="bg-blue-500 p-4 text-white text-center w-full">
          <h1 className="text-2xl font-bold">Profile Page</h1>
          <p>Selamat datang, {session?.user?.name || "Guest(belum Login)"}!</p>
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
                <h2 className="text-2xl font-bold mb-4">Riwayat Booking</h2>
                {dataBoVillas.length > 0 ? (
                  dataBoVillas.map((bovilla) => (
                    <div
                      key={bovilla.id}
                      className="bg-gray-100 mb-6 p-6 rounded-lg shadow-md"
                    >
                      <p className="text-lg font-semibold mb-2">
                        ID Villa: {bovilla.villaId}
                      </p>
                      <p className="mb-2">
                        Check-in: {formatDate(bovilla.tanggalCheckin)}
                      </p>
                      <p className="mb-4">
                        Check-out: {formatDate(bovilla.tanggalCheckout)}
                      </p>
                      <div className="flex justify-end">
                        <DynamicPDFDownloadLink
                          document={<PdfTiketFile bookingData={bovilla} />}
                          fileName="tiketvillapahawang"
                        >
                          {({ loading }) => (
                            <button
                              className={`px-4 py-2 bg-blue-500 text-white rounded ${
                                loading ? "opacity-50 cursor-not-allowed" : ""
                              }`}
                              disabled={loading}
                            >
                              {loading
                                ? "Loading Document..."
                                : "Download File"}
                            </button>
                          )}
                        </DynamicPDFDownloadLink>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">Tidak ada riwayat booking.</p>
                )}
              </div>
            ) : (
              <div className="bg-white p-4 rounded shadow">
                <p className="text-2xl font-bold mb-4">Riwayat Donasi</p>
                {dataDonasi.length > 0 ? (
                  dataDonasi.map((donasi) => (
                    <div
                      key={donasi.id}
                      className="bg-base-200 mb-4 p-4 sm:p-6 lg:p-8"
                    >
                      <div role="alert" className="alert alert-info mb-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          className="stroke-current shrink-0 w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          ></path>
                        </svg>
                        <span>
                          Gambar dari terumbu karang yang didonasi akan diupdate
                          setiap bulan
                        </span>
                      </div>
                      <div className="flex flex-col md:flex-row">
                        <Image
                          src={donasi.gambar}
                          alt="gambarkarang"
                          className="max-w-md md:max-w-xs lg:max-w-md rounded-lg shadow-2xl mb-4 md:mb-0 items-center flex"
                          width={300}
                          height={300}
                        />
                        <div className="flex-1 p-4">
                          <p className="text-xl md:text-2xl lg:text-xl font-bold mb-4">
                            ID Donasi: {donasi.id}
                          </p>
                          <p className="text-lg py-2">
                            <span className="font-semibold">
                              Jumlah Donasi:
                            </span>{" "}
                            {donasi.jumlahDonasi}
                            <br />
                            <span className="font-semibold">
                              Terumbu Karang ID:
                            </span>{" "}
                            {donasi.terumbuKarangId}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>Tidak ada riwayat donasi.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
};

export default ProfilePage;
