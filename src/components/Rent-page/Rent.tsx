"use client";
import Button from "@/components/common/button/button";
import HouseCardList from "@/components/common/house/HouseCardList";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { HouseItemsInterface } from "@/types/house";
import { useHouses } from "@/utils/hooks/use-houses";
import { useState } from "react";

function Rent() {
  const filtersItems = [
    "حیاط دار",
    "پارکینگ دار",
    "عکس دار",
    "گران‌ترین",
    "ارزان‌ترین",
    "محبوب‌ترین",
    "همه",
  ];
  const [selectedFilter, setSelectedFilter] = useState("همه");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: houses } = useHouses();
  return (
    <div className="w-[85.5%] pt-[32px] flex flex-wrap gap-[24px] ">
      <div>
        <div dir="rtl" className="flex gap-[8px] mb-[32px]">
          <h1 className="text-black text-[36px] font-[700]">
            رهن و اجاره آپارتمان
          </h1>
          <div className="bg-[#586CFF] rounded-[16px] text-white p-[8px] text-[28px] font-[700]">
            رشت
          </div>
        </div>
        <div
          dir="rtl"
          className="flex flex-row-reverse flex-wrap justify-end gap-[16px] p-4"
        >
          {filtersItems.map((filter) => (
            <button
              key={filter}
              onClick={() => {
                setSelectedFilter(filter);
              }}
              className={`px-4 py-[14px] rounded-[16px] border text-[16px] transition cursor-pointer
            ${
              selectedFilter === filter
                ? "bg-[#586CFF] text-white"
                : "bg-white text-[#272727] border-[#EAEAEA] border-[1.5px]"
            }
          `}
            >
              {filter}
            </button>
          ))}

          <span className="h-[24px] w-[1px] my-auto bg-[#EAEAEA]" />

          <div className=" flex gap-2">
            <Button
              handleClick={() => setIsModalOpen(!isModalOpen)}
              className="!w-[85px] my-auto cursor-pointer"
            >
              فیلتر ها
            </Button>
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogContent className="!max-w-[310px] z-[1200]">
                <DialogHeader>
                  <DialogTitle className="text-base font-yekan">
                    یالله
                  </DialogTitle>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>

          <span className="h-[24px] w-[1px] my-auto bg-[#EAEAEA]" />

          <div className="h-[48px] w-[306px] my-auto relative">
            <input
              type="text"
              placeholder="جستجو کنید..."
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
