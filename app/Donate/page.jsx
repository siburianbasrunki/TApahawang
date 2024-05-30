import Image from "next/image";
import Link from "next/link";
import React from "react";
import style from "./donate.module.css";
import bgDonate from "../../public/assets/bgdonate.png";
import Karang from "../../public/assets/karang.JPG";
import { prisma } from "@/lib/prisma";
import AddDonasi from "../Admin/Donasi/addDonasi";
import ListTerumbu from "./ListTerumbu";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
const getKarang = async () => {
  const res = await prisma.terumbuKarang.findMany();
  return res;
};

const Donate = async () => {
  const Karangs = await getKarang();
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div>
        <section className="header beach-hero bg-dark text-center relative h-screen">
          <div className="absolute top-0 left-0 w-full h-full ">
            <Image
              src={bgDonate}
              alt="oke"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="container relative z-10 h-full">
            <div className="flex items-center justify-center h-full">
              <div className="col-lg-6 mx-auto">
                <h1 className="text-3xl text-white font-bold">
                  Ayo Berdonasi Untuk Pemeliharaan <br /> Terumbu karang
                </h1>

                <Link href="#" className="btn btn-primary explore-button mt-8">
                  Donate
                </Link>
              </div>
            </div>
          </div>
        </section>
        <div className="bg-[#F3F5F7] p-4 md:p-8 rounded-lg ">
          <ListTerumbu />
        </div>

        <div className="flex flex-col lg:flex-row items-center p-3 lg:p-4 bg-[#F3F5F7] rounded-lg">
          <div className={`lg:w-1/2 mt-8 ${style.AboutImg}`}>
            <Image
              src={Karang}
              width={400}
              alt="rak-karang"
              height={250}
              className="rounded-lg"
            />
          </div>

          <div className={`lg:w-1/2 ${style.AboutTxt} lg:pl-8`}>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-center lg:text-left">
              Manfaat Donasi
            </h1>
            <div className="text-lg leading-relaxed">
              <p>
                Manfaat donasi ini adalah Anda dapat menjadi agen perubahan
                positif dalam pemulihan dan pelestarian terumbu karang yang
                sangat penting bagi ekosistem laut dan perubahan iklim global.
                Dengan berkontribusi, Anda mendukung pemulihan ekosistem,
                menyerap karbon, serta memberikan mata pencaharian kepada
                komunitas nelayan, sambil juga memperoleh kepuasan pribadi,
                pembaruan tentang pertumbuhan terumbu karang yang Anda donasi,
                dan kesempatan untuk meningkatkan kesadaran tentang kelestarian
                terumbu karang di seluruh dunia.
              </p>
              <span className="font-bold">Langkah-langkah Donasi :</span>
              <ol className="list-decimal ml-6">
                <li>Sudah register dan login pada website ini</li>
                <li>
                  Lihat daftar terumbu karang sebelum klik tombol AYO DONASI
                </li>
                <li>Minimal Donasi 80rb untuk 1 fragmen Terumbu Karang</li>
              </ol>
            </div>
            <div className="mt-2 mb-4 ">
              <AddDonasi karangs={Karangs} />
            </div>
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
};

export default Donate;
