"use client";

import { usePathname } from "@/i18n/navigation";
import Link from "next/link";
import { ReactNode } from "react";

type Item = {
  name: string;
  icon: ReactNode;
  href: string;
  management?: boolean;
};

function BuyerSideBarItems({
  items,
  collapsed,
}: {
  items: Item[];
  collapsed: boolean;
}) {
  const pathname = usePathname();

  const normalItems = items.filter((item) => !item.management);

  const isActive = (href: string) =>
    pathname === href || pathname.endsWith(href.split("/").pop() || "");

  return (
    <div className={`flex flex-col gap-4`}>
      {normalItems.map((item, index) => (
        <Link
          key={index}
          href={item.href}
          className={`text-text cursor-pointer flex gap-2 items-center lg:justify-start md:justify-center justify-center p-2 ${!collapsed ? "" : "justify-center"} rounded-md ${
            isActive(item.href)
              ? "bg-border font-semibold"
              : "hover:bg-border/40"
          }`}
        >
          <div className="flex items-center justify-center w-6 h-6">
            {item.icon}
          </div>
          {!collapsed && (
            <h1 className="text-lg lg:block md:hidden hidden">{item.name}</h1>
          )}
        </Link>
      ))}
    </div>
  );
}

export default BuyerSideBarItems;
