/**
 * Centralized Animation Configuration & Responsive Utilities
 *
 * Enforces our mobile performance rule:
 * - Desktop and Tablet (>= 768px with fine pointer): Full rich animation experience (GSAP, ScrollTrigger, Lenis).
 * - Mobile (< 768px), iOS touch devices, & prefers-reduced-motion: ALL GSAP/ScrollTrigger
 *   animations are completely disabled. Content is visible immediately in its final state.
 */

export const BREAKPOINT_MD = 768;

export const DESKTOP_MEDIA_QUERY = "(min-width: 768px) and (prefers-reduced-motion: no-preference)";
export const MOBILE_MEDIA_QUERY = "(max-width: 767.98px), (prefers-reduced-motion: reduce)";

export const isClient = typeof window !== "undefined";

/**
 * Returns true for ANY mobile or touch-first device.
 * This deliberately catches iPhones, iPads, Android phones, and iPad-with-keyboard.
 */
export const isMobileDevice = (): boolean => {
  if (!isClient) return false;
  return (
    window.innerWidth < BREAKPOINT_MD ||
    window.matchMedia("(max-width: 767.98px)").matches ||
    window.matchMedia("(pointer: coarse)").matches ||
    /iPhone|iPod|iPad|Android/i.test(navigator.userAgent) ||
    (navigator.maxTouchPoints > 1 && /Macintosh/i.test(navigator.userAgent))
  );
};

export const prefersReducedMotion = (): boolean => {
  if (!isClient) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

/**
 * Master gate: returns true ONLY on desktop with fine pointer and no reduced motion.
 * Every GSAP animation hook must check this FIRST and bail out immediately if false.
 */
export const shouldRunAnimations = (): boolean => {
  return !isMobileDevice() && !prefersReducedMotion();
};
