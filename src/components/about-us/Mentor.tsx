// React
import React from "react";

// Dependencies
import { useTranslations } from "next-intl";

// Images
import FallbackImage from "@/components/common/FallbackImage";
import sobhan from "@/assets/images/about-us/sobhan.jpg";
import Link from "next/link";
import GithubSVG from "../common/svg/github";
import LinkedinSVG from "../common/svg/linkedin";

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
      className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900 dark:to-indigo-900 p-8 rounded-2xl shadow-lg mb-[20px]"
    >
      <div className="flex flex-col md:flex-row items-center gap-8">
        <FallbackImage
          src={sobhan.src}
          alt={t("mentor")}
          className="w-40 h-40 object-cover rounded-full shadow-lg border-4 border-white"
          fallbackSrc="https://via.placeholder.com/150"
        />
        <div>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
            {t("mentor")}
          </h3>
          <p className="text-blue-600 dark:text-blue-400 font-semibold mb-4">
            {t("mentorTitle")}
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {t("mentorDesc")}
          </p>
          <div className="flex gap-4">
            <Link
              href="https://github.com/sobhan"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-600 transition"
            >
              <GithubSVG />
            </Link>

            <Link
              href="https://linkedin.com/in/sobhan"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-600 transition"
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
