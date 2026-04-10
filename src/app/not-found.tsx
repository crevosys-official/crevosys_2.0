"use client";

import FuzzyText from "@/components/animation/Fuzzy";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const notFound = () => {
  const router = useRouter();

  const backHome = () => {
    router.push("/");
  };

  return (
    <div>
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
              loading="lazy"
            />
          </div>
        </div>
        <div className=" h-screen flex flex-col gap-5 items-center justify-center">
          <FuzzyText
            baseIntensity={0.2}
            hoverIntensity={0.5}
            enableHover={true}
            fontSize={200}>
            404
          </FuzzyText>
          <FuzzyText
            baseIntensity={0.1}
            hoverIntensity={0.3}
            enableHover={true}
            fontSize={60}>
            Page not found !
          </FuzzyText>
          <Button
            onClick={backHome}
            size="lg"
            className=" text-xl mt-5 hover:bg-zinc-600 p-4 font-semibold border border-gray-200/30">
            Back to home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default notFound;
