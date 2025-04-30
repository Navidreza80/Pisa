"use client";
// Third party components
import { TransitionLink } from "@/utils/helper/TransitionLink";
// Change lang
import { useTranslations } from "next-intl";
// Next built in
import { usePathname } from "@/i18n/navigation";

export default function Navbar() {
  // Hooks
  const t = useTranslations("Header");

  // Header NavBar Items
  const navItems = [
    { text: t("about"), url: "/about-us" },
    { text: t("blogs"), url: "/blogs" },
    { text: t("rent"), url: "/reserve" },
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
              pathname == item.url ? "border-b-2 border-text" : "border-none"
            } font-bold`}
          >
            {item.text}
          </TransitionLink>
        );
      })}
    </div>
  );
}
