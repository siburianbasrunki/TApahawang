import Image from "next/image";
import Link from "next/link";
import bgVolunteer from "../../public/assets/bgdonate.png";
import Button from "../parts/Button";
const Volunteer = () => {
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
              Donate
            </Link>
          </div>
        </div>
      </section>

      <div className="bg-gray-100 p-6 rounded-md">
        <h2 className="text-2xl text-primary mb-4">Form Pendaftaran</h2>
        <form action="">
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
                className="w-full md:w-1/2 px-3 py-2 mt-1 rounded-md border border-blue-500 focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
              />
            </div>
            <div>
              <label
                htmlFor="contact"
                className="block text-sm font-medium text-gray-700"
              >
                Email/No.Telepon
              </label>
              <input
                type="text"
                id="contact"
                name="contact"
                className="w-full md:w-1/2 px-3 py-2 mt-1 rounded-md border border-blue-500 focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
              />
            </div>
            <div>
              <label
                htmlFor="organization"
                className="block text-sm font-medium text-gray-700"
              >
                Asal Organisasi
              </label>
              <input
                type="text"
                id="organization"
                name="organization"
                className="w-full md:w-1/2 px-3 py-2 mt-1 rounded-md border border-blue-500 focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
              />
            </div>
            <div>
              <label
                htmlFor="availability"
                className="block text-sm font-medium text-gray-700"
              >
                Waktu Ketersediaan
              </label>
              <input
                type="text"
                id="availability"
                name="availability"
                className="w-full md:w-1/2 px-3 py-2 mt-1 rounded-md border border-blue-500 focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
              />
            </div>
            <div>
              <label
                htmlFor="document"
                className="block text-sm font-medium text-gray-700"
              >
                Surat Pengajuan
              </label>
              <input
                type="file"
                id="document"
                name="document"
                className="w-full md:w-1/2 px-3 py-2 mt-1 rounded-md  focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark focus:outline-none focus:ring focus:ring-primary focus:ring-opacity-50"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Volunteer;
