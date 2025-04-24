"use client";
import { useState, useEffect } from "react";
import { Moon, Sun, MessageCircle, Globe } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useLocale } from "next-intl";

export default function FloatingActions() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);

  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const html = document.documentElement;
    if (dark) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [dark]);

  return (
    <div className="fixed z-50 bottom-8 right-8 flex flex-col items-end gap-3">
      {/* Menu */}
      {open && (
        <div className="flex flex-col items-end gap-3 mb-2 animate-fade-in">
          {/* Dark Mode Toggle */}
          <button
            onClick={() => {
                setDark((d) => !d)
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl shadow-lg bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition text-gray-800 dark:text-gray-100"
          >
            {dark ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5 text-blue-500" />
            )}
            <span>{dark ? "Light Mode" : "Dark Mode"}</span>
          </button>
          {/* Chat Box */}
          <button
            onClick={() => alert("Chat box opened!")}
            className="flex items-center gap-2 px-4 py-2 rounded-xl shadow-lg bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition text-gray-800 dark:text-gray-100"
          >
            <MessageCircle className="w-5 h-5 text-green-500" />
            <span>Chat</span>
          </button>
          {/* Language Switch */}
          <button
            onClick={() => {
              const newLocale = locale === "fa" ? "en" : "fa";
              // Replace the locale in the current path
              const segments = pathname.split("/");
              segments[1] = newLocale;
              const newPath = segments.join("/") || "/";
              router.push(newPath);
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl shadow-lg bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition text-gray-800 dark:text-gray-100"
          >
            <Globe className="w-5 h-5 text-purple-500" />
            <span>{locale === "fa" ? "English" : "فارسی"}</span>
          </button>
        </div>
      )}
      {/* FAB */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-16 h-16 rounded-full bg-gradient-to-br from-[#586CFF] to-[#7F9CF5] shadow-2xl flex items-center justify-center text-white text-3xl hover:scale-110 transition-all border-4 border-white dark:border-gray-800"
        aria-label="Open actions"
      >
        <span
          className={`transition-transform duration-300 ${
            open ? "rotate-45" : ""
          }`}
        >
          +
        </span>
      </button>
      <style jsx global>{`
        .animate-fade-in {
          animation: fadeIn 0.25s;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
