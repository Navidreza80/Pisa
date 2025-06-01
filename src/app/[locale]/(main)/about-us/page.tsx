"use client";

// Next & React
import Link from "next/link";

// Dependencies
import "leaflet/dist/leaflet.css";
import { useTranslations } from "next-intl";

// Images
import elmira from "@/assets/images/about-us/elmira.jpg";
import navid from "@/assets/images/about-us/navid.jpg";
import taha from "@/assets/images/about-us/taha.jpg";
import nextElites from "@/assets/images/landing/rank.jpg";

// Third party components
import Features from "@/components/about-us/Features";
import Mentor from "@/components/about-us/Mentor";
import ProfileNextElites from "@/components/about-us/profile-next-elites";
import Question from "@/components/about-us/questions";

export default function AboutUs() {
  // Hooks
  const t = useTranslations("AboutUs");

  return (
    <main className="min-h-screen py-[20px] px-4 dark:bg-gray-900">
      <div className="container mx-auto">
        {/* Hero section */}
        <div className="mb-20 max-w-6xl mx-auto">
          {/* Mentor section */}
          <Mentor />
          {/* Our team section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ProfileNextElites
              name={t("navid")}
              job={t("frontendDeveloper")}
              profile={navid.src}
            />
            <ProfileNextElites
              name={t("taha")}
              job={t("frontendDeveloper")}
              profile={taha.src}
            />
            <ProfileNextElites
              name={t("elmira")}
              job={t("frontendDeveloper")}
              profile={elmira.src}
            />
          </div>
        </div>

        {/* Our mission */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto mb-16">
          <div className="relative">
            <div className="absolute -bottom-4 -right-4 w-full h-full bg-blue-600 dark:bg-blue-800 rounded-2xl"></div>
            <img
              src={nextElites.src}
              alt={t("nextElitesTeamAlt")}
              className="w-full h-auto object-cover rounded-2xl shadow-lg relative z-10"
            />
          </div>

          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
              {t("ourStory")}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
              {t.rich("storyDesc1", {
                span: (chunks) => (
                  <span className="font-bold text-blue-600 dark:text-blue-400">
                    {chunks}
                  </span>
                ),
              })}
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
              {t("storyDesc2")}
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
              {t("storyDesc3")}
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition shadow-md"
              >
                {t("contactUs")}
              </Link>
              <Link
                href="/"
                className="px-6 py-3 border border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-500 font-medium rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 transition"
              >
                {t("homePage")}
              </Link>
            </div>
          </div>
        </div>

        {/* Our services */}
        <div className="mt-16 bg-white dark:bg-gray-800 p-8 rounded-2xl max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 text-center">
            {t("realEstateServices")}
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
            {t("servicesDesc1")}
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
            {t("servicesDesc2")}
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
            {t("servicesDesc3")}
          </p>
        </div>

        {/* Features section */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Features
            title={t("quality")}
            desc={t("qualityDesc")}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            }
          />

          <Features
            title={t("innovation")}
            desc={t("innovationDesc")}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            }
          />

          <Features
            title={t("collaboration")}
            desc={t("collaborationDesc")}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            }
          />
        </div>

        {/* FAQ section */}
        <div className="mt-24 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-12">
            {t("faq")}
          </h2>
          <div className="space-y-6">
            <Question title={t("faq1Question")} desc={t("faq1Answer")} />
            <Question title={t("faq2Question")} desc={t("faq2Answer")} />
            <Question title={t("faq3Question")} desc={t("faq3Answer")} />
          </div>
        </div>
      </div>
    </main>
  );
}
