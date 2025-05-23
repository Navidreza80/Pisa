// Next
import type { Metadata } from "next";

// Dependencies
import { routing } from "@/i18n/routing";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import Providers from "@/provider/provider";

// Third party components
import FloatingActions from "@/components/common/fab";
import Footer from "@/components/common/footer/footer";
import Header from "@/components/common/header/header";

// CSS
import "../../../globals.css";
import { getServerCookie } from "@/utils/service/storage/server-cookie";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "@/types/user";
import { auth } from "@/auth";
import BuyerSideBar from "@/components/dashboard/buyer/BuyerSideBar";
import Image from "next/image";
import DashboardTitle from "@/components/dashboard/buyer/DashboardTitle";
import ArrowSVG from "@/components/dashboard/svg/ArrowSVG";
import Notif2SVG from "@/components/dashboard/svg/Notif2SVG";

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
      <body className="text-text font-yekan">
        <NextIntlClientProvider>
          <Providers>
            <div className="flex bg-panel justify-between p-[19px]">
              <div className="flex flex-col flex-wrap gap-[19px] w-[80%]">
                <div className="bg-background rounded-[12px] px-[19px] h-[66px] flex justify-between">
                  {!decodedUser ? (
                    <span></span>
                  ) : (
                    <div className="flex gap-4 my-auto">
                      <div className="my-auto cursor-pointer">
                        <ArrowSVG />
                      </div>
                      <div className="flex gap-2">
                        <div className="flex flex-col flex-wrap justify-between">
                          <h1 className="text-text font-yekan font-bold">
                            {decodedUser.name || "User"}
                          </h1>
                          <p className="text-text-secondary text-[12px] font-yekan font-semibold">
                            خریدار
                          </p>
                        </div>
                        {decodedUser.profilePicture ? (
                          <Image
                            src={decodedUser.profilePicture}
                            alt={decodedUser.name || "User"}
                            width={37}
                            height={37}
                            className="object-cover rounded-[8px]"
                          />
                        ) : (
                          <div className="w-[37px] h-[37px] rounded-[8px] flex items-center justify-center bg-border text-text font-bold">
                            {decodedUser.name
                              ? decodedUser.name.charAt(0).toUpperCase()
                              : "U"}
                          </div>
                        )}
                      </div>
                      <div className="my-auto cursor-pointer">
                        <Notif2SVG />
                      </div>
                    </div>
                  )}
                  <DashboardTitle />
                </div>
                <main className="flex-1 bg-background p-8 rounded-[12px]">
                  {children}
                </main>
              </div>
              <div className="w-[19%]">
                <BuyerSideBar />
              </div>
            </div>
            <FloatingActions />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
