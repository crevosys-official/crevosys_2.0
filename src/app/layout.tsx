import type { Metadata } from "next";
import { Inter_Tight, Bebas_Neue, Anton } from "next/font/google";
import "./globals.css";
import { ReactLenis } from "@/lib/lenis";
import { Toaster } from "@/components/ui/sonner";
import Preloader from "@/components/ui/Preloader";
import ScrollToTop from "@/components/layout/ScrollToTop";

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-primary",
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-secondary",
  display: "swap",
});

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CrevoSys | Digital Product Agency & Software Solutions",
  description:
    "CrevoSys empowers businesses with bespoke digital solutions, high-performance web development, modern UI/UX design, and intelligent AI automation services.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link
          rel="preload"
          href="/assets/fonts/headingNow57.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <ReactLenis root>
        <body
          className={`${interTight.variable} ${bebasNeue.variable} ${anton.variable} antialiased`}
        >
          <Preloader />
          {children}
          <ScrollToTop />
          <Toaster />
        </body>
      </ReactLenis>
    </html>
  );
}
