import Jumbotron from "../app/components/Jumbotron";
import About from "./parts/About";
import Service from "../app/components/Service";
import ListHotels from "../app/components/ListHotels"
import Activity from "./components/aktivitas";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <>
        {/* <pre>{JSON.stringify(session)}</pre> */}
      <Jumbotron />
      <About />
      <Service />
      <ListHotels />
      <Activity />
    </>
  );
}
