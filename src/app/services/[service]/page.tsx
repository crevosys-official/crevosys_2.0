"use client";
import { useParams } from "next/navigation";

const ServiceDetailPage = () => {
  const params = useParams();
  const service = params?.service as string;

  // make the params capitalized
  const displayName = service
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold">You are in the {displayName} page</h1>
    </div>
  );
};

export default ServiceDetailPage;
