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
import { FilterModal } from "../common/house/filter-rent";
import HouseSkeleton from "../common/skeleton/house-skeleton";
import { useTranslations } from "next-intl";

function Rent() {
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

  const handleChange = (name: string, value: any) => {
    dispatch(setRentFilters({ [name]: value }));
  };

  return (
    <div dir="rtl" className="w-[85.5%] pt-[32px] flex flex-wrap gap-[24px] ">
      <div>
        <div className="flex gap-[8px] mb-[32px]">
          <h1 className="text-black text-[36px] font-[700]">
            {t("apartmentRentTitle")}
          </h1>
          {filters.search && (
            <div className="bg-[#586CFF] rounded-[16px] text-white p-[8px] text-[28px] font-[700]">
              {filters.search}
            </div>
          )}
        </div>
        <div
          dir="rtl"
          className="flex flex-row-reverse flex-wrap justify-end gap-[16px] p-4"
        >
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

          <span className="h-[24px] w-[1px] my-auto bg-[#EAEAEA]" />

          <div className="h-[48px] w-[306px] my-auto relative">
            <input
              type="text"
              placeholder={t("searchPlaceholder")}
              className="w-full h-full border border-gray-300 rounded-[16px] p-4 pr-[48px] text-sm outline-none placeholder:text-[#A6A6A6]"
            />
            <svg
              className="absolute top-[12px] right-[12px]"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.5 9H6.5"
                stroke="#586CFF"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2.5 14H6.5"
                stroke="#586CFF"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2.5 4H18.5"
                stroke="#586CFF"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M18.5355 17.0355L21.5 20M20 13.5C20 10.7386 17.7614 8.5 15 8.5C12.2386 8.5 10 10.7386 10 13.5C10 16.2614 12.2386 18.5 15 18.5C17.7614 18.5 20 16.2614 20 13.5Z"
                stroke="#586CFF"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
      <span className="h-[1px] w-full my-auto bg-[#EAEAEA]" />
      <div className="flex justify-between flex-wrap">
        {isLoading &&
          [...Array(6)].map((_, i) => (
            <HouseSkeleton
              width="w-[calc(33.3%-20px)]"
              minWidth="min-w-[391px]"
              key={i}
            />
          ))}
        {houses?.map((card: HouseItemsInterface, index: number) => (
          <HouseCardList
            key={index}
            discount
            showRooms
            showBathrooms
            showParking
            card={card}
            setCurrentLoc={[]}
          />
        ))}
      </div>
    </div>
  );
}

export default Rent;
