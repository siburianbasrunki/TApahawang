"use client";
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";

const Navbar = () => {
  return (
    <>
      <div className="navbar bg-[#F8F9FA] ">
        <div className="navbar-start ">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[50] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link href="/">Home</Link>
              </li>

              <li>
                <details>
                  <summary>Special offers</summary>
                  <ul className="p-2 bg-base-100 z-[50]">
                    <li>
                      <Link href="/Villalist">Villa/Hotels</Link>
                    </li>
                    <li>
                      <Link href="/Merch">Merchandise</Link>
                    </li>
                    <li>
                      <Link href="/Transportlist">Transportasi</Link>
                    </li>
                    <li>
                      <Link href="/Packet">Packet</Link>
                    </li>
                  </ul>
                </details>
              </li>
              <li>
                <details>
                  <summary>Konservasi</summary>
                  <ul className="p-2 bg-base-100 z-[50]">
                    <li>
                      <Link href="/Donate">Donate</Link>
                    </li>
                    <li>
                      <Link href="/Volunteer">Volunteer</Link>
                    </li>
                    <li>
                      <Link href="/Galery">Galery Konservasi</Link>
                    </li>
                  </ul>
                </details>
              </li>
              <li>
                <Link href="/User">Profile</Link>
              </li>
              <li>
                <Link href="/Signup">Register</Link>
              </li>
            </ul>
          </div>
          <a className="btn btn-ghost normal-case text-xl">Pahawang</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <details>
                <summary>Special offers</summary>
                <ul className="p-2 bg-base-100 z-[50]">
                  <li>
                    <Link href="/Villalist">Villa/Hotels</Link>
                  </li>
                  <li>
                    <Link href="/Merch">Merchandise</Link>
                  </li>
                  <li>
                    <Link href="/Transportlist">Transportasi</Link>
                  </li>
                  <li>
                    <Link href="/Packet">Packet</Link>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <details>
                <summary>Konservasi</summary>
                <ul className="p-2 bg-base-100 z-[50]">
                  <li>
                    <Link href="/Donate">Donate</Link>
                  </li>
                  <li>
                    <Link href="/Volunteer">Volunteer</Link>
                  </li>
                  <li>
                    <Link href="/Galery">Galery Konservasi</Link>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <Link href="/User">Profile</Link>
            </li>
            <li>
              <Link href="/Signup">Register</Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <button className="btn btn-sm" onClick={() => signIn()}>
            Sign In
          </button>

          <button className="btn btn-sm" onClick={() => signOut()}>
            Sign Out
          </button>
        </div>
      </div>
    </>
  );
};
export default Navbar;
