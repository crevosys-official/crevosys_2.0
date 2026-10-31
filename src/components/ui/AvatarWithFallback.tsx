"use client";

import React, { useState } from "react";
import Image, { ImageProps } from "next/image";

interface AvatarWithFallbackProps extends Omit<ImageProps, "onError"> {
  fallbackText?: string;
  glowSrc?: string;
  containerClassName?: string;
}

export function getInitials(name?: string): string {
  if (!name) return "CS";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function AvatarWithFallback({
  src,
  alt,
  glowSrc,
  fallbackText,
  className = "",
  containerClassName = "",
  ...props
}: AvatarWithFallbackProps) {
  const [error, setError] = useState(false);
  const [glowError, setGlowError] = useState(false);

  if (error || !src) {
    return (
      <div
        className={`w-full h-full flex items-center justify-center font-bold text-[10px] sm:text-xs bg-gradient-to-br from-zinc-800 to-zinc-950 text-zinc-200 select-none border border-white/10 ${className}`}
        title={alt || fallbackText}
      >
        {getInitials(fallbackText || alt)}
      </div>
    );
  }

  return (
    <>
      <Image
        src={src}
        alt={alt || "Avatar"}
        onError={() => setError(true)}
        className={`${className} ${glowSrc && !glowError ? "transition-opacity duration-300 group-hover:opacity-0" : ""}`}
        {...props}
      />
      {glowSrc && !glowError && (
        <Image
          src={glowSrc}
          alt={alt || "Avatar Glow"}
          onError={() => setGlowError(true)}
          className={`w-full h-full object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${className}`}
          {...props}
        />
      )}
    </>
  );
}
