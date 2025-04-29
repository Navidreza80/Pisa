"use client";

import InputSelect from "@/components/common/inputs/select-input";
import InputText from "@/components/common/inputs/text-inputs";
import { getAllHouse } from "@/utils/service/house/get-all-house";
import { getAllLocations } from "@/utils/service/location/location";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import ResultButton from "./result-button";

export default function Search() {
  const t = useTranslations("HomePage");
  const filterItems = [
    { text: t("sell"), id: 1 },
    { text: t("rent"), id: 2 },
    { text: t("reserve"), id: 3 },
  ];

  const orderItems = [
    { text: "نزولی", value: "DESC" },
    { text: "صعودی", value: "ASC" },
  ];

  const sortItems = [
    { text: "قیمت", value: "price" },
    { text: "امتیاز", value: "rate" },
  ];

  const [tabId, setTabId] = useState(3);
  const [houses, setHouses] = useState([]);
  const [locations, setLocations] = useState([]);

  const [filters, setFilters] = useState({
    sort: "price",
    order: "DESC",
    capacity: "",
    address: "",
  });

  const getHouses = async () => {
    const data = await getAllHouse(
      1,
      10,
      filters.sort,
      filters.order,
      filters.capacity,
      filters.address
    );
    setHouses(data);
  };

  const getLocations = async () => {
    const data = await getAllLocations();
    setLocations(data);
  };

  useEffect(() => {
    getHouses();
    getLocations();
  }, []);

  useEffect(() => {
    getHouses();
  }, [filters]);

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
              dir={tabId == item.id ? "rtl" : "ltr"}
              key={item.id}
              className={`flex overflow-hidden flex-col gap-1.5 animate-[var(--animation-fade-in)] [animation-delay:${
                0.5 + index * 0.1
              }s]`}
            >
              <div
                className={`w-0 h-1.5 relative ${
                  tabId == item.id && "bg-[#586CFF] w-full right-0"
                } rounded-b-2xl transition-all duration-300 ease-in-out`}
              ></div>
              <span
                onClick={() => setTabId(item.id)}
                className={`${
                  tabId == item.id ? "text-[#586CFF]" : "text-text-secondary "
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
              <InputSelect
                items={locations}
                onChange={(value) => handleFilterChange("address", value)}
                value={filters.address}
              />
            </div>
            <div className="flex gap-3 items-center text-sm font-medium animate-[var(--animation-slide-in-right)] [animation-delay:0.9s] [animation-fill-mode:both] opacity-0">
              <p>{t("count")}</p>
              <InputText
                placeHolder={t("enter")}
                onChange={(e) => handleFilterChange("capacity", e.target.value)}
                value={filters.capacity}
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
          </>
        )}
        <ResultButton houses={houses} />
      </div>
    </div>
  );
}
