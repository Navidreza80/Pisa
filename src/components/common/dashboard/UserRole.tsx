"use client"
import { usePathname } from "next/navigation";

const UserRole = () => {
  function getUserRoleFromPath(path: string): "فروشنده" | "خریدار" | null {
    if (path.includes("/seller")) return "فروشنده";
    if (path.includes("/buyer")) return "خریدار";
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
