"use client";
import { useState, SyntheticEvent } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import bgVolunteer from "../../public/assets/bgdonate.png";

const Volunteer = () => {
  const [namaOrganisasi, setNamaOrganisasi] = useState("");
  const [asal, setAsal] = useState("");
  const [email, setEmail] = useState("");
  const [noTelepon, setNoTelepon] = useState("");
  const [surat, setSurat] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true); // Set loading to true during form submission
      await axios.post("/api/volunteer", {
        namaOrganisasi: namaOrganisasi,
        asal: asal,
        email: email,
        noTelepon: noTelepon,
        surat: surat,
      });
      setSuccessMessage("Pendaftaran berhasil! Terima kasih atas partisipasinya.");
      setNamaOrganisasi("");
      setAsal("");
      setEmail("");
      setNoTelepon("");
      setSurat("");
      router.refresh();
    } catch (error) {
      // Handle error if submission fails
      console.error("Error submitting form:", error);
      // You may want to set an error state and display an error message
    } finally {
      setIsLoading(false); // Set loading back to false after form submission, whether success or failure
    }
  };

  return (
    <>
      <section className="header beach-hero bg-dark text-center relative h-screen">
        <div className="absolute top-0 left-0 w-full h-full">
          <Image
            src={bgVolunteer}
            alt="oke"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="container relative z-10 h-full flex items-center justify-center">
          <div className="lg:w-6/12 mx-auto text-center p-4">
            <h1 className="text-3xl text-white font-bold">
              Kami mencari individu yang peduli dengan lingkungan dan siap untuk
              bertindak. Jika Anda ingin melindungi terumbu karang dan kehidupan
              laut, bergabunglah dengan kami sebagai relawan!
            </h1>

            <Link href="#" className="btn btn-primary mt-8">
              Daftar
            </Link>
          </div>
        </div>
      </section>

      <div className="bg-gray-100 p-6 rounded-md">
        <h2 className="text-2xl text-primary mb-4">
          Form Pendaftaran Volunteer
        </h2>
        {successMessage && (
          <div className="bg-green-200 p-4 mb-4 rounded-md">
            {successMessage}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="teamName"
                className="block text-sm font-medium text-gray-700"
              >
                Nama Tim/Organisasi
              </label>
              <input
                type="text"
                id="teamName"
                name="teamName"
                value={namaOrganisasi}
                required
                onChange={(e) => setNamaOrganisasi(e.target.value)}
                className="w-full md:w-1/2 px-3 py-2 mt-1 rounded-md border border-blue-500 focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
              />
            </div>
            <div>
              <label
                htmlFor="teamName"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                className="w-full md:w-1/2 px-3 py-2 mt-1 rounded-md border border-blue-500 focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
              />
            </div>
            <div>
              <label
                htmlFor="teamName"
                className="block text-sm font-medium text-gray-700"
              >
                No Telepon/WhatsApp
              </label>
              <input
                type="number"
                id="notelepon"
                name="notelepon"
                required
                value={noTelepon}
                onChange={(e) => setNoTelepon(e.target.value)}
                className="w-full md:w-1/2 px-3 py-2 mt-1 rounded-md border border-blue-500 focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
              />
            </div>
            <div>
              <label
                htmlFor="teamName"
                className="block text-sm font-medium text-gray-700"
              >
                Asal
              </label>
              <input
                type="text"
                id="asal"
                required
                name="asal"
                value={asal}
                onChange={(e) => setAsal(e.target.value)}
                className="w-full md:w-1/2 px-3 py-2 mt-1 rounded-md border border-blue-500 focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
              />
            </div>

            <div>
              <label
                htmlFor="teamName"
                className="block text-sm font-medium text-gray-700"
              >
                Link Berkas Pendukung Volunteer
              </label>
              <input
                type="text"
                id="link"
                name="link"
                placeholder="misal : link Gdrive"
                required
                value={surat}
                onChange={(e) => setSurat(e.target.value)}
                className="w-full md:w-1/2 px-3 py-2 mt-1 rounded-md border border-blue-500 focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
              />
            </div>
          </div>
          <button
            type="submit"
            className={`mt-4 bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark focus:outline-none focus:ring focus:ring-primary focus:ring-opacity-50 ${
              isLoading ? 'opacity-50 cursor-not-allowed' : '' // Disable button and adjust styling when loading
            }`}
            disabled={isLoading}
          >
            {isLoading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </>
  );
};

export default Volunteer;
