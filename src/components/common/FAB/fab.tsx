"use client";
// React
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
// Icons
import { Globe, MessageCircle, Moon, Sun } from "lucide-react";
// Change lang
import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
// Third party components
import ChatAssistant from "../chat/ai-assistant";
// Redux
import { useDispatch } from "react-redux";
// Types
import { toggleDarkMode } from "@/utils/hooks/react-redux/store/slices/themeSlice";

export default function FloatingActions() {
  const t = useTranslations();
  // States
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

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

  // Redux
  const dispatch = useDispatch();

  // UseEffects
  useEffect(() => {
    const html = document.documentElement;
    if (dark) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [dark]);

  return (
    <>
      <ChatAssistant isOpen={chatOpen} setIsOpen={setChatOpen} />

      <div className="fixed z-50 bottom-8 right-8 flex flex-col items-end gap-3">
        {open && (
          <div className="flex flex-col items-end gap-3 mb-2 animate-fade-in">
            {/* Language Switch - Now positioned first */}
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="flex items-center gap-2 px-4 py-2 rounded-xl shadow-lg bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition text-gray-800 dark:text-gray-100">
                  <Globe className="w-5 h-5 text-purple-500" />
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
                <Menu.Items className="absolute right-0 bottom-full mb-2 w-40 origin-bottom-right divide-y divide-gray-100 rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black/5 focus:outline-none z-50">
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
                            } group flex w-full items-center rounded-md px-4 py-2 text-sm text-gray-900 dark:text-gray-100`}
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

            {/* Dark Mode Toggle */}
            <button
              onClick={() => {
                setDark((d) => !d);
                dispatch(toggleDarkMode());
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl shadow-lg bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition text-gray-800 dark:text-gray-100"
            >
              {dark ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-blue-500" />
              )}
              <span>{dark ? t("Fab.dark") : t("Fab.dark")}</span>
            </button>

            {/* Chat Box */}
            <button
              onClick={() => setChatOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl shadow-lg bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition text-gray-800 dark:text-gray-100"
            >
              <MessageCircle className="w-5 h-5 text-green-500" />
              <span>{t("Assistant.chat")}</span>
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
      </div>
    </>
  );
}
