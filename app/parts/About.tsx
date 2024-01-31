"use client";
import React, { useState } from "react";
import Image from "next/image";

const About = () => {
  const initialDisplayLength = 200;
  const [displayLength, setDisplayLength] = useState(initialDisplayLength);
  const fullText =
    "Selamat datang di situs web kami, tempat terbaik untuk mendapatkan informasi lengkap seputar pesan villa, pemesanan transportasi, pembelian merchandise eksklusif, dan pengalaman fitur unggulan kami: donasi untuk terumbu karang. Kami berkomitmen untuk menyediakan layanan terbaik bagi Anda yang ingin merencanakan liburan tanpa repot. Dari informasi rinci tentang berbagai villa hingga opsi transportasi yang nyaman, serta merchandise berkualitas tinggi untuk melengkapi perjalanan Anda, kami siap memenuhi kebutuhan perjalanan Anda. Tidak hanya itu, melalui fitur donasi untuk terumbu karang, Anda dapat berkontribusi dalam menjaga keberlanjutan lingkungan laut yang sangat berharga. Bergabunglah dengan kami di perjalanan tak terlupakan Anda, di mana setiap langkah memberikan dampak positif untuk keberlanjutan lingkungan.";

  const toggleReadMore = () => {
    setDisplayLength(
      displayLength === initialDisplayLength
        ? fullText.length
        : initialDisplayLength
    );
  };

  return (
    <div className="bg-[#F3F5F7]">
      <div className="container mx-auto ">
      <div className="flex flex-col lg:flex-row items-center p-4 lg:p-8">
        <div className={`lg:w-full mb-4 lg:mb-0`}>
          <Image
            src="/assets/pahawanglogo.png"
            width={500}
            height={500}
            alt="AboutImg"
            className="w-full h-full object-cover"
          />
        </div>
        <div className={`lg:w-full mb-4 lg:mb-0`}>
          <h3 className="text-2xl lg:text-3xl font-bold mb-4">About Us</h3>
          <p className="text-base lg:text-lg xl:text-xl leading-relaxed">
            {fullText.slice(0, displayLength)}
            {displayLength === initialDisplayLength &&
              fullText.length > initialDisplayLength && (
                <span
                  onClick={toggleReadMore}
                  className="text-blue-500 cursor-pointer"
                >
                  ... Read More
                </span>
              )}
            {displayLength !== initialDisplayLength && (
              <span
                onClick={toggleReadMore}
                className="text-blue-500 cursor-pointer"
              >
                {" "}
                Read Less
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default About;
