import Image from "next/image";
import React from "react";
import Navbar from "@/components/layout/Navbar";
import ContactLayout from "@/components/contact/ContactLayout";

const page = () => {
  return (
    <div>
        
      {/* background container */}
      <div
        className={[
          "min-h-screen relative overflow-hidden",
          "bg-gradient-to-t from-[#070707] to-[#221f35]",
        ].join(" ")}>
        <Navbar />

        <div
          className={[
            "fixed inset-0 z-0 pointer-events-none overflow-hidden",
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
          <div className="w-full h-full flex items-center justify-center">
            <Image
              className="w-full h-auto min-h-screen opacity-30 md:opacity-100"
              src="/pricing/stars.svg"
              alt="stars"
              height={1000}
              width={1000}
              loading="lazy"
            />
          </div>
        </div>
        {/* content */}
        <div className="relative z-10">
          <ContactLayout />
        </div>
      </div>
    </div>
  );
};

export default page;