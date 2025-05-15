// Next
import createIntlMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";

// Dependencies
import { auth } from "./auth";
import { routing } from "./i18n/routing";

// Cookies
import { getServerCookie } from "./utils/service/storage/server-cookie";

// List of protected routes
const protectedRoutes = [
  "/fa/auth/login",
  "/fa/auth/register/step-1",
  "/fa/auth/register/step-2",
  "/fa/auth/register/step-3",
  "/en/auth/login",
  "/en/auth/register/step-1",
  "/en/auth/register/step-2",
  "/en/auth/register/step-3",
  "/tr/auth/login",
  "/tr/auth/register/step-1",
  "/tr/auth/register/step-2",
  "/tr/auth/register/step-3",
  "/ar/auth/login",
  "/ar/auth/register/step-1",
  "/ar/auth/register/step-2",
  "/ar/auth/register/step-3",
];
const intlMiddleware = createIntlMiddleware(routing);

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};

export default async function middleware(request: NextRequest) {
  // Handle protected routes first
  const session = await auth();
  const token = await getServerCookie("serverAccessToken");
  const { pathname } = request.nextUrl;
  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtected && (session || token)) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }
  const response = intlMiddleware(request);
  return response;
}
