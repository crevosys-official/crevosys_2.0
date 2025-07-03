"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <div className="navbar container mx-auto py-5 flex justify-between items-center">
      <div className="navbar-start">
        <Link href="/">
          <Image
            src="/crevoSysNav.png"
            alt="navlogo"
            className=" w-40"
            width={200}
            height={200}
          />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal flex gap-10 text-lg px-1 text-white">
          <Link href="/">Home</Link>

          <Link href="/teams">Teams</Link>
          <Link href="/about">About us</Link>
        </ul>
      </div>
      <div className="navbar-end flex lg:hidden text-white">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 -ml-40 w-52 p-2 shadow">
            <Link href="/">Home</Link>
            <Link href="/teams">Teams</Link>
            <Link href="/about">About us</Link>
            <Link href="/contact">
              <Button className="bg-gradient-to-r from-[#D9D9D9] to-[#737373] text-black w-full mt-2">
                Contact Us
              </Button>
            </Link>
          </ul>
        </div>
      </div>
      <div className="navbar-end hidden lg:flex text-white items-center gap-4">
        <Link href="/contact">
          <button
            type="submit"
            className="hidden md:inline-flex justify-center gap-2 items-center mx-auto bg-gradient-to-r from-[#D9D9D9] to-[#737373] text-black shadow-xl text-md bg-[#3A3A3A] backdrop-blur-md lg:font-semibold isolation-auto  before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-orange-400  before:-z-10 cursor-pointer before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-4 py-2 overflow-hidden border rounded-full group">
            Contact Us
            <svg
              className="w-8 h-8 justify-end group-hover:rotate-90 group-hover:bg-gray-50 text-gray-50 bg-orange-400 ease-linear duration-300 rounded-full border-gray-700 group-hover:border-none p-2 rotate-45"
              viewBox="0 0 16 19"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                className="fill-gray-200 group-hover:fill-gray-800"></path>
            </svg>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
