"use client";

import NotifSVG from "@/components/dashboard/svg/NotifSVG";
import SignoutSVG from "@/components/dashboard/svg/SignoutSVG";
import { handleLogout } from "@/lib/actions/auth";
import { JwtPayload } from "@/types/user";
import { getClientCookie } from "@/utils/service/storage/client-cookie";
import { jwtDecode } from "jwt-decode";
import { User } from "lucide-react";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import NotificationSettingModal from "./NotificationSettingModal";

export default function DropdownMenu() {
  const t = useTranslations("Dashboard");
  const pathname = usePathname();
  const router = useRouter();
  const token = getClientCookie("clientAccessToken");
  const { role } = typeof token == "string" && jwtDecode<JwtPayload>(token);
  const dropdownItems = [
    {
      text: pathname.includes("/seller")
        ? t("buyerPanel")
        : pathname.includes("/buyer") && role == "seller"
          ? t("sellerPanel")
          : "",
      icon: <User size={20} />,
      onClick: () =>
        pathname.includes("/seller")
          ? router.push("/dashboard/buyer")
          : pathname.includes("/buyer") && role == "seller"
            ? router.push("/dashboard/seller")
            : "",
    },
    {
      icon: (
        <NotificationSettingModal>
          <div className="cursor-pointer hover:text-text/80 transition-all duration-300 w-full flex gap-2">
            <NotifSVG size="20" /> تنظیمات نوتیفیکیشن
          </div>
        </NotificationSettingModal>
      ),
    },
    {
      text: "خروج",
      icon: <SignoutSVG size="20" />,
      onClick: async () => {
        await handleLogout();
        router.push("/");
      },
    },
  ];
  return dropdownItems.map((item, index) => (
    <div
      key={index}
      onClick={item.onClick}
      className="py-[10px] cursor-pointer hover:text-text/80 transition-all duration-300 border-t border-border w-full flex gap-2 text-[14px] rtl:flex-row font-medium"
    >
      {item.icon} {item.text ?? ""}
    </div>
  ));
}
