import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leadership & Team | CrevoSys",
  description:
    "Meet the visionary creators, engineers, and designers behind CrevoSys who bring passion, innovation, and technical excellence to every client partnership.",
};

export default function TeamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
