import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | CrevoSys",
  description:
    "Get in touch with CrevoSys today to discuss your next digital project, request a consultation, and discover how our solutions can accelerate your business.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
