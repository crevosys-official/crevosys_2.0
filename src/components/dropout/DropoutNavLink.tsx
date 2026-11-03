"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export type DropoutLink = {
  label: string;
  href: string;
  icon?: React.ReactNode;
  external?: boolean;
  textClassName?: string;
};

interface DropoutNavLinkProps {
  link: DropoutLink;
  onClick?: () => void;
}

export const DropoutNavLink = React.forwardRef<HTMLAnchorElement, DropoutNavLinkProps>(
  ({ link, onClick }, ref) => {
    const isExternal =
      link.external ||
      link.href.startsWith("http") ||
      link.href.startsWith("mailto:") ||
      link.href.startsWith("tel:");

    const linkContent = (
      <>
        {/* 32px x 32px Rounded Square Directional Arrow Box */}
        <span className="dropout-arrow-box shadow-sm" aria-hidden="true">
          {link.icon ? (
            link.icon
          ) : (
            <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
          )}
        </span>

        {/* Bold Navigation Label */}
        <span className={`dropout-navlink-text font-sans ${link.textClassName || ""}`}>
          {link.label}
        </span>
      </>
    );

    return (
      <div className="dropout-link-wrapper nav-link-item">
        {isExternal ? (
          <a
            ref={ref}
            href={link.href}
            onClick={onClick}
            target={link.href.startsWith("http") ? "_blank" : undefined}
            rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="dropout-navlink group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f47920] rounded-lg"
          >
            {linkContent}
          </a>
        ) : (
          <Link
            ref={ref}
            href={link.href}
            onClick={onClick}
            className="dropout-navlink group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f47920] rounded-lg"
          >
            {linkContent}
          </Link>
        )}
      </div>
    );
  }
);

DropoutNavLink.displayName = "DropoutNavLink";

export default DropoutNavLink;

