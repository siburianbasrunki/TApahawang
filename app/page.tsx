import Link from "next/link";
import Jumbotron from "../app/components/Jumbotron";
import About from "./parts/About";
import Service from "../app/components/Service";
import ListHotels from "../app/components/ListHotels";
import Activity from "../app/components/Activity";
import Footer from "../app/components/Footer";
const Home = () => {
  return (
    <>
      <Jumbotron />
      <About />
      <Service />
      <ListHotels />
      <Activity />
      {/* <Footer /> */}
    </>
  );
};

export default Home;
