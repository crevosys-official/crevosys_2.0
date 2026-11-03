import React from "react";
import TeamLayout from "@/components/team/TeamLayout";
import Image from "next/image";
import DropoutLayout from "@/components/dropout/DropoutLayout";

const page = () => {
  return (
    <DropoutLayout menuText="Menu">
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
            src="/gradient.webp"
            alt=""
            fill
            sizes="100vw"
            style={{ objectFit: "cover" }}
            className="opacity-10"
            priority
          />
        </div>
        <div className="md:container md:mx-auto xl:container xl:mx-auto">
          <main>
            <TeamLayout />
          </main>
        </div>
      </div>
    </DropoutLayout>
  );
};

export default page;
