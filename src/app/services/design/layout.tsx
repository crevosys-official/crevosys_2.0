import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "UI/UX & Product Design Services | CrevoSys",
  description:
    "Elevate your brand with CrevoSys's award-winning UI/UX design services, interactive prototyping, comprehensive design systems, and digital experiences.",
};

export default function DesignLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
