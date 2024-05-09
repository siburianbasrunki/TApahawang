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
  validasiPembayaran: boolean;
  totalbayar: number;
  name: string;
}
interface BoTranspotasi {
  id : string;
  jumlahPenumpang : string;
  tanggalCheckin : string;
  name : string;
}
const ProfilePage: NextPage = () => {
  const [session, setSession] = useState<{ user: { name: string } } | null>(
    null
  );
  const [userId, setUserId] = useState("");
  const [showBookingHistory, setShowBookingHistory] = useState(true);
  const [dataBoVillas, setDataBoVillas] = useState<BoVillas[]>([]);
  const [dataDonasi, setDataDonasi] = useState<Donasi[]>([]);
  const [dataBoTranspotasi,setDataBoTransportasi] = useState<BoTranspotasi[]>([]);
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

  const fetchDataBoTransportasi = async (userId:string)=>{
    try {
      const data_transportasi = await axios.post("/api/transportasi/user",{
        userId : userId
      })
      setDataBoTransportasi([...data_transportasi.data.botransportasi])
    } catch (error) {
      console.log("Error fetching booking transpotasi data");
      
    }
  }
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
    fetchDataBoTransportasi(userId);
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
      <div className="max-w-screen-md mx-auto shadow-md">
        <div className="bg-blue-500 p-4 text-white text-center w-full rounded-lg">
          <h1 className="text-2xl font-bold">Profile Page</h1>
          <p>Selamat datang, {session?.user?.name || "Guest(belum Login)"}!</p>
        </div>
        <div className="mt-4">
          <div className="flex justify-around">
            <button
              className={`px-4 py-2 focus:outline-none rounded-lg ${
                showBookingHistory
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-blue-500"
              }`}
              onClick={() => setShowBookingHistory(true)}
            >
              Riwayat Booking Villa
            </button>
            <button
              className={`px-4 py-2 focus:outline-none rounded-lg ${
                showBookingHistory
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-blue-500"
              }`}
              onClick={() => setShowBookingHistory(true)}
            >
              Riwayat Sewa Kapal
            </button>
            <button
              className={`px-4 py-2 focus:outline-none rounded-lg ${
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {dataBoVillas.length > 0 ? (
                    dataBoVillas.map((bovilla) => (
                      <div
                        key={bovilla.id}
                        className="bg-gray-100 p-6 rounded-lg shadow-md"
                      >
                        <p className="text-lg mb-2">
                          ID Villa: <br />{" "}
                          <span className="font-semibold text-xl">
                            {bovilla.villaId.slice(0, 8)}
                          </span>
                        </p>
                        <p className="text-lg mb-2">
                          Nama Pemesan: <br />{" "}
                          <span className="font-semibold text-xl">
                            {" "}
                            {bovilla.name}
                          </span>
                        </p>
                        <p className="text-lg mb-2">
                          Check-in: <br />{" "}
                          <span className="font-semibold text xl">
                            {formatDate(bovilla.tanggalCheckin)}
                          </span>
                        </p>
                        <p className="text-lg mb-4">
                          Check-out: <br />{" "}
                          <span className="font-semibold text-xl">
                            {formatDate(bovilla.tanggalCheckout)}
                          </span>
                        </p>
                        <p className="text-lg mb-4">
                          Total Bayar: <br />{" "}
                          <span className="font-semibold text-xl">
                            {bovilla.totalbayar}
                          </span>
                        </p>
                        <p>
                          Status:{" "}
                          {bovilla.validasiPembayaran
                            ? "Sudah divalidasi/Download Tiket(Screenshoot)"
                            : "Belum divalidasi"}
                        </p>
                        <div className="flex justify-end mt-4">
                          {bovilla.validasiPembayaran ? (
                            <DynamicPDFDownloadLink
                              document={<PdfTiketFile bookingData={bovilla} />}
                              fileName="tiketvillapahawang"
                            >
                              {({ loading }) => (
                                <button
                                  className={`px-4 py-2 bg-blue-500 text-white rounded ${
                                    loading
                                      ? "opacity-50 cursor-not-allowed"
                                      : ""
                                  }`}
                                  disabled={loading}
                                >
                                  {loading
                                    ? "Loading Document..."
                                    : "Download Tiket"}
                                </button>
                              )}
                            </DynamicPDFDownloadLink>
                          ) : (
                            <button
                              className="px-4 py-2 bg-gray-300 text-blue-500 rounded cursor-not-allowed"
                              disabled
                            >
                              Download Tiket
                            </button>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center">
                      Tidak ada riwayat booking.
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white p-4 rounded shadow">
                <p className="text-2xl font-bold mb-4">Riwayat Donasi</p>
                {dataDonasi.length > 0 ? (
                  dataDonasi.map((donasi) => (
                    <div
                      key={donasi.id}
                      className="bg-base-200 mb-4 p-4 sm:p-6 lg:p-8 rounded-lg"
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
                          minggu
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
                            ID Donasi: {donasi.id.slice(0, 8)}
                          </p>
                          <p className="text-lg py-2">
                            <span className="font-semibold">
                              Jumlah Donasi:
                            </span>{" "}
                            Rp {donasi.jumlahDonasi}
                            <br />
                            <span className="font-semibold">
                              Terumbu Karang ID:
                            </span>{" "}
                            {donasi.terumbuKarangId.slice(0, 8)}
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
