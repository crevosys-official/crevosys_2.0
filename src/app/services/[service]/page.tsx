import Navbar from "@/components/Navbar";
import ServiceLayoutPage from "./Layout";
import Image from "next/image";

const page = () => {
  return (
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
      <Navbar />
      <ServiceLayoutPage />
    </div>
  );
};

export default page;
