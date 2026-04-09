"use client";
import { useParams } from "next/navigation";

const ServiceLayoutPage = () => {
  const params = useParams();
  const service = params?.service as string;

  // Capitalize service name for matching
  const displayName = service
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <div className="h-screen relative flex flex-col w-full items-center justify-center pt-30 container mx-auto md:px-16 ">
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
        <h1 className="text-4xl md:text-6xl font-bold text-zinc-200 text-center tracking-wide">
          Welcome to {displayName}
        </h1>
      </div>
    </div>
  );
};

export default ServiceLayoutPage;
