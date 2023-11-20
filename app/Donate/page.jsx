import Image from "next/image";
import Link from "next/link";
import React from "react";
import style from "./donate.module.css";
import bgDonate from "../../public/assets/bgdonate.png";
import Donateft from "../../public/assets/donateft.png";
import FormDonate from "./formDonate"
const Donate = () => {
  return (
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
      <div className="flex flex-col lg:flex-row items-center p-4 lg:p-8 bg-[#F3F5F7]">
        <div className={`lg:w-1/2 ${style.AboutImg}`}>
          <Image src={Donateft} width={400} alt="AboutImg" height={300} />
        </div>

        <div className={`lg:w-1/2 ${style.AboutTxt} lg:pl-8`}>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Manfaat Donasi
          </h1>
          <p className="text-lg leading-relaxed">
            Manfaat donasi ini adalah Anda dapat menjadi agen perubahan positif
            dalam pemulihan dan pelestarian terumbu karang yang sangat penting
            bagi ekosistem laut dan perubahan iklim global. Dengan
            berkontribusi, Anda mendukung pemulihan ekosistem, menyerap karbon,
            serta memberikan mata pencaharian kepada komunitas nelayan, sambil
            juga memperoleh kepuasan pribadi, pembaruan tentang pertumbuhan
            terumbu karang yang Anda donasi, dan kesempatan untuk meningkatkan
            kesadaran tentang kelestarian terumbu karang di seluruh dunia.
          </p>
          {/* <a href="/Login">
            <button className="btn btn-primary font-bold capitalize mt-4">
              Login untuk donasi
            </button>
          </a> */}
          <FormDonate/>
        </div>
      </div>
    </div>
  );
};

export default Donate;
