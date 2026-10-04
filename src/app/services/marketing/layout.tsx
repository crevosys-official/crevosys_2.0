import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Growth & Digital Marketing Services | CrevoSys",
  description:
    "Supercharge your brand reach with CrevoSys performance marketing, targeted campaigns, conversion rate optimization, and data-driven customer acquisition.",
};

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
