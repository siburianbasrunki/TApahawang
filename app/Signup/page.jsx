import Style from "./sigup.module.css";
import Loginft from "../../public/assets/login.png";
import Image from "next/image";

const Button = () => {
  return (
    <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring focus:ring-blue-200">
      Sign Up
    </button>
  );
};

const Login = () => {
  return (
    <div
      className={`${Style.signup} min-h-screen flex flex-col justify-center items-center`}
    >
      <div className="bg-white p-4 sm:p-8 md:p-12 lg:w-4/5 xl:w-3/5 2xl:w-2/5 rounded-lg shadow-lg flex flex-col sm:flex-row justify-around relative">
        <div className="mt-4 sm:mt-0 flex flex-col justify-center">
          <h1 className="text-2xl sm:text-3xl font-semibold mb-4">Sign Up</h1>
          <form action="">
            <div className="mb-4">
              <input
                type="text"
                placeholder="Email/Username"
                className="w-full sm:w-80 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                placeholder="Password"
                className="w-full sm:w-80 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>
            <small>
              Sudah punya akun?{" "}
              <a href="/Login" className="text-blue-500">
                Login Sekarang
              </a>
            </small>
            <div className="mt-4 sm:mt-6">
              <Button />
            </div>
          </form>
        </div>
        <div className="image m-4 sm:m-0 relative">
          <Image src={Loginft} alt="Login Foto" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <h2 className="text-white font-semibold text-3xl bg-black bg-opacity-70 p-4 rounded-md shadow-lg">
              WELCOME
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
