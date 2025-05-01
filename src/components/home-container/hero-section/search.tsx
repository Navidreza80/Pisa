"use client";

import InputSelect from "@/components/common/inputs/select-input";
import { getAllHouse } from "@/utils/service/house/get-all-house";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import ResultButton from "./result-button";

export default function Search() {
  const t = useTranslations("HomePage");
  const filterItems = [
    { text: t("sell"), id: 1, type: "direct_purchase" },
    { text: t("rent"), id: 2, type: "rental" },
    { text: t("reserve"), id: 3, type: "reservation" },
  ];

  const locations = [
    { text: "تهران", value: "تهران" },
    { text: "شیراز", value: "شیراز" },
    { text: "اصفهان", value: "اصفهان" },
  ];

  const propertyOptions = [
    { text: "آپارتمان", value: "آپارتمان" },
    { text: "ویلا", value: "ویلا" },
    { text: "روستایی", value: "روستایی" },
  ];

  const orderItems = [
    { text: "نزولی", value: "DESC" },
    { text: "صعودی", value: "ASC" },
  ];

  const sortItems = [
    { text: "قیمت", value: "price" },
    { text: "امتیاز", value: "rate" },
  ];

  const [tab, setTab] = useState(filterItems[2]);
  const [houses, setHouses] = useState([]);

  const [filters, setFilters] = useState({
    sort: "price",
    order: "DESC",
    address: "",
    propertyType: "",
  });

  const getHouses = async () => {
    const data = await getAllHouse(
      1,
      10,
      filters.sort,
      filters.order,
      filters.address,
      tab.type,
      filters.propertyType
    );
    setHouses(data);
  };

  useEffect(() => {
    getHouses();
  }, []);

  useEffect(() => {
    getHouses();
  }, [filters, tab]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="absolute w-full min-h-[135px] bg-background border border-border  bottom-28 rounded-4xl z-10 scale-[102%] flex-wrap gap-y-2.5 justify-end max-[1150px]:hidden flex animate-[var(--animation-fade-in-up)] [animation-delay:0.3s] [animation-fill-mode:both] opacity-0">
      <div className="flex justify-end gap-5 px-6">
        {filterItems.map((item, index) => {
          return (
            <div
              dir={tab.id == item.id ? "rtl" : "ltr"}
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
        <div className="flex gap-3 items-center text-sm font-medium animate-[var(--animation-slide-in-right)] [animation-delay:0.8s] [animation-fill-mode:both] opacity-0">
          <p>{t("destination")}</p>
          <InputSelect
            items={locations}
            onChange={(value) => handleFilterChange("address", value)}
            value={filters.address}
          />
        </div>
        <div className="flex gap-3 items-center text-sm font-medium animate-[var(--animation-slide-in-right)] [animation-delay:0.9s] [animation-fill-mode:both] opacity-0">
          <p>{t("count")}</p>
          <InputSelect
            width={262}
            items={sortItems}
            onChange={(value) => handleFilterChange("sort", value)}
          />
        </div>
        <div className="flex gap-3 items-center text-sm font-medium animate-[var(--animation-slide-in-right)] [animation-delay:1s] [animation-fill-mode:both] opacity-0">
          <p>{t("start")}</p>
          <InputSelect
            items={sortItems}
            onChange={(value) => handleFilterChange("sort", value)}
            value={filters.sort}
          />
        </div>
        <div className="flex gap-3 items-center text-sm font-medium animate-[var(--animation-slide-in-right)] [animation-delay:1.1s] [animation-fill-mode:both] opacity-0">
          <p>{t("end")}</p>
          <InputSelect
            items={orderItems}
            onChange={(value) => handleFilterChange("order", value)}
            value={filters.order}
          />
        </div>
        <ResultButton houses={houses} />
      </div>
    </div>
  );
}
