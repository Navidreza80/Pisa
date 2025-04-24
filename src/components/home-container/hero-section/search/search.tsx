"use client";

import InputDate from "@/components/common/inputs/date-input";
import InputSelect from "@/components/common/inputs/select-input";
import InputText from "@/components/common/inputs/text-inputs";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";

export default function Search() {
  const t = useTranslations("HomePage");
  const filterItems = [
    { text: t("sell"), id: 1 },
    { text: t("rent"), id: 2 },
    { text: t("reserve"), id: 3 },
  ];
  const [tabId, setTabId] = useState(3);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="absolute w-full min-h-[135px] bg-background dark:bg-surface-dark border border-border dark:border-border-dark bottom-28 rounded-4xl z-10 scale-[102%] flex-wrap gap-y-2.5 justify-end max-[1150px]:hidden flex animate-[var(--animation-fade-in-up)] [animation-delay:0.3s] [animation-fill-mode:both] opacity-0">
      <div className="flex justify-end gap-5 px-6">
        {filterItems.map((item, index) => {
          return (
            <div 
              key={item.id} 
              className={`flex flex-col gap-1.5 animate-[var(--animation-fade-in)] [animation-delay:${0.5 + index * 0.1}s] [animation-fill-mode:both] opacity-0`}
            >
              <div
                className={`w-full h-1.5 ${
                  tabId == item.id && "bg-[#586CFF]"
                } rounded-b-2xl transition-all duration-300 ease-in-out`}
              ></div>
              <span
                onClick={() => setTabId(item.id)}
                className={`${
                  tabId == item.id
                    ? "text-[#586CFF]"
                    : "text-text-secondary dark:text-text-secondary-dark"
                } cursor-pointer transition-colors duration-300 ease-in-out hover:text-[#586CFF]/80`}
              >
                {item.text}
              </span>
            </div>
          );
        })}
      </div>
      <div
        dir="rtl"
        className="w-full p-2 h-1/2 flex justify-between items-center flex-wrap gap-y-3 animate-[var(--animation-fade-in)] [animation-delay:0.7s] [animation-fill-mode:both] opacity-0"
      >
        {tabId == 3 && (
          <>
            <div className="flex gap-3 items-center text-sm font-medium animate-[var(--animation-slide-in-right)] [animation-delay:0.8s] [animation-fill-mode:both] opacity-0">
              <p>{t("destination")}</p>
              <InputSelect />
            </div>
            <div className="flex gap-3 items-center text-sm font-medium animate-[var(--animation-slide-in-right)] [animation-delay:0.9s] [animation-fill-mode:both] opacity-0">
              <p>{t("count")}</p>
              <InputText placeHolder={t("enter")} />
            </div>
            <div className="flex gap-3 items-center text-sm font-medium animate-[var(--animation-slide-in-right)] [animation-delay:1s] [animation-fill-mode:both] opacity-0">
              <p>{t("start")}</p>
              <InputDate />
            </div>
            <div className="flex gap-3 items-center text-sm font-medium animate-[var(--animation-slide-in-right)] [animation-delay:1.1s] [animation-fill-mode:both] opacity-0">
              <p>{t("end")}</p>
              <InputDate />
            </div>
          </>
        )}
        <button className="w-[133px] h-[48px] rounded-2xl bg-[#586CFF] text-white hover:bg-[#4A5FE3] transition-colors duration-300 ease-in-out animate-[var(--animation-pulse)] [animation-delay:1.3s] [animation-iteration-count:1] [animation-fill-mode:both]">
          {t("result")}
        </button>
      </div>
    </div>
  );
}
