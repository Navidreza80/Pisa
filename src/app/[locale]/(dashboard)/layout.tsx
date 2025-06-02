// Next
import type { Metadata } from "next";

// Dependencies
import { routing } from "@/i18n/routing";
import Providers from "@/provider/provider";
import { NextIntlClientProvider, hasLocale } from "next-intl";

// Third party components
import FloatingActions from "@/components/common/fab";

// CSS
import { auth } from "@/auth";
import BuyerSideBar from "@/components/dashboard/buyer/BuyerSideBar";
import HeaderDashboard from "@/components/dashboard/HeaderDashboard";
import Tags from "@/components/dashboard/seller/finance-container/tags";
import { JwtPayload } from "@/types/user";
import { getServerCookie } from "@/utils/service/storage/server-cookie";
import { jwtDecode } from "jwt-decode";
import "../globals.css";
import TokenRefresher from "@/components/common/TokenRefresher";

// metadata
export const metadata: Metadata = {
  title: "Pizza",
  description: "Find your dream house!",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    return "not found";
  }
  const direction = () => {
    switch (locale) {
      case "fa":
      case "ar":
        return "ltr";
      case "tr":
      case "en":
      default:
        return "rtl";
    }
  };
  const token = await getServerCookie("serverAccessToken");
  var decodedUser;
  if (token) {
    decodedUser =
      typeof token === "string" ? jwtDecode<JwtPayload>(token) : null;
  } else {
    decodedUser = await auth();
    decodedUser = decodedUser?.user;
  }
  return (
    <html lang={locale} dir={direction()}>
      <body className="bg-background text-text font-yekan">
        <NextIntlClientProvider>
          <Providers>
            <div className="flex bg-border justify-between gap-[19px] p-[19px]">
              <div className="flex flex-col flex-wrap gap-[19px] w-[100%]">
                <HeaderDashboard />
                <Tags />
                <main className="flex-1 bg-background p-8 rounded-[12px]">
                  {children}
                </main>
              </div>
              <BuyerSideBar />
            </div>
            <TokenRefresher />
            <FloatingActions />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
