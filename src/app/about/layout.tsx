import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | CrevoSys",
  description:
    "Learn about CrevoSys, our mission, vision, and elite engineering team dedicated to crafting transformative digital products and enterprise software solutions.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
