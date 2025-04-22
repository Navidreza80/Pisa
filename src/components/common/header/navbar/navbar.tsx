'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const navItems = [
    { text: "درباره ما", url: "/about" },
    { text: "مقالات", url: "/blogs" },
    { text: "خانه", url: "/" },
  ];
  const pathname = usePathname()
  return (
    <div className="flex justify-center gap-14 p-1 max-[600px]:hidden">
        {navItems.map((item, index) => {
            return (
                <Link key={index} href={item.url} className={`${pathname == item.url ? "border-b-2" : "border-none"} font-bold`}>{item.text}</Link>
            )
        })}
    </div>
  );
}
