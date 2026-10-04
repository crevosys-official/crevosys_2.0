import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Web & Software Development Services | CrevoSys",
  description:
    "Build scalable, robust web applications with CrevoSys full-stack software development, modern frontend architectures, and high-performance cloud backends.",
};

export default function DevelopmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
