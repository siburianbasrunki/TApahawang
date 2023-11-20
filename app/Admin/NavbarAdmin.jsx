import Image from "next/image";
import Profil from "../../public/assets/profile.jpg"
const NavbarAdmin = () => {
  return (
    <div className="navbar bg-[#F8F9FA]">
  <div className="flex-1">
    <a className="btn btn-ghost normal-case text-xl">Dashboard</a>
  </div>
  <div className="flex-none">
   
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <Image src={Profil} alt="oke" />
        </div>
      </label>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        
        <li><a>Logout</a></li>
      </ul>
    </div>
  </div>
</div>
  )
};

export default NavbarAdmin;
