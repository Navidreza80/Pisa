"use client";
// Actions
import { handleLogout } from "@/lib/actions/auth";
// Types
import type { UserProfileProps } from "@/types/user";

// Next
import { useTranslations } from "next-intl";

// Image
import Image from "next/image";
import Link from "next/link";

// React
import { useEffect, useRef, useState } from "react";

/**
 * User profile component to show when the user is signed in.
 *
 * @component
 * @param {UserProfileProps} props - Component props
 * @returns {JSX.Element} - Rendered user profile
 */

export default function UserProfile({ user }: UserProfileProps) {
  // Hooks
  const t = useTranslations("Header");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // UseEffects
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="max-w-20 relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 cursor-pointer rounded-full border border-border dark:border-border-dark p-1  lg:pr-3 md:pr-1 pr-1 hover:bg-surface dark:hover:bg-surface transition-colors"
      >
        <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-400 dark:bg-surface-dark">
          {user?.profilePicture ? (
            <Image
              unoptimized
              src={user.profilePicture || null}
              alt={user.name || "User"}
              width={32}
              height={32}
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-text border-border font-bold">
              {user.email &&
                user.email.replace("@gmail.com", "").charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <span className="text-sm  lg:block md:hidden hidden  overflow-hidden whitespace-nowrap text-ellipsis font-medium">
          {user.email?.replace("@gmail.com", "")}
        </span>
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-48 rounded-lg animate-fade-down bg-background dark:bg-background-dark border border-border dark:border-border-dark overflow-hidden z-10">
          <div className="p-3 border-b border-border dark:border-border-dark">
            <p className="font-medium">
              {user.email?.replace("@gmail.com", "")}
            </p>
            <p className="text-xs text-text-secondary dark:text-text-secondary-dark truncate">
              {user.email}
            </p>
          </div>
          <div className="p-2">
            <Link
              href="/dashboard/seller"
              className="w-full cursor-pointer  px-3 py-2 text-sm rounded-md hover:bg-surface dark:hover:bg-surface-dark transition-colors"
            >
              {t("profile")}
            </Link>
            <button
              onClick={handleLogout}
              className="w-full cursor-pointer  px-3 py-2 text-sm rounded-md text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              {t("logout")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
