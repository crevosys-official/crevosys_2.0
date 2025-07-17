import Image from "next/image";
import React from "react";
import ContactLayout from "./ContactLayout";

const page = () => {
  return (
    <div>
      {/* background container */}
      <div
        className={[
          "min-h-screen",
          "bg-gradient-to-t from-[#070707] to-[#221f35] ",
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
          <div>
            <Image
              className="w-full h-screen"
              src="/pricing/stars.svg"
              alt="start"
              height={1000}
              width={1000}
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
