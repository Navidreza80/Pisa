"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className={`flex fixed bottom-20 right-6 w-12 h-12 border-bg border-4 rounded-full  bg-gradient-to-br from-[#586CFF] to-[#7F9CF5] text-white items-center justify-center animate-fade text-2xl hover:opacity-100 hover:bg-primary/90 cursor-pointer transition-all duration-300 z-50`}
        >
          <ArrowUp />
        </button>
      )}
    </>
  );
};

export default BackToTopButton;
