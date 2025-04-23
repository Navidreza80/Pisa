"use client";

import InputDate from "@/components/common/inputs/date-input";
import InputSelect from "@/components/common/inputs/select-input";
import InputText from "@/components/common/inputs/text-inputs";
import { useState } from "react";


export default function Search() {
  const filterItems = [
    { text: "خرید و فروش", id: 1 },
    { text: "رهن و اجاره", id: 2 },
    { text: "رزرو ملک", id: 3 },
  ];
  const [tabId, setTabId] = useState(3);
  return (
    <div className="absolute w-full min-h-[135px] bg-surface dark:bg-surface-dark border border-[#EAEAEA]  bottom-28 rounded-4xl z-10 scale-[102%] flex-wrap gap-y-2.5 justify-end max-[1150px]:hidden flex">
      <div className="flex justify-end gap-5 px-6">
        {filterItems.map((item) => {
          return (
            <div key={item.id} className="flex flex-col gap-1.5">
              <div
                className={`w-full h-1.5 ${
                  tabId == item.id && "bg-[#586CFF]"
                } rounded-b-2xl`}
              ></div>
              <span
                onClick={() => setTabId(item.id)}
                className={`${
                  tabId == item.id ? "text-[#586CFF]" : "text-text-secondary dark:text-text-secondary-dark"
                }`}
              >
                {item.text}
              </span>
            </div>
          );
        })}
      </div>
      <div
        dir="rtl"
        className="w-full p-2 h-1/2 flex justify-between items-center flex-wrap gap-y-3"
      >
        {tabId == 3 && (
          <>
            <div className="flex gap-3 items-center text-sm font-medium">
              <p>انتخاب مقصد</p>
              <InputSelect />
            </div>
            <div className="flex gap-3 items-center text-sm font-medium">
              <p>تعداد نفرات</p>
              <InputText placeHolder="وارد کنید" />
            </div>
            <div className="flex gap-3 items-center text-sm font-medium">
              <p>تاریخ ورود</p>
              <InputDate />
            </div>
            <div className="flex gap-3 items-center text-sm font-medium">
              <p>تاریخ خروج</p>
              <InputDate />
            </div>
          </>
        )}
        <button className="w-[133px] h-[48px] rounded-2xl bg-[#586CFF] text-white">
          مشاهده نتیجه
        </button>
      </div>
    </div>
  );
}
