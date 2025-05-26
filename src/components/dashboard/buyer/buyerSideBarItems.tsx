"use client";

import Link from "next/link";
import { ReactNode, useState } from "react";
import { usePathname } from "@/i18n/navigation";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import PaymentSVG from "../svg/PaymentSVG";
import ArrowSVG from "@/components/common/svg/arrow";

type Item = {
  name: string;
  icon: ReactNode;
  href: string;
  management?: boolean;
};

function BuyerSideBar({ items }: { items: Item[] }) {
  const pathname = usePathname();

  const normalItems = items.filter((item) => !item.management);
  const managementItems = items.filter((item) => item.management);

  const isActive = (href: string) =>
    pathname === href || pathname.endsWith(href.split("/").pop() || "");

  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      {normalItems.map((item, index) => (
        <Link
          key={index}
          href={item.href}
          className={`text-text cursor-pointer flex gap-2 items-center p-2 rounded-md ${
            isActive(item.href)
              ? "bg-border font-semibold"
              : "hover:bg-border/40"
          }`}
        >
          <div className="flex items-center justify-center w-6 h-6">
            {item.icon}
          </div>
          <h1 className="text-lg">{item.name}</h1>
        </Link>
      ))}

      {managementItems.length > 0 && (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <button className="text-text cursor-pointer w-full flex gap-2 items-center p-2 rounded-md hover:bg-border/40">
              <div className="flex items-center justify-center w-6 h-6">
                <PaymentSVG />
              </div>
              <div className="flex items-center gap-1">
                <h1 className="text-lg">مدیریت</h1>
                <ArrowSVG
                  className={`${open ? "rotate-90" : "rotate-0"} transition-all duration-300`}
                />
              </div>
            </button>
          </PopoverTrigger>

          <PopoverContent
            dir="rtl"
            side="bottom"
            sideOffset={-60}
            align="center"
            className="w-64 p-2 bg-background border border-border shadow-xl rounded-xl space-y-1 !absolute !top-0 !right-0"
          >
            {managementItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={`flex items-center gap-2 p-2 rounded-md hover:bg-border/20 ${
                  isActive(item.href) ? "bg-border font-semibold" : ""
                }`}
              >
                <div className="flex items-center justify-center w-6 h-6">
                  {item.icon}
                </div>
                <h1 className="text-lg">{item.name}</h1>
              </Link>
            ))}
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
}

export default BuyerSideBar;
