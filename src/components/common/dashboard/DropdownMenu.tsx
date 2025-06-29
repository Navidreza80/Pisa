"use client";

import { User } from "lucide-react";
import WarningModal from "./WarningModal";
import SignoutSVG from "@/components/dashboard/svg/SignoutSVG";
import { usePathname, useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { getClientCookie } from "@/utils/service/storage/client-cookie";

export default function DropdownMenu() {
  const pathname = usePathname();
  const router = useRouter();
  const token = getClientCookie("clientAccessToken");
  const { role } = typeof token == "string" && jwtDecode(token);
  const dropdownItems = [
    {
      text: pathname.includes("/seller")
        ? "پنل بایر"
        : pathname.includes("/buyer") && role == "seller"
          ? "پنل سلر"
          : "",
      icon: <User />,
      onClick: () =>
        pathname.includes("/seller")
          ? router.push("/dashboard/buyer")
          : pathname.includes("/buyer") && role == "seller"
            ? router.push("/dashboard/seller")
            : "",
    },
    { text: "خروج", icon: <SignoutSVG /> },
  ];
  return dropdownItems.map((item, index) => {
    return index == 1 ? (
      <WarningModal key={index} title="آیا از خروج خود مطمعن هستید؟">
        {" "}
        <div className="py-[10px] cursor-pointer hover:text-text/80 transition-all duration-300 border-t border-border w-full flex gap-2 text-[13px] font-medium justify-end">
          {item.text} {item.icon}
        </div>
      </WarningModal>
    ) : (
      <div
        key={index}
        onClick={item.onClick}
        className="py-[10px] cursor-pointer hover:text-text/80 transition-all duration-300 border-t border-border w-full flex gap-2 text-[13px] font-medium justify-end"
      >
        {item.text} {item.icon}
      </div>
    );
  });
}
