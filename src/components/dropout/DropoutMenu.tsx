"use client";

import React from "react";
import {
  MapPin,
  Phone,
  Mail,
  Github,
  Linkedin,
  Instagram,
  Facebook,
} from "lucide-react";
import { DropoutNavLink, DropoutLink } from "./DropoutNavLink";

export const DEFAULT_DROPOUT_LINKS: DropoutLink[] = [
  // Column 1: Primary Navigation
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Our Works", href: "/#portfolio" },
  { label: "Contact Us", href: "/contact" },

  // Column 2: Agency Services
  { label: "Development", href: "/services/development" },
  { label: "UI/UX Design", href: "/services/design" },
  { label: "AI Automation", href: "/services/automation" },
  { label: "Growth Marketing", href: "/services/marketing" },
];

export const CONTACT_INFO = {
  location: {
    label: "Dhaka, Bangladesh",
    href: "https://maps.google.com/?q=Dhaka,+Bangladesh",
  },
  phone: {
    label: "+88 01855245281",
    href: "tel:+8801855245281",
  },
  email: {
    label: "crevosysofficial@gmail.com",
    href: "mailto:crevosysofficial@gmail.com",
  },
  socials: [
    {
      name: "GitHub",
      href: "https://github.com/crevosys-official",
      icon: Github,
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/crevosys-official/",
      icon: Linkedin,
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/crevosys",
      icon: Instagram,
    },
    {
      name: "Facebook",
      href: "https://www.facebook.com/CrevoSys",
      icon: Facebook,
    },
  ],
};

interface DropoutMenuProps {
  links?: DropoutLink[];
  isOpen: boolean;
  onLinkClick?: () => void;
}

export const DropoutMenu = React.forwardRef<HTMLDivElement, DropoutMenuProps>(
  ({ links = DEFAULT_DROPOUT_LINKS, isOpen, onLinkClick }, ref) => {
    // If custom links array with more than 8 items is explicitly passed, support it
    const isCustomLinks = links !== DEFAULT_DROPOUT_LINKS && links.length > 8;
    const totalLinks = links.length;
    const itemsPerCol = Math.ceil(totalLinks / 3);
    const col1 = isCustomLinks ? links.slice(0, itemsPerCol) : links.slice(0, 4);
    const col2 = isCustomLinks ? links.slice(itemsPerCol, itemsPerCol * 2) : links.slice(4, 8);
    const col3 = isCustomLinks ? links.slice(itemsPerCol * 2) : [];

    return (
      <div
        ref={ref}
        id="dropout-nav-menu"
        className={`nav-inner fixed top-0 left-0 w-full z-10 bg-[#0d0e11] text-white border-b border-white/[0.08] transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!isOpen}
      >
        <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 md:px-12 pt-28 sm:pt-32 md:pt-36 pb-8 sm:pb-12 flex flex-col justify-between">
          {/* Three Navigation Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
            {/* Column 1: Primary Navigation */}
            <div className="flex flex-col space-y-1 sm:space-y-2">
              <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-white/40 mb-1 select-none">
                Navigation
              </span>
              {col1.map((link) => (
                <DropoutNavLink
                  key={link.href + link.label}
                  link={link}
                  onClick={onLinkClick}
                />
              ))}
            </div>

            {/* Column 2: Agency Services */}
            <div className="flex flex-col space-y-1 sm:space-y-2">
              <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-white/40 mb-1 select-none">
                Services
              </span>
              {col2.map((link) => (
                <DropoutNavLink
                  key={link.href + link.label}
                  link={link}
                  onClick={onLinkClick}
                />
              ))}
            </div>

            {/* Column 3: Contact Info & Social Media Handles */}
            <div className="flex flex-col space-y-1 sm:space-y-2">
              <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-white/40 mb-1 select-none">
                Get in Touch
              </span>

              {isCustomLinks && col3.length > 0 ? (
                col3.map((link) => (
                  <DropoutNavLink
                    key={link.href + link.label}
                    link={link}
                    onClick={onLinkClick}
                  />
                ))
              ) : (
                <>
                  {/* Line 1: Location */}
                  <DropoutNavLink
                    link={{
                      label: CONTACT_INFO.location.label,
                      href: CONTACT_INFO.location.href,
                      icon: <MapPin className="w-4 h-4 stroke-[2.5]" />,
                      external: true,
                      textClassName:
                        "!text-[1.25rem] sm:!text-[1.45rem] md:!text-[1.65rem] lg:!text-[1.85rem]",
                    }}
                    onClick={onLinkClick}
                  />

                  {/* Line 2: Phone Number */}
                  <DropoutNavLink
                    link={{
                      label: CONTACT_INFO.phone.label,
                      href: CONTACT_INFO.phone.href,
                      icon: <Phone className="w-4 h-4 stroke-[2.5]" />,
                      external: true,
                      textClassName:
                        "!text-[1.25rem] sm:!text-[1.45rem] md:!text-[1.65rem] lg:!text-[1.85rem]",
                    }}
                    onClick={onLinkClick}
                  />

                  {/* Line 3: Email */}
                  <DropoutNavLink
                    link={{
                      label: CONTACT_INFO.email.label,
                      href: CONTACT_INFO.email.href,
                      icon: <Mail className="w-4 h-4 stroke-[2.5]" />,
                      external: true,
                      textClassName:
                        "!text-[1.05rem] sm:!text-[1.2rem] md:!text-[1.35rem] lg:!text-[1.45rem] xl:!text-[1.55rem]",
                    }}
                    onClick={onLinkClick}
                  />

                  {/* Line 4: Social Media Handles Icons (GitHub, LinkedIn, Instagram, Facebook) */}
                  <div className="dropout-link-wrapper nav-link-item !overflow-visible">
                    <div className="flex items-center gap-3 sm:gap-4 py-1">
                      {CONTACT_INFO.socials.map((social) => {
                        const Icon = social.icon;
                        return (
                          <a
                            key={social.name}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Follow CrevoSys on ${social.name}`}
                            className="group/social w-10 h-10 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-white/[0.06] hover:bg-[#f47920] border border-white/10 hover:border-[#f47920] text-zinc-300 hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(244,121,32,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f47920]"
                          >
                            <Icon className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover/social:scale-110" />
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

DropoutMenu.displayName = "DropoutMenu";

export default DropoutMenu;
