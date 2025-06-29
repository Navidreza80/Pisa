"use client";

import { Star, StarHalf, StarOff } from "lucide-react";

type Props = {
  rating: number;
  size?: number;
};

export default function StarDisplay({ rating, size = 20 }: Props) {
  const stars = Array.from({ length: 5 }, (_, index) => {
    const full = index + 1 <= rating;
    const half = !full && index + 0.5 < rating;

    if (full)
      return (
        <Star
          key={index}
          size={size}
          className="text-yellow-400 fill-yellow-400"
        />
      );
    if (half)
      return (
        <StarHalf
          key={index}
          size={size}
          className="text-yellow-400 fill-yellow-400"
        />
      );
    return <StarOff key={index} size={size} className="text-gray-300" />;
  });

  return <div dir="ltr" className="flex gap-1">{stars}</div>;
}
