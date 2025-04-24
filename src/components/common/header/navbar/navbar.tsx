"use client";

import { TransitionLink } from "@/utils/helper/TransitionLink";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const t = useTranslations("Header");
  const navItems = [
    { text: t("about"), url: "/about-us" },
    { text: t("blogs"), url: "/blogs" },
    { text: t("home"), url: "/" },
  ];
  const pathname = usePathname();
  return (
    <div className="flex justify-center gap-14 p-1 max-[600px]:hidden">
      {navItems.map((item, index) => {
        return (
          <TransitionLink
            key={index}
            href={item.url}
            className={`${
              pathname == item.url ? "border-b-2" : "border-none"
            } font-bold`}
          >
            {item.text}
          </TransitionLink>
        );
      })}
    </div>
  );
}
