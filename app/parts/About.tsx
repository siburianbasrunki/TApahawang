import Image from "next/image";
import style from "./parts.module.css";

const About = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center p-4 lg:p-8 bg-[#F3F5F7]">
      {/* Bagian Gambar */}
      <div className={`lg:w-1/2 ${style.AboutImg}`}>
        <Image
          src="/assets/pulau.png"
          width={500}
          alt="AboutImg"
          height={500}
        />
      </div>

      {/* Bagian Teks */}
      <div className={`lg:w-1/2 ${style.AboutTxt} lg:pl-8`}>
        <h1 className="text-4xl lg:text-5xl font-bold mb-4">About Us</h1>
        <p className="text-lg leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis
          voluptatum illo consectetur, molestiae numquam cum porro atque et
          inventore expedita magni. Tempora qui hic iusto libero. Vitae,
          doloremque. Sapiente iure magnam nisi error necessitatibus saepe,
          dicta alias ad aspernatur harum, sed perspiciatis nulla placeat nam,
          reiciendis numquam! Vitae illo voluptatum, dignissimos, eum odio ad,
          dolore vel laborum dolor expedita ullam explicabo nulla neque nostrum
          nihil reiciendis ut voluptatem doloribus ea impedit dolorum laudantium
          aut! Officiis veniam dolorem eaque nihil, ex eveniet aliquid
          recusandae repellat itaque. Sit nulla esse illum quisquam unde
          laboriosam eligendi blanditiis, necessitatibus itaque iusto quae
          temporibus deleniti.
        </p>
      </div>
    </div>
  );
};

export default About;
