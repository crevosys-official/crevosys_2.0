"use client";
import { MoveRight, Star } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import PixelCard from "@/components/animation/PlexCard";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Define the type for a service card
type ServiceCard = {
  icon: string;
  title: string;
  description: string;
};

const DEFAULT_SERVICES: ServiceCard[] = [
  {
    icon: "/card_icons/Icon.png",
    title: "Development",
    description:
      "Development and building amazing digital products with best user experiences strategy.",
  },
  {
    icon: "/card_icons/Marketing.png",
    title: "Marketing",
    description:
      "Marketing services starts and ends within a strategy builds wireframe & solid prototyping posts design.",
  },
  {
    icon: "/card_icons/Design.png",
    title: "Design",
    description:
      "We design professional looking yet simple Logo are search engine and user friendly.",
  },
  {
    icon: "/card_icons/automation.png",
    title: "Automation",
    description:
      "Streamline and optimize your business processes with our cutting-edge AI automation solutions.",
  },
];

const Services = () => {
  const [service, setService] = useState<ServiceCard[]>(DEFAULT_SERVICES);
  const sectionRef = useRef<HTMLDivElement>(null);
  const lightRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    fetch("services.json")
      .then((res) => res.json())
      .then((data: ServiceCard[]) => {
        if (Array.isArray(data) && data.length > 0) {
          setService(data);
          ScrollTrigger.refresh();
        }
      })
      .catch((err) => console.error("Failed to fetch services:", err));
  }, []);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          once: true,
        },
      });

      // 1. Header elements reveal - snappy & responsive
      tl.fromTo(
        ".services-badge",
        { opacity: 0, y: -15, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: "power2.out" }
      )
        .fromTo(
          ".services-title",
          { opacity: 0, y: 24, filter: "blur(4px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.42, ease: "power2.out" },
          "-=0.2"
        )
        .fromTo(
          ".services-desc",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" },
          "-=0.2"
        )
        // 2. Service cards fast cascade
        .fromTo(
          ".service-card-item",
          { opacity: 0, y: 30, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.45,
            stagger: 0.06,
            ease: "power2.out",
          },
          "-=0.25"
        );

      // 3. Ambient light subtle drift
      if (lightRef.current) {
        gsap.fromTo(
          lightRef.current,
          { opacity: 0, scale: 0.8, x: 30 },
          {
            opacity: 1,
            scale: 1,
            x: 0,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              once: true,
            },
          }
        );
      }
    },
    { scope: sectionRef, dependencies: [service.length] }
  );

  return (
    <div
      ref={sectionRef}
      id="services"
      className="relative overflow-hidden services md:pb-20 w-full mt-0 pt-6 md:pt-10 rounded-2xl">
      {/* Background with opacity */}
      <div
        className="absolute inset-0 bg-cover bg-no-repeat bg-center opacity-60"
        style={{ backgroundImage: "url('/elements/servicebg.png')" }}></div>

      {/* Content */}
      <div className="relative z-10 md:container md:mx-auto xl:container xl:mx-auto md:px-10">
        <div className="flex flex-col gap-4 mt-4 mb-4 md:mb-4 xl:mb-4">
          <div className="services-badge border-gray-600 border w-fit flex justify-center mx-auto px-4 py-1.5 rounded-full gap-2 items-center text-zinc-300">
            <Star className="w-3" />
            Services
          </div>

          <h1 className="services-title text-4xl font-heading tracking-wide text-center text-zinc-200 px-4">
            Our Solutions for your Digital Growth
          </h1>
          <p className="services-desc xl:w-1/2 md:w-1/2 w-full text-md tracking-wide text-gray-400 text-center flex mx-auto px-4">
            We offer expert Webflow design, development, SEO, and support
            services tailored to boost your website&apos;s performance, user
            experience, and growth.
          </p>
        </div>

        <div className="container mx-auto grid md:grid-cols-2 xl:grid-cols-4 xl:gap-5 md:gap-7 gap-5 px-4 md:px-0 mb-10 md:mb-0">
          {service.map((serviceCard, index) => {
            const slug = serviceCard.title.toLowerCase().replace(/\s+/g, "-");
            return (
              <div key={index} className="service-card-item">
                <Link href={`/services/${slug}`}>
                  <PixelCard
                    variant="blue"
                    className="my-1 md:my-2 xl:my-10 w-full cursor-pointer hover:border-zinc-200/20">
                    <div className="absolute inset-0 justify-between p-10 bg-zinc-800/20 flex flex-col gap-5">
                      <div>
                        <Image
                          className="md:w-32 md:h-32 w-24 h-24"
                          height={100}
                          width={100}
                          src={serviceCard.icon}
                          alt="serviceCardImage"
                          loading="lazy"
                        />
                        <h1 className="text-3xl text-white mt-2">
                          {serviceCard.title}
                        </h1>
                        <p className="text-gray-500 text-md mt-1">
                          {serviceCard.description}
                        </p>
                      </div>
                      <p className="flex gap-3 text-white hover:text-blue-500 items-center group-hover:text-white">
                        Service Plan
                        <span className="group-hover:text-orange-500 group-hover:animate-bounce">
                          <MoveRight />
                        </span>
                      </p>
                    </div>
                  </PixelCard>
                </Link>
              </div>
            );
          })}
        </div>
        <Image
          ref={lightRef}
          className="absolute md:w-36 w-20 right-0 bottom-0 md:-bottom-0"
          height={100}
          width={100}
          src="/card_icons/Light-image.png"
          alt=""
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default Services;
