"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Button from "../../button/button";

interface UserProfileProps {
  user: {
    name?: string;
    email?: string;
    avatar?: string;
  };
}

export default function UserProfile({ user }: UserProfileProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    // Clear cookies/localStorage
    document.cookie = "serverAccessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    
    if (typeof window !== "undefined") {
      localStorage.removeItem("accessToken");
    }
    
    // Redirect to login page
    router.push("/login");
    router.refresh();
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-full border border-border dark:border-border-dark p-1 pr-3 hover:bg-surface dark:hover:bg-surface-dark transition-colors"
      >
        <div className="w-8 h-8 rounded-full overflow-hidden bg-surface dark:bg-surface-dark">
          {user.avatar ? (
            <Image 
              src={user.avatar} 
              alt={user.name || "User"} 
              width={32} 
              height={32}
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-primary text-white font-bold">
              {user.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>
          )}
        </div>
        <span className="text-sm font-medium">{user.name || user.email || "User"}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-background dark:bg-background-dark border border-border dark:border-border-dark overflow-hidden z-10">
          <div className="p-3 border-b border-border dark:border-border-dark">
            <p className="font-medium">{user.name || "User"}</p>
            <p className="text-xs text-text-secondary dark:text-text-secondary-dark truncate">{user.email || ""}</p>
          </div>
          <div className="p-2">
            <button 
              onClick={() => router.push("/profile")}
              className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-surface dark:hover:bg-surface-dark transition-colors"
            >
              پروفایل
            </button>
            <button 
              onClick={handleLogout}
              className="w-full text-left px-3 py-2 text-sm rounded-md text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              خروج
            </button>
          </div>
        </div>
      )}
    </div>
  );
}