"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and past 100px - hide navbar
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up - show navbar
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Helper function to check if a link is active
  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <div
      className={`container mx-auto pb-10 navbar pt-6 fixed top-0 left-0 right-0  transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}>
      <div className="navbar-start">
        <Link href="/" className="btn btn-ghost text-xl">
          <Image
            src="/crevoSysNav.png"
            alt="navloggo"
            className=" w-42"
            height={100}
            width={100}
          />
        </Link>
      </div>
      <div
        className=" navbar-end gap-8 items-center
      ">
        {/* menu bar */}
        <div className="hidden lg:flex bg-zinc-700/20 backdrop-blur-md border border-white/10 px-4 rounded-full shadow-lg">
          <ul className="menu menu-horizontal px-1 flex gap-6 text-lg tracking-wide text-white">
            <li>
              <Link
                href="/"
                className={` cursor-pointer ${
                  isActive("/") ? "text-orange-400" : "text-white"
                }`}>
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/team"
                className={` cursor-pointer ${
                  isActive("/team") ? "text-orange-400" : "text-white"
                }`}>
                Team
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className={` cursor-pointer ${
                  isActive("/about") ? "text-orange-400" : "text-white"
                }`}>
                About
              </Link>
            </li>
          </ul>
        </div>
        <div>
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
    </div>
  );
};

export default Navbar;
