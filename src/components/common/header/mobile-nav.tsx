"use client";
// Icons
import { MenuOutlined } from "@ant-design/icons";

// Icons
import { Book, Home, User } from "lucide-react";

// Next built in components
import { Link } from "@/i18n/navigation";

// For language detection
import { useLocale, useTranslations } from "next-intl";

// shadcn/ui Sheet
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";

/**
 * Mobile navigation component for mobile mode.
 * 
 * @component
 * @returns {JSX.Element} - Rendered mobile navigation
 */

export default function MobileNav() {
  // Hooks
  const locale = useLocale();
  const t = useTranslations("Header")

  // Determine direction based on locale
  const direction = locale === "fa" || locale === "ar" ? "rtl" : "ltr";

  // Navigation items
  const navItems = [
    { text: t("about"), url: "/about-us", icon: <User /> },
    { text: t("blogs"), url: "/blogs", icon: <Book /> },
    { text: t("home"), url: "/", icon: <Home /> },
    { text: t("rent"), url: "/rent", icon: <Home /> },
    { text: t("reserve"), url: "/reserve", icon: <Home /> },
  ];

  return (
    <div className="hidden max-[600px]:block">
      <Sheet>
        <SheetTrigger asChild>
          <MenuOutlined
            className="!text-text"
            style={{ fontSize: "50px" }}
          />
        </SheetTrigger>
        <SheetContent
          side={direction === "rtl" ? "right" : "left"}
          className="max-[600px]:block w-[250px]"
          style={{ direction }}
        >
          <SheetHeader>
            <SheetTitle className="font-yekan text-lg px-2 pt-5 pb-4"></SheetTitle>
          </SheetHeader>
          <div className="flex flex-col mt-2 gap-2 px-2 pb-4">
            {navItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors px-3 py-3"
              >
                <span className="text-xl">{item.icon}</span>
                <SheetClose asChild>
                  <Link
                    href={item.url}
                    className={`font-yekan text-base text-text ${
                      direction === "rtl" ? "text-right" : "text-left"
                    }`}
                  >
                    {item.text}
                  </Link>
                </SheetClose>
              </div>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
