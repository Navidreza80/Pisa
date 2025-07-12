"use client";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

const UserRole = () => {
  const t = useTranslations("Dashboard");
  function getUserRoleFromPath(path: string) {
    if (path.includes("/seller")) return t("seller");
    if (path.includes("/buyer")) return t("buyer");
    return null;
  }
  const pathname = usePathname();
  const role = getUserRoleFromPath(pathname);
  return (
    <p className="text-text-secondary text-[12px] font-yekan font-semibold">
      {role}
    </p>
  );
};
export default UserRole;
