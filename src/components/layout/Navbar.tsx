"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { LucideMenu, X } from "lucide-react";
import Portal from "@/components/layout/Portal";
import { AnimatePresence, motion } from "framer-motion";

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Features", href: "/services" },
  { label: "Benefits", href: "/services" },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "FAQs", href: "/#faqs" },
  { label: "Pricing", href: "/#pricing" },
];

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  return (
    <nav
      className={`w-full fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-10 lg:px-16 py-5">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
          <Image
            src="/crevoicon.png"
            alt="Crevosys"
            className="w-7 h-7 md:w-8 md:h-8 object-contain"
            height={32}
            width={32}
            priority
          />
          <span className="text-white font-bold text-lg tracking-tight font-sans">Crevosys</span>
        </Link>

        {/* Desktop Nav Links — flat, no container */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`text-sm font-medium tracking-wide transition-colors duration-200 hover:text-white ${
                isActive(link.href) ? "text-white" : "text-zinc-400"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Get Started Button — solid white pill */}
        <div className="hidden lg:block">
          <Link href="/contact">
            <button className="px-5 py-2 rounded-full text-sm font-semibold text-black bg-white hover:bg-zinc-200 transition-all duration-200 cursor-pointer">
              Get Started
            </button>
          </Link>
        </div>

        {/* Hamburger icon (mobile only) */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="p-2 rounded-md text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-7 w-7 text-white z-50" />
            ) : (
              <LucideMenu className="h-7 w-7" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <Portal>
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="lg:hidden fixed inset-0 w-screen min-h-[100dvh] bg-black/95 backdrop-blur-md z-[9999] flex flex-col items-center justify-center"
            >
              {/* Logo at top */}
              <div className="absolute top-8 left-1/2 -translate-x-1/2">
                <Image
                  src="/crevoicon.png"
                  alt="CrevoSys"
                  className="w-20"
                  height={80}
                  width={80}
                />
              </div>
              {/* X button */}
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="absolute top-8 right-8 p-2 rounded-md text-white z-[201]"
                aria-label="Close menu"
              >
                <X className="h-7 w-7 text-white" />
              </button>
              <ul className="flex flex-col items-center w-full gap-7 mt-10">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-xl font-medium tracking-wide text-zinc-300 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li className="mt-4">
                  <Link
                    href="/contact"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <button className="px-7 py-3 rounded-full text-base font-semibold text-white bg-transparent border border-white/80 hover:bg-white hover:text-black transition-all duration-300 cursor-pointer">
                      Get Started
                    </button>
                  </Link>
                </li>
              </ul>
            </motion.div>
          </Portal>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
