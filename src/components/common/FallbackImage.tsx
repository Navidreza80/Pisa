'use client';

import { useState } from 'react';

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
  fallbackSrc = 'https://via.placeholder.com/150'
}: FallbackImageProps) {
  const [imgSrc, setImgSrc] = useState(src);

  const handleError = () => {
    setImgSrc(fallbackSrc);
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={handleError}
    />
  );
}