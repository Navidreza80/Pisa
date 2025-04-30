import {defineRouting} from 'next-intl/routing';
 
export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'fa', 'tr', 'ar'],
 
  // Used when no locale matches
  defaultLocale: 'fa',

  // Always include the locale in the URL
  localePrefix: 'always'
});