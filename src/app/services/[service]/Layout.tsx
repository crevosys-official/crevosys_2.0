"use client";
import Navbar from "@/components/Navbar";
import { Tabs } from "@/components/ui/tabs";
import { div } from "framer-motion/client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

const ServiceLayoutPage = () => {
  const params = useParams();
  const service = params?.service as string;

  // Capitalize service name for matching
  const displayName = service
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  // State to hold the plans
  const [plans, setPlans] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/pricing.json");
      const data = await res.json();
      const matched = data.find(
        (item: { category: string }) => item.category === displayName
      );
      setPlans(matched?.plans || []);
    };
    fetchData();
  }, [displayName]);

  //card content 
  const PricingContent = ({ plan }: { plan: any }) => {
    if (!plan) return <div>No data found.</div>;
    return (
      <div className=" flex flex-col gap-4">
        <h2 className="text-5xl font-bold mb-2 text-zinc-200">{plan.title}</h2>
        <p className="mb-2 text-[30px] font-normal">{plan.details.description}</p>
        <p className="mb-2 font-heading tracking-wider text-6xl">Price: {plan.details.price}</p>
        <ul className="list-disc ml-5 flex flex-col gap-3 text-2xl font-normal text-gray-300">
          <hr className=" border-gray-400/30 border" />
          {plan.details.services.map((service: string, idx: number) => (
            <li key={idx}>{service}</li>
          ))}
        </ul>
      </div>
    );
  };

  // Generate tabs from plans
  const tabs = plans.map((plan) => ({
    title: plan.title,
    value: plan.title.toLowerCase(),
    content: (
      <div className="relative bg-zinc-800 border border-white/40 rounded-xl w-full mx-5 md:mx-0 xl:mx-0 overflow-hidden text-xl md:text-4xl font-bold text-white h-full">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('/pricing/4-small.png')",
            backgroundSize: "cover",
            opacity: 0.2,
          }}
        />
        <div className="relative z-10 bg-zinc-900/40 backdrop-blur-md h-full w-full p-12">
          <PricingContent plan={plan} />
        </div>
      </div>
    ),
  }));

  return (
    <div className="h-screen relative flex flex-col w-full items-start justify-start pt-30 container mx-auto md:px-16 ">
      <div className="relative z-10 w-full h-full">
        <Tabs tabs={tabs} tabClassName="text-white h-full" />
      </div>
    </div>
  );
};

export default ServiceLayoutPage;
