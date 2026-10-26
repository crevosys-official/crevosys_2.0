"use client";

import React from "react";
import { CldImage, CldImageProps } from "next-cloudinary";
import Image from "next/image";

export interface CloudinaryImageProps extends Omit<CldImageProps, "src"> {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

/**
 * Universal image component that renders CldImage for Cloudinary public IDs,
 * and falls back to Next Image for standard URLs / local paths.
 */
export default function CloudinaryImage({
  src,
  alt,
  width = 500,
  height = 500,
  className,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
  quality,
  ...props
}: CloudinaryImageProps) {
  // If it's a local path or external non-cloudinary URL, use Next.js Image
  const isLocalOrExternal =
    src.startsWith("/") ||
    src.startsWith("http://") ||
    src.startsWith("https://");

  if (isLocalOrExternal) {
    const nextQuality =
      typeof quality === "number"
        ? quality
        : typeof quality === "string" && !isNaN(Number(quality))
        ? Number(quality)
        : undefined;

    return (
      <Image
        src={src}
        alt={alt}
        width={Number(width)}
        height={Number(height)}
        className={className}
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        sizes={sizes}
        quality={nextQuality}
      />
    );
  }

  return (
    <CldImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      sizes={sizes}
      quality={quality}
      crop={{
        type: "auto",
        source: true,
      }}
      {...props}
    />
  );
}
