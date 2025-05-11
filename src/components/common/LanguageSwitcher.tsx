'use client'
// Change lang
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function LanguageSwitcher() {
  const locale = useLocale();
  
  return (
    <div className="flex items-center gap-2">
      <Link 
        href="/" 
        locale="fa"
        className={`text-sm font-medium ${locale === 'fa' ? 'text-primary dark:text-primary' : 'text-gray-600 dark:text-gray-400'}`}
      >
        فا
      </Link>
      <span className="text-gray-400 dark:text-gray-600">|</span>
      <Link 
        href="/" 
        locale="en"
        className={`text-sm font-medium ${locale === 'en' ? 'text-primary dark:text-primary' : 'text-gray-600 dark:text-gray-400'}`}
      >
        EN
      </Link>
      <Link 
        href="/" 
        locale="tr"
        className={`text-sm font-medium ${locale === 'tr' ? 'text-primary dark:text-primary' : 'text-gray-600 dark:text-gray-400'}`}
      >
        Tr
      </Link>
      <Link 
        href="/" 
        locale="ar"
        className={`text-sm font-medium ${locale === 'ar' ? 'text-primary dark:text-primary' : 'text-gray-600 dark:text-gray-400'}`}
      >
        Ar
      </Link>
    </div>
  );
}