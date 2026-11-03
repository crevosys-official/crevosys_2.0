import Image from "next/image";
import React from "react";
import DropoutLayout from "@/components/dropout/DropoutLayout";
import ContactLayout from "@/components/contact/ContactLayout";

const page = () => {
  return (
    <DropoutLayout menuText="Menu">
      {/* background container */}
      <div
        className={[
          "min-h-screen relative overflow-hidden",
          "bg-gradient-to-t from-[#070707] to-[#221f35]",
        ].join(" ")}>
        <div
          className={[
            "fixed inset-0 z-0 pointer-events-none overflow-hidden",
            "flex items-center justify-center w-full h-full",
          ].join(" ")}>
          <Image
            src="/gradient.webp"
            alt=""
            fill
            sizes="100vw"
            style={{ objectFit: "cover" }}
            className="opacity-10"
            priority
          />
          <div className="w-full h-full flex items-center justify-center">
            <Image
              className="w-full h-auto min-h-screen opacity-30 md:opacity-100"
              src="/pricing/stars.svg"
              alt=""
              height={1000}
              width={1000}
              loading="lazy"
            />
          </div>
        </div>
        {/* content */}
        <main className="relative z-10">
          <ContactLayout />
        </main>
      </div>
    </DropoutLayout>
  );
};

export default page;
