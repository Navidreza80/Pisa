"use client";
// Third party components
import { TransitionLink } from "@/utils/helper/TransitionLink";
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
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  // Hooks
  const t = useTranslations("Header");
  const pathname = usePathname();

  // Header NavBar Items
  const navItems = [
    { text: t("about"), url: "/about-us" },
    { text: t("home"), url: "/" },
  ];

  // Rent dropdown items
  const rentItems = [
    { text: "رهن و اجاره", url: "/rent" },
    { text: "رزرو خانه", url: "/reserve" },
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
              pathname == item.url ? "border-b-2 border-text" : "border-none"
            } font-bold`}
          >
            {item.text}
          </TransitionLink>
        );
      })}

      {/* Rent Dropdown Menu */}
      <DropdownMenu onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger
          dir="rtl"
          className={`flex items-center outline-none gap-1 cursor-pointer font-bold ${
            isRentActive ? "border-b-2 border-text" : "border-none"
          }`}
        >
          {pathname == "/reserve" ? "رزرو خانه" : "رهن و اجاره"}
          {isDropdownOpen ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="center"
          className="font-yekan bg-background border-border"
        >
          {rentItems.map((item, index) => (
            <DropdownMenuItem key={index} asChild dir="rtl">
              <TransitionLink
                href={item.url}
                className={`w-full cursor-pointer hover:text-[#353535] dark:hover:text-[#cfcfcf] ${
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
