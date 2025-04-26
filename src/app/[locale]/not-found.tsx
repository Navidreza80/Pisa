"use client"
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import Link from "next/link";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "@/utils/hooks/themeSlice";
import { MoonIcon, SunIcon } from "lucide-react";

export default function Custom404() {
  // Get translations based on current locale
  const t = useTranslations('NotFound');
  const locale = useLocale();
  
  // Redux states for theme
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state: { theme: { isDarkMode: boolean } }) => state.theme.isDarkMode);

  // Toggle language function
  const toggleLanguage = () => {
    const newLocale = locale === 'fa' ? 'en' : 'fa';
    window.location.href = `/${newLocale}`;
  };

  return (
    <div
      className={`relative min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center font-[iranyekanwebregular] ${locale === 'fa' ? 'rtl' : 'ltr'}`}
      style={{ backgroundImage: 'url("/villa-bg.jpg")' }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />
      
      {/* Theme & Language Toggle */}
      <div className="absolute top-5 right-5 z-20 flex gap-4">
        <button
          onClick={() => dispatch(toggleDarkMode())}
          className="p-2 rounded-full bg-white/20 dark:bg-black/30 hover:bg-white/30 dark:hover:bg-black/40 transition-colors"
          aria-label={isDarkMode ? "روشن کردن" : "تاریک کردن"}
        >
          {isDarkMode ? (
            <SunIcon className="w-5 h-5 text-yellow-300" />
          ) : (
            <MoonIcon className="w-5 h-5 text-gray-200" />
          )}
        </button>
        
        <button 
          onClick={toggleLanguage}
          className="p-2 rounded-full bg-white/20 dark:bg-black/30 hover:bg-white/30 dark:hover:bg-black/40 transition-colors text-white font-medium"
        >
          {locale === 'fa' ? 'EN' : 'فا'}
        </button>
      </div>

      <div className="relative z-10 text-center text-white max-w-xl p-8 bg-white/10 dark:bg-black/40 rounded-2xl border border-white/20 dark:border-gray-800/50 shadow-2xl flex flex-col items-center gap-4 animate-fadeIn">
        <div className="mb-2 flex flex-col items-center">
          <Image src="/images/landing/heroImage.png" alt="لوگو" width={90} height={90} className="rounded-full shadow-lg border-2 border-white/40 bg-white/10" />
        </div>
        
        <div className="relative">
          <h1 className="text-8xl font-extrabold text-rose-500 drop-shadow-lg mb-2 animate-float">404</h1>
          <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-yellow-400/80 dark:bg-yellow-500/60 blur-md animate-pulse"></div>
          <div className="absolute -bottom-2 -left-4 w-8 h-8 rounded-full bg-blue-400/80 dark:bg-blue-500/60 blur-md animate-pulse delay-300"></div>
        </div>
        
        <h2 className="text-3xl font-semibold mb-2">{t('title')}</h2>
        <p className="text-xl text-gray-100 mb-2 font-medium">
          {t('subtitle')}
        </p>
        <p className="text-gray-300 dark:text-gray-400 mb-6">
          {t('description')}
        </p>
        
        <Link
          href={`/${locale}`}
          className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 transition px-7 py-3 rounded-full text-lg font-bold shadow-md focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-2 overflow-hidden"
        >
          <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-32 group-hover:h-32 opacity-10"></span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 ${locale === 'fa' ? '' : 'rotate-180'}`}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          {t('backToHome')}
        </Link>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 left-1/4 w-8 h-8 rounded-full bg-blue-500/20 animate-float delay-100"></div>
      <div className="absolute bottom-1/4 right-1/3 w-6 h-6 rounded-full bg-purple-500/20 animate-float delay-300"></div>
      <div className="absolute top-1/3 right-1/4 w-10 h-10 rounded-full bg-rose-500/20 animate-float delay-500"></div>

      <style jsx>{`
        .rtl {
          direction: rtl;
        }
        .ltr {
          direction: ltr;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 1s cubic-bezier(0.4,0,0.2,1);
        }
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .delay-100 {
          animation-delay: 0.1s;
        }
        .delay-300 {
          animation-delay: 0.3s;
        }
        .delay-500 {
          animation-delay: 0.5s;
        }
      `}</style>
    </div>
  );
}