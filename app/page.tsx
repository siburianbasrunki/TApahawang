import Jumbotron from "../app/components/Jumbotron";
import About from "./parts/About";
import Service from "../app/components/Service";
import ListHotels from "../app/components/ListHotels";
import Activity from "./components/aktivitas";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Maps from "./components/Maps"
export default async function Home() {
  return (
    <>
      <Navbar />
      <Jumbotron />
      <About />
      <Service />
      <ListHotels />
      <Activity />
      <Maps/>
      <Footer />
    </>
  );
}
