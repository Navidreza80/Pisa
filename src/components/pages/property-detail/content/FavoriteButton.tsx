"use client";

import { useHandleAuth } from "@/utils/hooks/useAuth";
import useFavorite from "@/utils/hooks/useFavorite";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const FavoriteButton = ({
  className,
  favorite,
  favoriteId,
  houseId,
}: {
  className: string;
  favorite: boolean;
  favoriteId: string | null;
  houseId: string;
}) => {
  const router = useRouter();
  const { handler } = useHandleAuth();
  const [isFavorite, setIsFavorite] = useState(favorite);
  const { handleFavorite } = useFavorite(
    isFavorite,
    houseId,
    favoriteId,
    () => {
      router.refresh();
      setIsFavorite((prev: boolean) => !prev);
    }
  );

  return (
    <button
      onClick={() => handler(() => handleFavorite())}
      className={`${isFavorite ? "bg-primary" : "bg-white"} ${className} cursor-pointer absolute z-10 py-1 px-3 hover:scale-105 hover:animate-rotate-y transition-all duration-300 w-10 aspect-square rounded-full flex justify-center items-center`}
    >
      <Heart className={`${isFavorite ? "text-white" : "text-black"}`} />
    </button>
  );
};
export default FavoriteButton;
