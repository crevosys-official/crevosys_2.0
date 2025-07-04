import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div
      className={[
        "min-h-screen",
        "bg-gradient-to-t from-[#070707] to-[#221f35]",
      ].join(" ")}>
      <div
        className={[
          "fixed inset-0 z-0 pointer-events-none",
          "flex items-center justify-center w-full h-full",
        ].join(" ")}>
        <Image
          src="/gradient.png"
          alt="gradient background"
          fill
          style={{ objectFit: "cover" }}
          className="opacity-10"
          priority
        />
      </div>
      <Navbar />
      <Hero />
    </div>
  );
};

export default page;
