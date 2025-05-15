// List of protected routes
const locales = ["fa", "en", "tr", "ar"];
const baseProtectedRoutes = [
  "/auth/login",
  "/auth/register/step-1",
  "/auth/register/step-2",
  "/auth/register/step-3",
];
export const protectedRoutes = locales.flatMap((locale) =>
  baseProtectedRoutes.map((route) => `/${locale}${route}`)
);
