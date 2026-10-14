/**
 * Centralized Animation Configuration & Responsive Utilities
 *
 * Enforces our mobile performance rule:
 * - Desktop and Tablet (>= 768px): Full rich animation experience (GSAP, ScrollTrigger, Lenis).
 * - Mobile (< 768px) & prefers-reduced-motion: Nonessential animations are completely disabled.
 *   Content is visible immediately in its final state.
 */

export const BREAKPOINT_MD = 768;

export const DESKTOP_MEDIA_QUERY = "(min-width: 768px) and (prefers-reduced-motion: no-preference)";
export const MOBILE_MEDIA_QUERY = "(max-width: 767.98px), (prefers-reduced-motion: reduce)";

export const isClient = typeof window !== "undefined";

export const isMobileDevice = (): boolean => {
  if (!isClient) return false;
  return (
    window.innerWidth < 768 ||
    window.matchMedia("(max-width: 767.98px)").matches ||
    window.matchMedia("(hover: none) and (pointer: coarse) and (max-height: 500px)").matches ||
    /Android.*Mobile|iPhone|iPod/i.test(navigator.userAgent)
  );
};

export const prefersReducedMotion = (): boolean => {
  if (!isClient) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

export const shouldRunAnimations = (): boolean => {
  return !isMobileDevice() && !prefersReducedMotion();
};
