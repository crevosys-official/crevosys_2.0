import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { connectDB } from "@/lib/mongodb";
import { Service } from "@/models/Service";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PixelCard from "@/components/animation/PlexCard";
import { Star, MoveRight, ArrowRight } from "lucide-react";
import { DEFAULT_SERVICES } from "@/data/defaultServices";

export const metadata: Metadata = {
  title: "Services & Capabilities | Crevosys",
  description:
    "Explore our complete suite of digital services — development, marketing, UI/UX design, and AI automation tailored for fast-moving businesses.",
};

export default async function ServicesDirectoryPage() {
  await connectDB();

  // Auto-seed for the first time if collection in MongoDB is completely empty
  const totalInDb = await Service.countDocuments();
  if (totalInDb === 0) {
    await Service.insertMany(DEFAULT_SERVICES);
  }

  let services = await Service.find({ isActive: true })
    .sort({ order: 1, createdAt: 1 })
    .lean();

  if (!services || services.length === 0) {
    services = DEFAULT_SERVICES as any;
  }

  const variants: ("blue" | "pink" | "yellow" | "default")[] = [
    "blue",
    "pink",
    "yellow",
    "default",
  ];

  return (
    <div className="min-h-screen bg-[#000000] text-white selection:bg-[#ff8804]/30 relative overflow-hidden">
      {/* Background glow overlay */}
      <div className="fixed inset-0 z-0 pointer-events-none flex items-center justify-center w-full h-full">
        <Image
          src="/gradient.png"
          alt="gradient background"
          fill
          style={{ objectFit: "cover" }}
          className="opacity-15"
          priority
        />
      </div>

      <Navbar />

      <main className="relative z-10 pt-36 pb-24 container mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="border border-white/10 bg-white/[0.03] backdrop-blur-md w-fit flex justify-center mx-auto px-4 py-1.5 rounded-full gap-2 items-center text-zinc-300 text-xs">
            <Star className="w-3.5 h-3.5 text-[#ff8804]" />
            <span>Enterprise & Growth Services</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-heading tracking-tight text-white font-extrabold">
            Engineered for Impact, Scaled for Growth
          </h1>

          <p className="text-base md:text-lg text-zinc-400 leading-relaxed">
            From modern web & mobile architectures to cutting-edge AI automation
            and strategic brand acceleration — discover our full spectrum of
            offerings.
          </p>
        </div>

        {/* Dynamic Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {services.map((svc: any, index: number) => {
            const slug =
              svc.slug || svc.title.toLowerCase().replace(/\s+/g, "-");
            const variant = variants[index % variants.length];

            return (
              <div key={svc._id || index} className="w-full">
                <Link href={`/services/${slug}`}>
                  <PixelCard
                    variant={variant}
                    className="w-full cursor-pointer hover:border-zinc-200/20 bg-zinc-900/30 font-primary min-h-[360px]"
                  >
                    <div className="absolute inset-0 justify-between p-8 bg-zinc-800/20 flex flex-col gap-5">
                      <div>
                        <div className="relative md:w-28 md:h-28 w-20 h-20 mb-3 flex items-center justify-start">
                          <Image
                            className="object-contain filter drop-shadow-md"
                            fill
                            sizes="(max-width: 768px) 80px, 112px"
                            src={svc.icon || "/card_icons/Icon.png"}
                            alt={svc.title}
                            loading="lazy"
                          />
                        </div>
                        <h2 className="text-2xl text-white font-bold mt-2 line-clamp-1">
                          {svc.title}
                        </h2>
                        <p className="text-zinc-400 text-sm mt-2 line-clamp-3 leading-relaxed">
                          {svc.description}
                        </p>
                      </div>

                      <p className="flex gap-2 text-white hover:text-[#ff8804] items-center text-sm font-medium mt-auto pt-2 transition-colors">
                        View Service Plan
                        <MoveRight size={16} />
                      </p>
                    </div>
                  </PixelCard>
                </Link>
              </div>
            );
          })}
        </div>

        {/* CTA Banner */}
        <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-zinc-900/80 via-[#181224]/80 to-zinc-900/80 p-8 md:p-12 text-center max-w-4xl mx-auto space-y-5 shadow-2xl">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Need a custom digital strategy or bespoke solution?
          </h2>
          <p className="text-zinc-400 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Our solution architects work side-by-side with your leadership team
            to evaluate requirements, scope roadmaps, and deploy with confidence.
          </p>
          <div className="pt-2">
            <Link href="/contact">
              <button className="px-8 py-3.5 rounded-full text-sm font-bold bg-gradient-to-r from-[#ff6a00] to-[#ee0979] text-white hover:opacity-95 shadow-lg shadow-orange-500/25 transition-all inline-flex items-center gap-2">
                <span>Schedule a Technical Discovery</span>
                <ArrowRight size={16} />
              </button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
