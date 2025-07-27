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
import Modal from "../modal/modal";
import { FaSignOutAlt } from "react-icons/fa";
import { User } from "lucide-react";

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
    <div className="relative" ref={dropdownRef}>
      <Modal
        className="!w-[300px]"
        trigger={
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 cursor-pointer rounded-full border border-border dark:border-border-dark p-1 hover:bg-surface dark:hover:bg-surface transition-colors"
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
                    user.email
                      .replace("@gmail.com", "")
                      .charAt(0)
                      .toUpperCase()}
                </div>
              )}
            </div>
          </div>
        }
      >
        {" "}
        <div className="absolute w-full rounded-lg shadow-lg bg-background dark:bg-background-dark border border-border dark:border-border-dark overflow-hidden z-10">
          {/* User Info */}
          <div className="p-4 border-b border-border dark:border-border-dark">
            <p className="font-medium truncate">
              {user.email?.replace("@gmail.com", "")}
            </p>
            <p className="text-xs text-text-secondary dark:text-text-secondary-dark truncate">
              {user.email}
            </p>
          </div>

          {/* Menu Items */}
          <div className="flex flex-col p-2">
            <Link
              href="/dashboard/seller"
              className="w-full flex gap-2 text-lg px-4 py-2 rounded-md text-text hover:bg-surface dark:hover:bg-surface-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-colors"
            >
              <User />
              {t("profile")}
            </Link>
            <button
              onClick={handleLogout}
              className="w-full items-center flex gap-2 text-lg px-4 py-2 rounded-md text-red-500 text-left rtl:text-right hover:bg-red-50 dark:hover:bg-red-900/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 transition-colors"
            >
              <FaSignOutAlt />
              {t("logout")}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
