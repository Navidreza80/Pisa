"use client"

import { usePathname } from "@/i18n/navigation";

export default function DashboardTitle() {
  const pathname = usePathname();
  
  const getTitle = () => {
    if (pathname.includes('/dashboard') && !pathname.includes('/information') && !pathname.includes('/reservations') && 
        !pathname.includes('/favorites') && !pathname.includes('/payments') && !pathname.includes('/notifications')) {
      return "داشبورد";
    } else if (pathname.includes('/information')) {
      return "اطلاعات کاربری";
    } else if (pathname.includes('/reservations')) {
      return "مدیریت رزروها";
    } else if (pathname.includes('/favorites')) {
      return "علاقه‌مندی‌ها";
    } else if (pathname.includes('/payments')) {
      return "پرداخت‌ها";
    } else if (pathname.includes('/notifications')) {
      return "اعلان‌ها";
    }
    return "داشبرد";
  };

  return (
    <h2 className="text-xl font-yekan font-bold my-auto">
      {getTitle()}
    </h2>
  );
}