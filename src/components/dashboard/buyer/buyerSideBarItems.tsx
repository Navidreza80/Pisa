"use client"
import Link from "next/link";
import { ReactNode } from "react";
import { usePathname } from "@/i18n/navigation";

function BuyerSideBarItems({ name, icon, href }: { name: string; icon: ReactNode, href:string }) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.endsWith(href.split('/').pop() || '');
  
  return (
    <Link 
      className={`text-text cursor-pointer flex gap-2 items-center p-2 rounded-md ${isActive ? 'bg-border font-semibold' : 'hover:bg-border/40'}`} 
      href={href}
    >
      <div className="flex items-center justify-center w-6 h-6">
        {icon}
      </div>
      <h1 className={`text-lg ${isActive ? 'text-text font-semibold' : 'text-text'}`}>{name}</h1>
    </Link>
  );
}

export default BuyerSideBarItems;
