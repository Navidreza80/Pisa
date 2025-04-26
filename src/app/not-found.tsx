"use client";
import Link from "next/link";
import { MoonIcon, SunIcon } from "lucide-react";
import { useEffect, useState } from "react";
import "./[locale]/globals.css";

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

  // تغییر زبان بین فارسی و انگلیسی
  const toggleLanguage = () => {
    const newLocale = locale === "fa" ? "en" : "fa";
    const newPath = window.location.pathname.replace(/^\/(fa|en)/, `/${newLocale}`);
    window.location.href = newPath;
  };

  // تغییر بین تم روشن و تاریک
  const toggleDark = () => {
    const isNowDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", isNowDark ? "dark" : "light");
    setIsDark(isNowDark);
  };

  return (
    <div className="relative min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center bg-white dark:bg-black">
      {/* لایه تار و شفاف برای زیبایی بصری */}
      <div className="absolute inset-0 bg-white/70 dark:bg-black/60 backdrop-blur-md" />

      {/* دکمه‌های تغییر تم و زبان */}
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

      {/* محتوای اصلی صفحه 404 */}
      <div className="relative z-10 text-center text-black dark:text-white max-w-xl p-8 rounded-2xl flex flex-col items-center gap-4 animate-fadeIn">
        {/* لوگو */}
        <div className="rounded-[100px] h-[70px] w-[80px] flex flex-col items-center mb-[40px]">
          <svg
            className="my-auto fill-black dark:fill-white transition-colors duration-300"
            width="142"
            height="48"
            viewBox="0 0 71 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M5.54688 2.45312V20.1875C5.54688 21.0312 5.71875 21.6458 6.0625 22.0312C6.40625 22.4167 7.05729 22.6979 8.01562 22.875L7.875 23.25C6.6875 23.0833 5.75 23 5.0625 23C4.44792 23 3.73438 23.0833 2.92188 23.25L2.82812 23.0938C3.03646 22.7917 3.14062 22.2396 3.14062 21.4375V5.01562C3.14062 3.53646 2.96875 2.56771 2.625 2.10938C2.29167 1.64062 1.54688 1.40625 0.390625 1.40625L0.328125 0.953125C3.22396 0.526042 5.55208 0.3125 7.3125 0.3125C8.52083 0.3125 9.58854 0.401042 10.5156 0.578125C11.4531 0.755208 12.2969 1.05208 13.0469 1.46875C13.7969 1.875 14.3698 2.44271 14.7656 3.17188C15.1719 3.90104 15.375 4.78125 15.375 5.8125C15.375 6.94792 15.0052 7.98438 14.2656 8.92188C13.5365 9.84896 12.625 10.5573 11.5312 11.0469C10.4479 11.526 9.33854 11.7656 8.20312 11.7656C7.75521 11.7656 7.42188 11.7448 7.20312 11.7031V11.1562C7.99479 11.1562 8.72396 11.0521 9.39062 10.8438C10.0677 10.6354 10.6667 10.3229 11.1875 9.90625C11.7188 9.48958 12.1302 8.94271 12.4219 8.26562C12.724 7.57812 12.875 6.79167 12.875 5.90625C12.875 4.47917 12.5156 3.34896 11.7969 2.51562C11.0781 1.68229 9.95312 1.26562 8.42188 1.26562C7.29688 1.26562 6.30729 1.33333 5.45312 1.46875C5.51562 1.78125 5.54688 2.10938 5.54688 2.45312ZM23.7812 2.14062V20.1875C23.7812 21.0312 23.9531 21.6458 24.2969 22.0312C24.6406 22.4167 25.2917 22.6979 26.25 22.875L26.125 23.25C24.9688 23.0938 24.0885 23.0104 23.4844 23C22.8802 22.9896 22.1094 23.0729 21.1719 23.25L21.0625 23.0938C21.2812 22.7917 21.3906 22.2396 21.3906 21.4375V5.01562C21.3906 3.54688 21.2135 2.55729 20.8594 2.04688C20.5052 1.53646 19.7656 1.32292 18.6406 1.40625L18.5781 1.10938C20.2969 0.598958 21.9271 0.34375 23.4688 0.34375C23.6771 0.916667 23.7812 1.51562 23.7812 2.14062ZM44.25 23H30.2969C30.1094 22.5625 30.0156 22.0521 30.0156 21.4688C30.4323 21.0208 31 20.2448 31.7188 19.1406C32.4479 18.0365 33.3438 16.5677 34.4062 14.7344C35.4792 12.8906 36.3385 11.3958 36.9844 10.25C37.6406 9.10417 38.5833 7.42188 39.8125 5.20312C41.0521 2.97396 41.724 1.77083 41.8281 1.59375L41.6562 1.4375H34.6875C34.0938 1.45833 33.5729 1.54688 33.125 1.70312C32.6875 1.85938 32.2917 2.10417 31.9375 2.4375C31.5938 2.77083 31.3021 3.125 31.0625 3.5C30.8229 3.86458 30.5469 4.34896 30.2344 4.95312L29.7969 4.70312L30.9375 0.375L31.2031 0.15625L44.9844 0.46875L45.1875 0.828125C45 1.10938 44.5365 1.875 43.7969 3.125C43.1615 4.23958 42.4375 5.45312 41.625 6.76562C40.8229 8.09896 40.0052 9.48438 39.1719 10.9219L36.6875 15.2188C36.1146 16.2188 34.7344 18.4948 32.5469 22.0469L40.4844 21.7188C41.2448 21.6875 41.8906 21.599 42.4219 21.4531C42.9635 21.2969 43.4271 21.0573 43.8125 20.7344C44.1979 20.4115 44.5156 20.0729 44.7656 19.7188C45.0156 19.3542 45.2917 18.8698 45.5938 18.2656L46.0469 18.4531L44.5156 22.7812L44.25 23ZM58 1.34375C58.3542 1.125 58.7604 0.708333 59.2188 0.09375H59.375L67.9844 20.8281C68.3698 21.7552 69.1562 22.4062 70.3438 22.7812V23.0625C69.6667 22.9896 68.8542 22.974 67.9062 23.0156C66.9583 23.0677 66.1198 23.1562 65.3906 23.2812L65.2656 23.125C65.474 22.8542 65.5208 22.401 65.4062 21.7656C65.3021 21.1302 64.9844 20.1667 64.4531 18.875L61.875 12.4062C58.8125 12.3542 56.2812 12.3646 54.2812 12.4375L50.6719 20.8281C50.4531 21.3073 50.5312 21.7083 50.9062 22.0312C51.2917 22.3542 52.0417 22.625 53.1562 22.8438L53.0938 23.125C51.2812 22.9896 49.8021 22.9479 48.6562 23C48.5938 22.9375 48.526 22.8333 48.4531 22.6875L58 1.34375ZM54.7031 11.5156C56.2135 11.5573 58.474 11.5573 61.4844 11.5156L58.2188 3.35938L54.7031 11.5156Z" />
          </svg>

        </div>

        {/* عنوان و توضیحات */}
        <h1 className="text-8xl font-extrabold text-[#586CFF] drop-shadow-lg mb-2 animate-float">404</h1>
        <h2 className="text-3xl font-semibold mb-2">{t.title}</h2>
        <p className="text-xl text-gray-700 dark:text-gray-100 mb-2 font-medium">{t.subtitle}</p>
        <p className="text-gray-600 dark:text-gray-400 mb-6">{t.description}</p>

        {/* دکمه بازگشت به خانه */}
        <Link
          href={`/${locale}`}
          className="group relative inline-flex items-center gap-2 bg-[#586CFF] hover:bg-[#4056d9] transition px-7 py-3 rounded-full text-lg font-bold shadow-md focus:outline-none focus:ring-2 focus:ring-[#586CFF]/50 focus:ring-offset-2 text-white"
        >
          {t.backToHome}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 ${locale === 'fa' ? '' : 'rotate-180'}`}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </Link>
      </div>

      {/* انیمیشن‌ها */}
      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 1s ease-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        @keyframes float {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
