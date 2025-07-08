"use client";

import InputSelect from "@/components/common/inputs/select-input";
import {
  locationOptions,
  orderOptions,
  propertyOptions,
  sortOptions,
} from "@/utils/constant/folder";
import {
  useAppDispatch,
  useAppSelector,
} from "@/utils/hooks/react-redux/store/hook";
import { setLandingFilters } from "@/utils/hooks/react-redux/store/slices/landing-slice";
import { useLandingHouses } from "@/utils/hooks/use-houses";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import ResultButton from "./ResultButton";

export default function Search() {
  // Hooks
  const t = useTranslations("HomePage");
  const filterItems = [
    { text: t("sell"), id: 1, type: "direct_purchase" },
    { text: t("rent"), id: 2, type: "rental" },
    { text: t("reserve"), id: 3, type: "reservation" },
  ];

  const [tab, setTab] = useState(filterItems[2]);
  const { data: houses } = useLandingHouses();

  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.landingFilters);

  const inputItems = [
    {
      id: "search",
      text: t("destination"),
      items: locationOptions,
      value: filters.search,
    },
    {
      id: "propertyType",
      text: t("property"),
      items: propertyOptions,
      value: filters.propertyType,
    },
    { id: "sort", text: t("start"), items: sortOptions, value: filters.sort },
    { id: "order", text: t("end"), items: orderOptions, value: filters.order },
  ];

  useEffect(() => {
    handleChange("transactionType", tab.type);
  }, [tab]);

  const handleChange = (name: string, value: any) => {
    dispatch(setLandingFilters({ [name]: value }));
  };

  return (
    <div className="absolute w-full min-h-[135px] bottom-20 bg-background border border-border rounded-4xl z-10 scale-[102%] flex-wrap gap-y-2.5 justify-start max-[1150px]:hidden flex animate-fade-up opacity-0">
      <div className="flex justify-end gap-5 px-6">
        {filterItems.map((item, index) => {
          return (
            <div
              key={item.id}
              className={`flex overflow-hidden flex-col gap-1.5 animate-[var(--animation-fade-in)] [animation-delay:${
                0.5 + index * 0.1
              }s]`}
            >
              <div
                className={`w-0 h-1.5 relative ${
                  tab.id == item.id && "bg-[#586CFF] w-full right-0"
                } rounded-b-2xl transition-all duration-300 ease-in-out`}
              ></div>
              <span
                onClick={() => setTab(item)}
                className={`${
                  tab.id == item.id ? "text-[#586CFF]" : "text-text-secondary "
                } cursor-pointer font-semibold transition-colors duration-300 ease-in-out hover:text-[#586CFF]/80`}
              >
                {item.text}
              </span>
            </div>
          );
        })}
      </div>
      <div className="w-full p-2 px-5 h-1/2 flex justify-between items-center flex-wrap gap-y-3 animate-[var(--animation-fade-in)] [animation-delay:0.7s] [animation-fill-mode:both] opacity-0">
        {inputItems.map((input, index) => {
          return (
            <div
              key={input.id}
              className={`flex gap-3  items-center text-sm font-medium animate-fade-left animate-delay-[${(index * 100 + 800).toString}ms]`}
            >
              <label className="cursor-pointer" htmlFor={input.id}>
                {input.text}
              </label>
              <InputSelect
                id={input.id}
                items={input.items}
                value={input.value || ""}
                onChange={(value) => handleChange(input.id, value)}
                width={161}
              />
            </div>
          );
        })}
        <ResultButton houses={houses} />
      </div>
    </div>
  );
}
