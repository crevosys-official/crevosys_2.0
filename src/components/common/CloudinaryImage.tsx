"use client";

import React from "react";
import { CldImage, CldImageProps } from "next-cloudinary";
import Image from "next/image";

export interface CloudinaryImageProps extends Omit<CldImageProps, "src"> {
  src: string;
  alt: string;
  className?: string;
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
  ...props
}: CloudinaryImageProps) {
  // If it's a local path or external non-cloudinary URL, use Next.js Image
  const isLocalOrExternal =
    src.startsWith("/") ||
    src.startsWith("http://") ||
    src.startsWith("https://");

  if (isLocalOrExternal) {
    // If it is a Cloudinary hosted URL, we can still extract the public ID or render with Next.js Image
    return (
      <Image
        src={src}
        alt={alt}
        width={Number(width)}
        height={Number(height)}
        className={className}
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
      crop={{
        type: "auto",
        source: true,
      }}
      {...props}
    />
  );
}
