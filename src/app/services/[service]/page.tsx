import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { connectDB } from "@/lib/mongodb";
import { Service } from "@/models/Service";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PixelCard from "@/components/animation/PlexCard";
import { Button } from "@/components/ui/button";
import { DEFAULT_SERVICES } from "@/data/defaultServices";
import {
  Star,
  Rocket,
  CheckCircle2,
  Zap,
  ShieldCheck,
  Cpu,
  ArrowRight,
  Layers,
  ChevronRight,
} from "lucide-react";

interface ServicePageProps {
  params: Promise<{ service: string }>;
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { service: slug } = await params;
  await connectDB();

  const totalInDb = await Service.countDocuments();
  if (totalInDb === 0) {
    await Service.insertMany(DEFAULT_SERVICES);
  }

  const service = await Service.findOne({ slug: slug.toLowerCase() }).lean();

  if (!service) {
    return {
      title: "Service Not Found | Crevosys",
    };
  }

  return {
    title: `${service.title} | Crevosys`,
    description: service.description,
    openGraph: {
      title: `${service.title} | Crevosys`,
      description: service.description,
      images: service.icon ? [{ url: service.icon }] : undefined,
    },
  };
}

export default async function DynamicServicePage({ params }: ServicePageProps) {
  const { service: slug } = await params;
  await connectDB();

  const totalInDb = await Service.countDocuments();
  if (totalInDb === 0) {
    await Service.insertMany(DEFAULT_SERVICES);
  }

  const service = await Service.findOne({
    slug: slug.toLowerCase(),
  }).lean();

  if (!service) {
    notFound();
  }

  const capabilities = [
    {
      title: `Custom ${service.title} Architecture`,
      description: `Bespoke solutions and scalable architecture engineered precisely for your unique organizational requirements.`,
      icon: service.icon || "/card_icons/Icon.png",
    },
    {
      title: "Performance & Optimization",
      description: `High-velocity execution and enterprise reliability engineered to maximize throughput and conversion rates.`,
      icon: "/card_icons/Marketing.png",
    },
    {
      title: "Seamless Integration & Scalability",
      description: `Effortless integration into your tech stack with complete forward-compatibility and resilient cloud infrastructure.`,
      icon: "/card_icons/automation.png",
    },
    {
      title: "End-to-End Strategic Support",
      description: `Continuous monitoring, iteration, and technical stewardship from Crevosys engineers and solution architects.`,
      icon: "/card_icons/Design.png",
    },
  ];

  const processSteps = [
    {
      title: "Discovery & Blueprint",
      desc: "Deep-dive assessment of your objectives, user requirements, and technical constraints to formulate an actionable execution roadmap.",
      icon: <CheckCircle2 className="w-6 h-6 text-[#ff8804]" />,
    },
    {
      title: "Design & Architecture",
      desc: "Creating robust architecture diagrams, prototypes, and engineering specifications ensuring future scalability.",
      icon: <Layers className="w-6 h-6 text-[#ff8804]" />,
    },
    {
      title: "Iterative Build & Verification",
      desc: "Rapid agile sprint execution with continuous testing, strict quality assurance, and automated deployment pipelines.",
      icon: <Zap className="w-6 h-6 text-[#ff8804]" />,
    },
    {
      title: "Deployment & Growth",
      desc: "Production launch with active telemetry, performance optimization, and proactive maintenance.",
      icon: <ShieldCheck className="w-6 h-6 text-[#ff8804]" />,
    },
  ];

  const cardVariants: ("blue" | "default" | "yellow" | "pink")[] = [
    "blue",
    "pink",
    "yellow",
    "default",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-t from-[#070707] via-[#090912] to-[#121124] text-white selection:bg-[#ff8804]/30 relative overflow-hidden">
      {/* Background overlay */}
      <div className="fixed inset-0 z-0 pointer-events-none flex items-center justify-center w-full h-full">
        <Image
          src="/gradient.webp"
          alt="gradient background"
          fill
          style={{ objectFit: "cover" }}
          className="opacity-15"
        />
      </div>

      <Navbar />

      <main className="relative z-10 pt-32 pb-24">
        {/* Breadcrumb Navigation */}
        <div className="container mx-auto px-6 mb-8">
          <nav className="flex items-center gap-2 text-xs text-zinc-500 font-mono">
            <Link href="/" className="hover:text-zinc-300 transition-colors">
              Home
            </Link>
            <ChevronRight size={13} className="text-zinc-600" />
            <Link
              href="/#services"
              className="hover:text-zinc-300 transition-colors"
            >
              Services
            </Link>
            <ChevronRight size={13} className="text-zinc-600" />
            <span className="text-[#ff8804] font-medium">{service.title}</span>
          </nav>
        </div>

        {/* Hero Section */}
        <section className="container mx-auto px-6 mb-16 text-center">
          <div className="flex flex-col gap-6 max-w-4xl mx-auto items-center">
            {/* Badge */}
            <div className="border border-white/10 bg-white/[0.03] backdrop-blur-md w-fit flex justify-center mx-auto px-4 py-1.5 rounded-full gap-2 items-center text-zinc-300 text-xs shadow-[0_0_15px_rgba(255,136,4,0.1)]">
              <Star className="w-3.5 h-3.5 text-[#ff8804]" />
              <span>{service.title} Excellence</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-heading tracking-tight text-white font-extrabold leading-tight">
              Next-Generation{" "}
              <span className="bg-gradient-to-r from-[#ff8804] via-[#ee0979] to-[#9333ea] bg-clip-text text-transparent">
                {service.title}
              </span>{" "}
              for High-Growth Teams
            </h1>

            {/* Description */}
            <p className="w-full max-w-2xl text-base md:text-lg tracking-normal text-zinc-400 text-center leading-relaxed">
              {service.description}
            </p>

            {/* Call to actions */}
            <div className="flex flex-wrap justify-center items-center gap-4 mt-4">
              <Link href={`/contact?service=${encodeURIComponent(service.title)}`}>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#ff6a00] to-[#ee0979] hover:opacity-95 text-white font-bold rounded-full px-8 shadow-[0_0_25px_rgba(255,106,0,0.35)] transition-all hover:scale-[1.02]"
                >
                  Book a Consultation
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </Link>
              <Link href="/#services">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/15 bg-white/[0.04] hover:bg-white/[0.08] text-zinc-200 rounded-full px-7"
                >
                  Explore All Services
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Capabilities Section */}
        <section className="py-14 container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-xl">
              <span className="text-xs font-mono uppercase tracking-wider text-[#ff8804]">
                Capabilities & Scope
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mt-1 text-white tracking-tight">
                What We Deliver
              </h2>
              <p className="text-zinc-400 text-sm md:text-base mt-2">
                Delivering high-impact solutions with best-in-class performance,
                robust architecture, and modern UX.
              </p>
            </div>
            <Link
              href="/#services"
              className="flex items-center gap-2 text-[#ff8804] font-medium hover:text-orange-300 transition-colors text-sm"
            >
              Back to all services <Rocket className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {capabilities.map((item, index) => {
              const variant = cardVariants[index % cardVariants.length];
              return (
                <div key={index} className="w-full">
                  <PixelCard
                    variant={variant}
                    className="w-full cursor-pointer hover:border-zinc-200/20 bg-zinc-900/30 font-primary min-h-[320px]"
                  >
                    <div className="absolute inset-0 justify-between p-8 bg-zinc-800/20 flex flex-col gap-5">
                      <div>
                        <div className="w-16 h-16 rounded-2xl bg-zinc-900/80 border border-white/10 p-3 mb-4 flex items-center justify-center">
                          <Image
                            className="w-full h-full object-contain filter brightness-110"
                            height={64}
                            width={64}
                            src={item.icon || service.icon || "/card_icons/Icon.png"}
                            alt={item.title}
                            loading="lazy"
                          />
                        </div>
                        <h3 className="text-xl text-white font-semibold line-clamp-2">
                          {item.title}
                        </h3>
                        <p className="text-gray-400 text-sm mt-3 leading-relaxed line-clamp-4">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </PixelCard>
                </div>
              );
            })}
          </div>
        </section>

        {/* Process Roadmap Section */}
        <section className="py-20 bg-zinc-900/20 backdrop-blur-sm border-y border-white/5 my-12">
          <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#ff8804]">
                Methodology
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mt-1 mb-8 text-white tracking-tight">
                Our Proven Execution Process
              </h2>
              <div className="space-y-6">
                {processSteps.map((step, idx) => (
                  <div key={idx} className="flex gap-4 items-start">
                    <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                      {step.icon}
                    </div>
                    <div>
                      <h4 className="text-base font-semibold text-white">
                        {step.title}
                      </h4>
                      <p className="text-zinc-400 text-xs md:text-sm mt-1 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Spotlight Visual Card */}
            <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-zinc-950 p-8 shadow-2xl flex flex-col justify-between min-h-[380px]">
              <div className="space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center p-3">
                  <Image
                    src={service.icon || "/card_icons/Icon.png"}
                    alt={service.title}
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                </div>
                <div className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#ff8804]">
                  Production-Ready
                </div>
                <h3 className="text-2xl font-bold text-white">
                  Ready to transform your vision into reality?
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Collaborate directly with senior engineers and product designers
                  at Crevosys to accelerate your product timeline.
                </p>
              </div>

              <div className="pt-6 border-t border-white/10">
                <Link
                  href={`/contact?service=${encodeURIComponent(service.title)}`}
                >
                  <Button className="w-full bg-gradient-to-r from-[#ff6a00] to-[#ee0979] text-white font-bold py-3 rounded-xl hover:opacity-95 shadow-lg shadow-orange-500/20">
                    Initiate Project Discussion
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
