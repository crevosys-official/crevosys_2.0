"use client";
import { MoveRight, Star } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

// Define the type for a service card
type ServiceCard = {
  icon: string;
  title: string;
  description: string;
};

const Services = () => {
  // Type the state as an array of ServiceCard
  const [service, setService] = useState<ServiceCard[]>([]);

  useEffect(() => {
    fetch("services.json")
      .then((res) => res.json())
      .then((data: ServiceCard[]) => setService(data));
  }, []);

  return (
    <div className="relative overflow-hidden services md:pb-20 w-full mt-20 rounded-2xl">
      {/* Background with opacity */}
      <div
        className="absolute inset-0 bg-cover bg-no-repeat bg-center opacity-50"
        style={{ backgroundImage: "url('/elements/servicebg.png')" }}></div>

      {/* Content */}
      <div className="relative z-10">
        <div className=" flex flex-col gap-3 mt-4">
          <div className=" border-gray-600 border w-fit flex justify-center mx-auto px-4 py-1.5  rounded-full gap-2 items-center text-zinc-300">
            <Star className=" w-3" />
            Services
          </div>

          <h1 className="text-4xl font-semibold font-heading tracking-wide text-center text-zinc-200">
            Our Solutions for your Digital Growth
          </h1>
          <p className=" w-1/2 text-md tracking-wide text-gray-400 text-center flex mx-auto">
            We offer expert Webflow design, development, SEO, and support
            services—tailored to boost your website&apos;s performance, user
            experience, and growth.
          </p>
        </div>

        <div className="container mx-auto grid md:grid-cols-4 md:gap-7 gap-5 px-4 md:px-0 mb-10 md:mb-0">
          {service.map((serviceCard, index) => (
            <div
              key={index}
              className=" group bg-[#1B1B1B] p-10 flex flex-col gap-5 rounded-2xl md:my-10 hover:border border-gray-600 transition-all arrow-hover:text-orange-500">
              <Image
                className=" md:w-32 md:h-32 w-24 h-24"
                height={100}
                width={100}
                src={serviceCard.icon}
                alt=""
              />
              <h1 className=" text-3xl text-white">{serviceCard.title}</h1>
              <p className=" text-gray-500 text-lg">
                {serviceCard.description}
              </p>
              <p className=" flex gap-3 hover:text-blue-500 items-center group-hover: text-white">
                Learn more
                <span className="group-hover:text-orange-500 group-hover:animate-bounce">
                  <MoveRight />
                </span>
              </p>
            </div>
          ))}
        </div>
        <Image
          className=" absolute md:w-36 w-20 right-10 -bottom-0 md:-bottom-0"
          height={100}
          width={100}
          src="/card_icons/Light-image.png"
          alt=""
        />
      </div>
    </div>
  );
};

export default Services;
