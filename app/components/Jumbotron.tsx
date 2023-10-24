import Link from "next/link";
import React from "react";

const HeaderSection = () => {
  return (
    <section className="header beach-hero bg-dark text-center relative h-screen">
      <div className="absolute top-0 left-0 w-full h-full ">
        <video autoPlay muted loop className="w-full h-full object-cover">
          <source src="assets/bgvideo.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="container relative z-10 h-full">
        <div className="flex items-center justify-center h-full">
          <div className="col-lg-6 mx-auto">
            <h1 className="text-3xl text-white font-bold">
              Dukung Pelestarian Terumbu Karang
            </h1>
            <h2 className="text-3xl text-white mb-4 font-bold">
              Jelajahi Keindahan Pahawang
            </h2>

            <Link href="#" className="btn btn-primary explore-button">
              Jelajahi Pahawang
            </Link>

            <div className="flex mt-4 text-2xl">
              <div className="flex-1 text-center">
                <h3 className="text-white">100</h3>
                <p className="text-white">Penginapan</p>
              </div>
              <div className="flex-1 text-center">
                <h3 className="text-white">100</h3>
                <p className="text-white">Donatur</p>
              </div>
              <div className="flex-1 text-center">
                <h3 className="text-white">100</h3>
                <p className="text-white">Volunter</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeaderSection;
