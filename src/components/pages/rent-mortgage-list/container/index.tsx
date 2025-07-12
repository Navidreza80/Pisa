"use client";
import HouseCardList from "@/components/common/house/HouseCardList";
import { HouseItemsInterface } from "@/types/house";
import {
  useAppDispatch,
  useAppSelector,
} from "@/utils/hooks/react-redux/store/hook";
import { setRentFilters } from "@/utils/hooks/react-redux/store/slices/rent-slice";
import { useRentHouses } from "@/utils/hooks/use-houses";
import { useState } from "react";
import FilterModal from "../modals/FilterModal";
import HouseSkeleton from "@/components/common/house/house-skeleton";
import { useTranslations } from "next-intl";
import SearchSVG from "@/components/common/svg/search";

const Rent = () => {
  const t = useTranslations("rent");
  const filters = useAppSelector((state) => state.rentFilters);

  const filtersItems = [
    { text: t("mostExpensive"), value: "price", order: "DESC" },
    { text: t("cheapest"), value: "price", order: "ASC" },
    { text: t("mostPopular"), value: "rate", order: "DESC" },
    { text: t("all"), value: null, order: null },
  ];

  const [selectedFilter, setSelectedFilter] = useState(t("all"));
  const { data: houses, isLoading } = useRentHouses();
  const dispatch = useAppDispatch();

  const handleChange = (name: string, value: string | null) => {
    dispatch(setRentFilters({ [name]: value }));
  };

  return (
    <div className="w-[85.5%] pt-[32px] flex flex-wrap gap-[24px] ">
      {/* Title */}
      <div>
        <div className="flex gap-[8px] mb-[32px] animate-fade-down">
          <h1 className="text-text text-[36px] font-[700]">
            {t("apartmentRentTitle")}
          </h1>
          {filters.search && (
            <div className="bg-[#586CFF] lg:block md:block hidden rounded-[16px] text-white p-[8px] text-[28px] font-[700]">
              {filters.search}
            </div>
          )}
        </div>
        {/* Filter and Sort Options */}
        <div className="flex animate-fade-up flex-row-reverse flex-wrap justify-end gap-[16px] py-4">
          {filtersItems.map((item) => (
            <button
              key={item.text}
              onClick={() => {
                setSelectedFilter(item.text);
                handleChange("sort", item.value);
                handleChange("order", item.order);
              }}
              className={`px-4 py-3.5 h-12 flex items-center text-center rounded-[16px] border text-[16px] transition cursor-pointer
                ${
                  selectedFilter === item.text
                    ? "bg-[#586CFF] text-white"
                    : "bg-white text-[#272727] border-[#EAEAEA] border-[1.5px]"
                }
              `}
            >
              {item.text}
            </button>
          ))}

          <span className="h-[24px] w-[1px] my-auto bg-[#EAEAEA]" />

          <div className=" flex gap-2">
            <FilterModal />
          </div>

          <span className="h-[24px] lg:block md:block hidden w-[1px] my-auto bg-[#EAEAEA]" />

          <div className="h-[48px] w-[306px] my-auto relative">
            <input
              value={filters.search || ""}
              onChange={(e) => handleChange("search", e.target.value)}
              type="text"
              placeholder={t("searchPlaceholder")}
              className="w-full h-full border border-gray-300 rounded-[16px] p-4 pr-[48px] ltr:pl-[48px] text-sm outline-none placeholder:text-[#A6A6A6]"
            />
            <SearchSVG className="absolute top-[12px] right-[12px] ltr:left-[12px]" />
          </div>
        </div>
      </div>
      <span className="h-[1px] w-full my-auto bg-[#EAEAEA]" />
      {/* Lists */}
      <div className="flex lg:justify-between md:justify-center justify-center flex-wrap">
        {isLoading &&
          [...Array(6)].map((_, i) => (
            <HouseSkeleton
              width="w-[calc(33.3%-20px)]"
              minWidth="min-w-[391px]"
              key={i}
            />
          ))}
        {houses?.length > 0 ? (
          houses?.map((card: HouseItemsInterface, index: number) => (
            <HouseCardList
              key={index}
              showRooms
              showCapacity
              showBathrooms
              showParking
              card={card}
            />
          ))
        ) : (
          <div className="font-bold text-2xl">{t("noResult")}</div>
        )}
      </div>
    </div>
  );
};

export default Rent;
