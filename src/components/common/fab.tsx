"use client";
// React
import { Fragment, useEffect, useRef, useState } from "react";

// Dependencies
import { toggleAppTheme } from "@/utils/hooks/react-redux/store/slices/themeSlice";
import { Menu, Transition } from "@headlessui/react";

// Icons
import { Globe, Mic, Moon, Stars, Sun } from "lucide-react";

// Change lang
import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";

// Third party components
import { useAppDispatch } from "@/utils/hooks/react-redux/store/hook";
import { toast } from "react-toastify";
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
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [theme, setTheme] = useState("light");
  const dispatch = useAppDispatch();

  // Create a properly typed ref for the SpeechRecognition instance
  const recognitionRef = useRef<any>(null);

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

  // Process voice commands
  const processVoiceCommand = (text: string) => {
    const command = text.toLowerCase().trim();

    // Show what was recognized
    setTranscript(text);

    // Command mapping
    if (command.includes("chat") || command.includes("assistant")) {
      setChatOpen(true);
      return true;
    }

    if (command.includes("reserve") || command.includes("booking")) {
      router.push("/reserve");
      return true;
    }

    if (command.includes("home") || command.includes("main")) {
      router.push("/");
      return true;
    }

    // Language commands
    if (command.includes("english") || command.includes("انگلیسی")) {
      changeLanguage("en");
      return true;
    }

    if (
      command.includes("persian") ||
      command.includes("farsi") ||
      command.includes("فارسی")
    ) {
      changeLanguage("fa");
      return true;
    }

    if (command.includes("turkish") || command.includes("türkçe")) {
      changeLanguage("tr");
      return true;
    }

    if (command.includes("arabic") || command.includes("عربی")) {
      changeLanguage("ar");
      return true;
    }

    return false;
  };

  // Initialize speech recognition
  useEffect(() => {
    // Only run in browser
    if (typeof window === "undefined") return;

    // Get the appropriate SpeechRecognition constructor
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) return;

    // Clean up previous instance if it exists
    if (recognitionRef.current) {
      recognitionRef.current.abort();
      recognitionRef.current = null;
    }

    // Create and configure a new instance
    const recognition = new SpeechRecognition();
    recognition.lang =
      locale === "fa"
        ? "fa-IR"
        : locale === "ar"
          ? "ar-SA"
          : locale === "tr"
            ? "tr-TR"
            : "en-US";
    recognition.interimResults = true;
    recognition.continuous = false;
    recognition.maxAlternatives = 1;

    // Handle results
    recognition.onresult = (event: any) => {
      const current = event.resultIndex;
      const result = event.results[current];
      const text = result[0].transcript;

      // Only process final results
      if (result.isFinal) {
        const commandProcessed = processVoiceCommand(text);

        if (!commandProcessed) {
          toast.info("درحال پردازش");
        } else {
          toast.success("دستور با موفقیت اجرا شد");
        }
      }
    };

    // Handle end of speech
    recognition.onend = () => {
      setListening(false);
      setTranscript("");
    };

    // Handle errors
    recognition.onerror = (event: any) => {
      setListening(false);
      setTranscript("");

      if (event.error === "no-speech") {
        toast.info(t("Fab.noSpeech") || "No speech detected");
      } else if (event.error === "not-allowed") {
        toast.error(t("Fab.microphoneBlocked") || "Microphone access blocked");
      } else {
        toast.error(t("Fab.speechError") || "Speech recognition error");
      }
    };

    // Store the instance in the ref
    recognitionRef.current = recognition;

    // Clean up on unmount or when locale changes
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
        recognitionRef.current = null;
      }
    };
  }, [locale, t, router, dispatch]);

  // Handle voice command button click
  const handleVoiceCommand = () => {
    if (typeof window === "undefined") return;

    // Check if speech recognition is supported
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      toast.info(
        t("Fab.notSupported") ||
          "Voice recognition is not supported in this browser."
      );
      return;
    }

    // Toggle listening state
    if (!listening) {
      setListening(true);
      setTranscript("");

      try {
        if (recognitionRef.current) {
          recognitionRef.current.start();
        }
      } catch (error) {
        toast.error(t("Fab.startError") || "Could not start voice recognition");
        setListening(false);
      }
    } else {
      setListening(false);
      setTranscript("");

      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    }
  };

  return (
    <>
      <ChatAssistant isOpen={chatOpen} setIsOpen={setChatOpen} />
      {!open && <BackToTopButton />}
      <div className="fixed z-50 bottom-6 rtl:left-6 right-6 flex-col items-end gap-2 lg:flex md:flex hidden">
        {open && (
          <div className="flex flex-col items-end gap-2 mb-1 animate-fade-in">
            <Menu as="div" className="relative inline-block text-left">
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
                dispatch(toggleDarkMode());
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
              onClick={handleVoiceCommand}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg shadow bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition text-gray-800 dark:text-gray-100 text-xs ${
                listening ? "ring-2 ring-blue-400" : ""
              }`}
              aria-pressed={listening}
            >
              <Mic
                className={`w-4 h-4 ${
                  listening ? "text-blue-500 animate-pulse" : "text-gray-500"
                }`}
              />
              <span>
                {listening
                  ? transcript || t("Fab.listening") || "Listening..."
                  : t("Fab.voice") || "Voice"}
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
