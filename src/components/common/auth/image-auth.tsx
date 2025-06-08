// Next
import Image from "next/image";

// Types
import type ImageAuthProps from "@/types/auth";

/**
 * Reusable image component to display images in gallery
 *
 * @component
 * @param {ImageAuthProps} props - Component props
 * @returns {JSX.Element} - Rendered auth image
 */

function ImageAuth({ imageSrc, imageTitle }: ImageAuthProps) {
  return (
    <div className="absolute bg-[#a1a1a1] inset-0 overflow-hidden rounded-[32px]">
      <Image
        fill
        src={imageSrc}
        alt={imageTitle}
        className="object-cover fill"
        priority
        quality={100}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 100vw"
      />
    </div>
  );
}

export default ImageAuth;
