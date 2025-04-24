'use client'

import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { toggleDarkMode } from "@/utils/hooks/themeSlice";
import { useDispatch, useSelector } from "react-redux";
import { MoonIcon, SunIcon } from "lucide-react";

export default function ThemeLanguageToggle() {
  // Redux states for theme
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state: { theme: { isDarkMode: boolean } }) => state.theme.isDarkMode);
  
  // Current locale
  const locale = useLocale();
  
  return (
    <div className="flex items-center gap-3 bg-white/10 dark:bg-black/20 p-2 rounded-full">
      {/* Theme Toggle */}
      <button
        onClick={() => dispatch(toggleDarkMode())}
        className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        aria-label={isDarkMode ? "روشن کردن" : "تاریک کردن"}
      >
        {isDarkMode ? (
          <SunIcon className="w-4 h-4 text-gray-700 dark:text-gray-300" />
        ) : (
          <MoonIcon className="w-4 h-4 text-gray-700 dark:text-gray-300" />
        )}
      </button>
      
      {/* Language Switcher */}
      <div className="flex items-center gap-2">
        <Link 
          href="/" 
          locale="fa"
          className={`text-sm font-medium ${locale === 'fa' ? 'text-primary dark:text-primary font-bold' : 'text-gray-600 dark:text-gray-400'}`}
        >
          فا
        </Link>
        <span className="text-gray-400 dark:text-gray-600">|</span>
        <Link 
          href="/" 
          locale="en"
          className={`text-sm font-medium ${locale === 'en' ? 'text-primary dark:text-primary font-bold' : 'text-gray-600 dark:text-gray-400'}`}
        >
          EN
        </Link>
      </div>
    </div>
  );
}