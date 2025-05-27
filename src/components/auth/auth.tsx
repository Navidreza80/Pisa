"use client";
// Dependencies
import { useTranslations } from "next-intl";

// SVGs
import MapSVG from "../common/svg/map";
import Comment from "./common/comments";

// Images
import jangal from "@/assets/images/auth/jangal.png";
import ImageAuth from "./common/image-auth";

/**
 * Auth pages repeated part showing user comments and locations images.
 *
 * @component
 * @returns {JSX.Element} - Rendered auth.
 */

export default function Auth() {
  // Hooks
  const t = useTranslations("Auth");
  const natureImages = [
    {
      src: jangal,
      title: t("golestan"),
    },
    {
      src: "https://siahkaman.com/mag/wp-content/uploads/2023/02/%DA%A9%D9%88%DB%8C%D8%B1-%D9%85%D8%B1%D9%86%D8%AC%D8%A7%D8%A8-_IranDoostan.jpg",
      title: t("maranjab"),
    },
    {
      src: "https://s3.khf.nz/img/hK1OhaN5etQ,/lrgthumb",
      title: t("caspian"),
    },
    {
      src: "https://shahrvandonline.ir/wp-content/uploads/2022/08/%D8%AF%D9%85%D8%A7%D9%88%D9%86%D8%AF-3.jpg",
      title: t("damavand"),
    },
  ];
  const currentImageIndex = Math.floor(Math.random() * natureImages.length);

  const currentImage = natureImages[currentImageIndex];

  return (
    <div className="max-[1300px]:hidden h-[calc(100vh-32px)] animate-fade-right w-full">
      <div className="relative max-w-[704px] h-full w-full">
        {/* Left side image slider */}
        <ImageAuth imageTitle={"گلستان"} imageSrc={jangal} />
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
