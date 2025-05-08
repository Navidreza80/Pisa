"use client";
import Link from "next/link";
import { MoonIcon, SunIcon } from "lucide-react";
import { useEffect, useState } from "react";
import "./[locale]/globals.css";
import NotFoundSvg from "@/components/common/svg/not-found";
import NotFoundHomeSvg from "@/components/common/svg/not-found-Home";

const translations = {
  fa: {
    title: "صفحه پیدا نشد",
    subtitle: "چنین صفحه‌ای وجود ندارد!",
    description: "ممکن است آدرس اشتباه باشد یا صفحه حذف شده باشد.",
    backToHome: "بازگشت به خانه",
    langSwitch: "EN",
  },
  en: {
    title: "Page Not Found",
    subtitle: "This page doesn’t exist!",
    description: "It may have been removed or the URL is incorrect.",
    backToHome: "Back to Home",
    langSwitch: "فا",
  },
};

export default function Custom404() {
  const [locale, setLocale] = useState<"fa" | "en">("fa");
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const current = window.location.pathname.startsWith("/en") ? "en" : "fa";
    setLocale(current);

    if (localStorage.getItem("theme") === "dark") {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  }, []);

  const t = translations[locale];

  const toggleLanguage = () => {
    const newLocale = locale === "fa" ? "en" : "fa";
    const newPath = window.location.pathname.replace(
      /^\/(fa|en)/,
      `/${newLocale}`
    );
    window.location.href = newPath;
  };

  const toggleDark = () => {
    const isNowDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", isNowDark ? "dark" : "light");
    setIsDark(isNowDark);
  };

  return (
    <div className="relative min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center bg-white dark:bg-black">
      <div className="absolute inset-0 bg-white/70 dark:bg-black/60 backdrop-blur-md" />

      <div className="absolute top-5 right-5 z-20 flex gap-4">
        <button
          onClick={toggleDark}
          className="p-2 h-[50px] w-[50px] rounded-full bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 transition-colors"
          aria-label="toggle theme"
        >
          {isDark ? (
            <SunIcon className="w-5 h-5 m-auto text-yellow-400" />
          ) : (
            <MoonIcon className="w-5 h-5 m-auto text-gray-700" />
          )}
        </button>

        <button
          onClick={toggleLanguage}
          className="p-2 rounded-full h-[50px] w-[50px] bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 transition-colors text-black dark:text-white font-medium"
        >
          {t.langSwitch}
        </button>
      </div>

      <div className="relative z-10 text-center text-black dark:text-white max-w-xl p-8 rounded-2xl flex flex-col items-center gap-4 animate-fadeIn">
        <div className="rounded-[100px] h-[70px] w-[80px] flex flex-col items-center mb-[40px]">
          <NotFoundSvg />
        </div>

        <h1 className="text-8xl font-extrabold text-[#586CFF] drop-shadow-lg mb-2 animate-float">
          404
        </h1>
        <h2 className="text-3xl font-semibold mb-2">{t.title}</h2>
        <p className="text-xl text-gray-700 dark:text-gray-100 mb-2 font-medium">
          {t.subtitle}
        </p>
        <p className="text-gray-600 dark:text-gray-400 mb-6">{t.description}</p>

        <Link
          href={`/${locale}`}
          className="group relative inline-flex items-center gap-2 bg-[#586CFF] hover:bg-[#4056d9] transition px-7 py-3 rounded-full text-lg font-bold shadow-md focus:outline-none focus:ring-2 focus:ring-[#586CFF]/50 focus:ring-offset-2 text-white"
        >
          {t.backToHome}
          <NotFoundHomeSvg locale={locale} />
        </Link>
      </div>
    </div>
  );
}
