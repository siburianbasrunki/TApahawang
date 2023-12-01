import Jumbotron from "../app/components/Jumbotron";
import About from "./parts/About";
import Service from "../app/components/Service";
import ListHotels from "../app/components/ListHotels";
import Activity from "./components/aktivitas";

export default async function Home() {
  return (
    <>
      <Jumbotron />
      <About />
      <Service />
      <ListHotels />
      <Activity />
    </>
  );
}
