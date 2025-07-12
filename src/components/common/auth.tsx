"use client";
// Dependencies
import { useTranslations } from "next-intl";

// SVGs
import MapSVG from "./svg/map";
import Comment from "./auth/comments";

// Images
import jangal from "@/assets/images/auth/jangal.png";
import ImageAuth from "./auth/image-auth";

/**
 * Auth pages repeated part showing user comments and locations images.
 *
 * @component
 * @returns {JSX.Element} - Rendered auth.
 */

export default function Auth() {
  // Hooks
  const t = useTranslations("Auth");

  return (
    <div className="max-[1300px]:hidden h-[calc(100vh-32px)] animate-fade-right w-full">
      <div className="relative max-w-[704px] h-full w-full">
        {/* Left side image slider */}
        <ImageAuth imageTitle={"Golestan"} imageSrc={jangal} />
        <div className="flex bg-[#0000004e] gap-2 absolute top-5 right-5 z-10 p-[5px] rounded-[8px]">
          <h1 className="text-white text-sm font-bold drop-shadow-md">
            {t("golestan")}
          </h1>
          <MapSVG />
        </div>

        <div className="w-full absolute bottom-5 right-0 z-10">
          {/* Comments section */}
          <Comment />
        </div>
      </div>
    </div>
  );
}
