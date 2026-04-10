import { notFound } from "next/navigation";

const CatchAllServicePage = () => {
  // Since we have specific folders for development, marketing, design, and automation,
  // any other route that hits this dynamic [service] segment should 404.
  notFound();
};

export default CatchAllServicePage;
