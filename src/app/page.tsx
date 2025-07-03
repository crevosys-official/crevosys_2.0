import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import React from "react";

const page = () => {
  return (
    <div className="bg-gradient-to-t from-[#070707] to-[#221f35] min-h-screen">
      <Navbar />
      <Hero />
    </div>
  );
};

export default page;
