"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { LucideMenu, X } from "lucide-react";
import Portal from "./Portal"; // adjust path as needed
import { AnimatePresence, motion } from "framer-motion";

// Add this import for the hamburger icon (Heroicons)

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // NEW

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  // Menu items for reuse
  const menuItems = (
    <>
      <li>
        <Link
          href="/"
          className={`hover:text-orange-400 transition-colors duration-200 ${
            isActive("/") ? "text-orange-400 font-bold" : ""
          }`}
          onClick={() => setMobileMenuOpen(false)}>
          Home
        </Link>
      </li>
      <li>
        <Link
          href="/team"
          className={`hover:text-orange-400 transition-colors duration-200 ${
            isActive("/team") ? "text-orange-400 font-bold" : ""
          }`}
          onClick={() => setMobileMenuOpen(false)}>
          Team
        </Link>
      </li>
      <li>
        <Link
          href="/about"
          className={`hover:text-orange-400 transition-colors duration-200 ${
            isActive("/about") ? "text-orange-400 font-bold" : ""
          }`}
          onClick={() => setMobileMenuOpen(false)}>
          About
        </Link>
      </li>
    </>
  );

  return (
    <div
      className={`w-full pb-10 navbar pt-6 fixed top-0 left-0 right-0 z-50 md:px-16 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}>
      <div className="container mx-auto flex justify-between items-center">
        <div className="navbar-start">
          {/* Changed logo to a sample one */}
          <Link href="/">
            <Image
              src="/crevoicon.png"
              alt="navlogo"
              className="md:w-18 w-18"
              height={100}
              width={100}
            />
          </Link>
        </div>
        <div className="navbar-end gap-8 items-center">
          {/* Desktop menu */}
          <div className="hidden lg:flex bg-zinc-700/25 backdrop-blur-[5px] border border-white/10 px-4 rounded-full shadow-lg">
            <ul className="menu menu-horizontal px-1 flex gap-8 text-lg uppercase font-heading tracking-wider text-white">
              {menuItems}
            </ul>
          </div>
          {/* Contact button (desktop only) */}
          <div className="hidden md:block">
            <Link href="/contact">
              <button
                type="submit"
                className="justify-center flex gap-2 items-center mx-auto bg-gradient-to-r from-[#D9D9D9] to-[#737373] text-black shadow-xl text-md bg-[#3A3A3A] backdrop-blur-md lg:font-semibold isolation-auto  before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-orange-400  before:-z-10 cursor-pointer before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-4 py-2 overflow-hidden border rounded-full group">
                Let's talk{" "}
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
          {/* Hamburger icon (mobile only) */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="p-2 rounded-md text-white focus:outline-none"
              aria-label="Toggle menu">
              {mobileMenuOpen ? (
                // Close icon
                <X className="h-8 w-8 text-white z-50" />
              ) : (
                // Hamburger icon
                <LucideMenu className="h-8 w-8" />
              )}
            </button>
          </div>
        </div>
      </div>
      {/* Move the mobile menu OUTSIDE the navbar's main div */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <Portal>
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="lg:hidden fixed inset-0 w-screen min-h-[100dvh] bg-zinc-800 z-[9999] flex flex-col items-center justify-center "
            >
              {/* Logo at the top of the menu */}
              <div className="absolute top-8 left-1/2 -translate-x-1/2">
                <Image
                  src="/crevoicon.png"
                  alt="navloggo"
                  className="w-24"
                  height={100}
                  width={100}
                />
              </div>
              {/* X button at the top right */}
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="absolute top-8 right-8 p-2 rounded-md text-white z-[201]"
                aria-label="Close menu">
                <X className="h-8 w-8 text-white" />
              </button>
              <ul className="flex flex-col items-center w-full gap-8 text-2xl uppercase font-heading tracking-wider text-white mt-14">
                {menuItems}
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3">
                  <button
                    type="submit"
                    className="justify-center gap-2 flex items-center mx-auto bg-gradient-to-r from-[#D9D9D9] to-[#737373] text-black shadow-xl text-md bg-[#3A3A3A] backdrop-blur-md lg:font-semibold isolation-auto  before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-orange-400  before:-z-10 cursor-pointer before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-4 py-2 overflow-hidden border rounded-full group">
                    Let's talk{" "}
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
              </ul>
            </motion.div>
          </Portal>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
