import { useTranslations } from "next-intl";
import FallbackImage from "@/components/common/FallbackImage";
import sobhan from "@/assets/images/about-us/sobhan.jpg";
import Link from "next/link";
import GithubSVG from "@/components/common/svg/github";
import LinkedinSVG from "@/components/common/svg/linkedin";
import React from "react";

/**
 * About us mentor section card
 *
 * @component
 * @returns {JSX.Element} - Rendered about us mentor card
 */

function Mentor() {
  // Hooks
  const t = useTranslations("AboutUs");
  return (
    <div
      dir="rtl"
      className="bg-surface p-8 rounded-2xl mb-[20px]"
    >
      <div className="flex flex-col md:flex-row items-center gap-8">
        <FallbackImage
          src={sobhan.src}
          alt={t("mentor")}
          className="w-40 h-40 object-cover rounded-full shadow-lg border-4 border-border"
          fallbackSrc="https://via.placeholder.com/150"
        />
        <div>
          <h3 className="text-2xl font-bold mb-2">{t("mentor")}</h3>
          <p className="text-primary font-semibold mb-4">{t("mentorTitle")}</p>
          <p className="mb-4">{t("mentorDesc")}</p>
          <div className="flex gap-4">
            <Link
              href="https://github.com/sobhan"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-all duration-300"
            >
              <GithubSVG />
            </Link>

            <Link
              href="https://linkedin.com/in/sobhan"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-all duration-300"
            >
              <LinkedinSVG />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Mentor);
