import React from "react";
import TeamLayout from "./teamLayout";
import Image from "next/image";
import Navbar from "@/components/Navbar";

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
      <div className="md:container md:mx-auto pt-20">
        <TeamLayout />
      </div>
    </div>
  );
};

export default page;
