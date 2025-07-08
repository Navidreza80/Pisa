"use client";

import Image from "next/image";
import { useState } from "react";

interface FallbackImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
}

export default function FallbackImage({
  src,
  alt,
  className,
  fallbackSrc = "https://via.placeholder.com/150",
}: FallbackImageProps) {
  const [imgSrc, setImgSrc] = useState(src);

  const handleError = () => {
    setImgSrc(fallbackSrc);
  };

  return (
    <Image
      fill
      unoptimized
      src={imgSrc}
      alt={alt}
      className={className}
      onError={handleError}
    />
  );
}
