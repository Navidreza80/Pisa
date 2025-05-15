/**
 * Next.js middleware for handling internationalization and protected routes.
 * Redirects authenticated users from protected routes (e.g., login/register) to the homepage.
 * @param request - The incoming Next.js request
 * @returns Response with i18n handling or redirect
 */

// Next
import createIntlMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";

// Dependencies
import { auth } from "./auth";
import { routing } from "./i18n/routing";

// Cookies
import { getServerCookie } from "./utils/service/storage/server-cookie";

// Constant
import { protectedRoutes } from "./utils/constant/protected-routes";

const intlMiddleware = createIntlMiddleware(routing);

// Matcher config for middleware
export const config = {
  matcher: [
    "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
    "/:locale(en|fa|tr|ar)/:path*",
  ],
};

export default async function middleware(request: NextRequest) {
  try {
// Authentication check for protected routes

    // Get session from next auth if user logged in with github
    const session = await auth();
    // Get token that saved in cookie for login with email and password manually
    const token = await getServerCookie("serverAccessToken");
    const { pathname } = request.nextUrl;
    const isProtected = protectedRoutes.includes(pathname);

    if (isProtected && (session || token)) {
      const url = request.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.redirect(url);
    }

    // Apply i18n middleware
    return intlMiddleware(request);
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.next();
  }
}
