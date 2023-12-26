import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import RegisterForm from "../components/formsignup";
export default function Register() {
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="grid justify-center item-center h-[80vh]">
        <RegisterForm />
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}
