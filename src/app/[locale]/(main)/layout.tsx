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
import "../globals.css";


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
  return (
    <html lang={locale} dir={direction()}>
      <body className="bg-background font-yekan text-text ">
        <NextIntlClientProvider>
          <Providers>
            <main className="w-full flex-wrap">
              <Header />
              {children}
              <Footer />
            </main>
            <FloatingActions />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
