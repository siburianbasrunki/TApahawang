import { AiOutlineInstagram, AiOutlineWhatsApp } from "react-icons/ai";
import Style from "./component.module.css"
const Footer = () => {
  return (
    <>
      <footer className="footer p-10 bg-[#212529] text-white flex justify-around">
        <nav>
          <header className="footer-title">Kontak Kami</header>
          <p>Kecamatan Punduh Pidada, kabupaten Pesawaran, Lampung Selatan</p>
          <p>Email: </p>
          <p>Telepon: </p>
        </nav>

        <nav>
          <header className="footer-title">Sosial Media</header>
          <div className="flex justify-around">
            <a className="link link-hover">
              <AiOutlineWhatsApp className={Style.icon} />
            </a>
            <a className="link link-hover">
              <AiOutlineInstagram className={Style.icon} />
            </a>
          </div>
        </nav>
      </footer>
      <footer className="footer px-10 py-4 border-t bg-[#212529] text-white flex justify-center items-center text-center ">
        <p>&copy; 2024 Badan Usaha Milik Desa Wisata Pulau Pahawang. Hak Cipta Dilindungi.</p>
      </footer>
    </>
  );
};
export default Footer;
