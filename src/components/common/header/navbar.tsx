"use client";
// Third party components
import { TransitionLink } from "@/components/common/TransitionLink";

// Change lang
import { useTranslations } from "next-intl";

// Next built in
import { usePathname } from "@/i18n/navigation";

// ShadCn dropdown menu
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Icons
import { ChevronDown, ChevronUp } from "lucide-react";

// React
import { useState } from "react";

/**
 * Header navbar component for navigating through pages.
 *
 * @component
 * @returns {JSX.Element} - Rendered navbar
 */

export default function Navbar() {
  // Hooks
  const t = useTranslations("Header");
  const pathname = usePathname();

  // Header NavBar Items
  const navItems = [
    { text: t("home"), url: "/" },
    { text: t("about"), url: "/about-us" },
  ];

  // Rent dropdown items
  const rentItems = [
    { text: t("rent"), url: "/rent" },
    { text: t("reserve"), url: "/reserve" },
  ];

  const isRentActive = pathname === "/rent" || pathname === "/reserve";

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="flex justify-center gap-14 p-1 max-[600px]:hidden">
      {navItems.map((item, index) => {
        return (
          <TransitionLink
            key={index}
            href={item.url}
            className={`${
              pathname == item.url
                ? "text-primary font-bold hover:border-primary"
                : "text-text"
            } font-semibold hover:text-primary transition-colors duration-300 `}
          >
            {item.text}
          </TransitionLink>
        );
      })}
      <DropdownMenu onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger
          className={`flex items-center outline-none gap-1 hover:text-primary transition-colors duration-300 hover:border-primary cursor-pointer ${
            isRentActive ? "text-primary  font-bold" : "text-text font-semibold"
          }`}
        >
          {pathname == "/reserve" ? t("reserve") : t("rent")}
          {isDropdownOpen ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="center"
          className=" bg-background border-border"
        >
          {rentItems.map((item, index) => (
            <DropdownMenuItem key={index} asChild >
              <TransitionLink
                href={item.url}
                className={`w-full cursor-pointer hover:text-primary transition-colors duration-300  ${
                  pathname === item.url ? "font-bold" : ""
                }`}
              >
                {item.text}
              </TransitionLink>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
