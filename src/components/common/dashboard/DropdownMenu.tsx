"use client";

import { getClientCookie } from "@/utils/service/storage/client-cookie";
import { jwtDecode } from "jwt-decode";
import { User } from "lucide-react";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

export default function DropdownMenu() {
  const t = useTranslations("Dashboard");
  const pathname = usePathname();
  const router = useRouter();
  const token = getClientCookie("clientAccessToken");
  const { role } = typeof token == "string" && jwtDecode(token);
  const dropdownItems = [
    {
      text: pathname.includes("/seller")
        ? t("buyerPanel")
        : pathname.includes("/buyer") && role == "seller"
          ? t("sellerPanel")
          : "",
      icon: <User />,
      onClick: () =>
        pathname.includes("/seller")
          ? router.push("/dashboard/buyer")
          : pathname.includes("/buyer") && role == "seller"
            ? router.push("/dashboard/seller")
            : "",
    },
  ];
  return dropdownItems.map((item, index) => (
    <div
      key={index}
      onClick={item.onClick}
      className="py-[10px] cursor-pointer hover:text-text/80 transition-all duration-300 border-t border-border w-full flex gap-2 text-[13px] rtl:flex-row-reverse font-medium justify-end"
    >
      {item.text} {item.icon}
    </div>
  ));
}
