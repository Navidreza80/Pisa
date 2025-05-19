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
      <body className="bg-background text-text ">
        <NextIntlClientProvider>
          <Providers>
              <div className="flex bg-border justify-between p-[19px]">
                <div className="flex flex-col flex-wrap gap-[19px] w-[80%]">
                  <div className="bg-background rounded-[12px] px-[19px] h-[66px] flex justify-between">
                    {!decodedUser ? (
                      <span></span>
                    ) : (
                      <div className="flex gap-2 my-auto">
                        <div className="flex flex-col flex-wrap justify-between">
                          <h1 className="text-text">{decodedUser.name}</h1>
                          <p className="text-text-secondary text-[12px]">
                            خریدار
                          </p>
                        </div>
                        <Image
                          width={37}
                          height={37}
                          className="h-[37px] w-[37px] bg-border rounded-[8px] border-0 my-auto"
                          src={decodedUser.image}
                          alt=""
                        />
                      </div>
                    )}
                    <DashboardTitle />
                  </div>
                  {children}
                </div>
                <div className="w-[19%] h-100vh">
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
