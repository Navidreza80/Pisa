/* eslint-disable */

"use client";
// React
import { Fragment, useEffect, useState } from "react";

// Dependencies
import { toggleAppTheme } from "@/utils/hooks/react-redux/store/slices/themeSlice";
import { Menu, Transition } from "@headlessui/react";

// Icons
import { Globe, Moon, Stars, Sun } from "lucide-react";

// Change lang
import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";

// Third party components
import { useAppDispatch } from "@/utils/hooks/react-redux/store/hook";
import BackToTopButton from "./BackToTopBtn";
import ChatAssistant from "./chat/ai-assistant";

/**
 * Floating action buttons component.
 * For changing theme, language and chat box.
 *
 * @component
 * @returns {JSX.Element} - Rendered FAB
 */

export default function FloatingActions() {
  // Hooks
  const t = useTranslations();
  // States
  const [open, setOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const dispatch = useAppDispatch();

  // Change lang
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const changeLanguage = (newLocale: string) => {
    router.push(pathname, { locale: newLocale });
  };

  const languages = [
    { code: "fa", name: "فارسی", dir: "rtl" },
    { code: "en", name: "English", dir: "ltr" },
    { code: "tr", name: "Türkçe", dir: "ltr" },
    { code: "ar", name: "العربية", dir: "rtl" },
  ];

  const currentLanguage =
    languages.find((lang) => lang.code === locale) || languages[0];

  // Toggle theme
  const toggleTheme = () => {
    const html = document.documentElement;
    html.classList.remove("dark", "solarized");
    dispatch(toggleAppTheme("light"));
    if (theme === "dark") {
      html.classList.add("dark");
      dispatch(toggleAppTheme("dark"));
    } else if (theme === "solarized") {
      html.classList.add("solarized");
      dispatch(toggleAppTheme("solarized"));
    }
  };

  useEffect(() => {
    toggleTheme();
  }, [theme]);

  return (
    <>
      <ChatAssistant isOpen={chatOpen} setIsOpen={setChatOpen} />
      {!open && <BackToTopButton />}
      <div className="fixed z-50 bottom-6 ltr:left-6 right-6 flex-col items-start ltr:items-end gap-2 flex">
        {open && (
          <div className="flex flex-col items-start ltr:items-end gap-2 mb-1 animate-fade-in">
            <Menu as="div" className="relative inline-block ">
              <div>
                <Menu.Button className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg shadow bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition text-gray-800 dark:text-gray-100 text-xs">
                  <Globe className="w-4 h-4 text-purple-500" />
                  <span>{currentLanguage.name}</span>
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 bottom-full mb-1 w-32 origin-bottom-right divide-y divide-gray-100 rounded bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black/5 focus:outline-none z-50 text-xs">
                  <div className="px-1 py-1">
                    {languages.map((language) => (
                      <Menu.Item key={language.code}>
                        {({ active }) => (
                          <button
                            onClick={() => changeLanguage(language.code)}
                            className={`${
                              active ? "bg-purple-100 dark:bg-gray-700" : ""
                            } ${
                              locale === language.code
                                ? "bg-purple-200 dark:bg-purple-900"
                                : ""
                            } group flex w-full items-center rounded px-3 py-1 text-xs text-gray-900 dark:text-gray-100`}
                          >
                            {language.name}
                          </button>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>

            <button
              onClick={() => {
                setTheme((prev) =>
                  prev === "light"
                    ? "dark"
                    : prev === "dark"
                      ? "solarized"
                      : "light"
                );
              }}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg shadow bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition text-gray-800 dark:text-gray-100 text-xs"
            >
              {theme === "light" ? (
                <Sun className="w-4 h-4 text-yellow-400" />
              ) : theme === "solarized" ? (
                <Stars className="w-4 h-4 text-orange-400" />
              ) : (
                <Moon className="w-4 h-4 text-blue-500" />
              )}
              <span>
                {theme === "dark"
                  ? t("Fab.dark")
                  : theme === "solarized"
                    ? t("Fab.solarized") || "Solarized"
                    : t("Fab.light") || "Light"}
              </span>
            </button>

            <button
              onClick={() => setChatOpen(true)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg shadow bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition text-gray-800 dark:text-gray-100 text-xs"
            >
              <Stars className="w-4 h-4 text-green-500" />
              <span>{t("Assistant.chat")}</span>
            </button>
            <ChatAssistant isOpen={chatOpen} setIsOpen={setChatOpen} />
          </div>
        )}
        <button
          onClick={() => setOpen((o) => !o)}
          className="w-12 h-12 rounded-full bg-gradient-to-br from-[#586CFF] to-[#7F9CF5] shadow-2xl flex items-center justify-center text-white text-2xl hover:scale-110 transition-all border-4 border-white dark:border-gray-800"
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
      </div>
    </>
  );
}
