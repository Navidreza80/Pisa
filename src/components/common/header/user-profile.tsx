"use client";

import { handleLogout } from "@/lib/actions/auth";
import type { UserProfileProps } from "@/types/user";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { FaSignOutAlt } from "react-icons/fa";
import { User } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

export default function UserProfile({ user }: UserProfileProps) {
  const t = useTranslations("Header");

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="p-1 rounded-full border border-border dark:border-border-dark hover:bg-surface dark:hover:bg-surface-dark transition"
        >
          <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-400 dark:bg-surface-dark cursor-pointer">
            {user?.profilePicture ? (
              <Image
                unoptimized
                src={user.profilePicture}
                alt={user.name || "User"}
                width={32}
                height={32}
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white font-semibold">
                {user.email?.[0]?.toUpperCase()}
              </div>
            )}
          </div>
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        className="w-[260px] p-0 rounded-lg border border-border dark:border-border-dark shadow-md bg-background dark:bg-background-dark"
      >
        {/* User Info */}
        <div className="px-4 py-3 border-b border-border dark:border-border-dark">
          <p className="font-medium truncate">{user.email?.split("@")[0]}</p>
          <p className="text-xs text-muted-foreground truncate">{user.email}</p>
        </div>

        {/* Menu Items */}
        <div className="py-2">
          <Link
            href="/dashboard/buyer"
            className="flex items-center gap-2 px-4 py-2 hover:bg-muted transition text-sm"
          >
            <User className="h-4 w-4" />
            {t("profile")}
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full px-4 py-2 cursor-pointer text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 text-sm transition"
          >
            <FaSignOutAlt className="h-4 w-4" />
            {t("logout")}
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
