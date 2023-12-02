import Link from "next/link";
import Style from "../components/component.module.css";

const Service = () => {
  return (
    <div className="lg:h-auto flex flex-col justify-center items-center my-8">
      <h1 className="text-3xl font-bold text-black text-center mb-8">
        Our Service
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="flex items-center card w-96 bg-[#727379] shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-black text-3xl font-bold">
              Volunteer
            </h2>
            <p className="text-white">
              Find out how you can actively participate in coral reef
              preservation as a volunteer.
            </p>
            <div className="card-actions justify-center">
              <Link href="/Volunteer">
                <button className="btn btn-primary font-bold capitalize">
                  Daftar
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex items-center card w-96 bg-[#727379] shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-black text-3xl font-bold">
              Donation
            </h2>
            <p className="text-white">
              Support coral reef preservation through your donations. Every
              contribution counts!
            </p>
            <div className="card-actions justify-center">
              <Link href="/Donate">
                <button className="btn btn-primary font-bold capitalize">
                  Donate Now
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex items-center card w-96 bg-[#727379] shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-black text-3xl font-bold">
              Booking
            </h2>
            <p className="text-white">
              Reserve your stay at Pulau Pahawang finest hotels and villas for
              an amazing experience.
            </p>
            <div className="card-actions justify-center">
              <Link href="/Villalist">
                <button className="btn btn-primary font-bold capitalize">
                  Book Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Service;
