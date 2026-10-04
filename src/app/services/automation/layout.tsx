import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI & Business Automation Services | CrevoSys",
  description:
    "Streamline complex workflows and scale operations with CrevoSys AI automation services, intelligent process automation, and custom algorithmic integrations.",
};

export default function AutomationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
