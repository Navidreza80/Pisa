"use client";

import Slider from "@/components/common/slider/Slider";
import BathroomSVG from "@/components/common/svg/bathroom";
import BedSVG from "@/components/common/svg/bed";
import CarSVG from "@/components/common/svg/car";
import MapSVG from "@/components/common/svg/map";
import ParkSVG from "@/components/common/svg/park";
import { SwiperSlide } from "swiper/react";
import { HouseItemsInterface } from "@/types/house";

interface TopSaleCardListProps {
  data: HouseItemsInterface[];
}

export default function TopSaleCardList({ data }: TopSaleCardListProps) {
  return (
    <div className="flex gap-[30px] justify-center md:justify-center lg:justify-between flex-wrap flex-row">
      {data.map((card: HouseItemsInterface, index: number) => (
        <div
          key={index}
          className="flex flex-col flex-wrap justify-between border-[1px] min-w-[391px] w-[calc(33.3%-20px)] p-[16px] rounded-[40px] h-[438px] border-border "
        >
          <div className="overflow-hidden w-full h-[221px] rounded-b-[16px] rounded-t-[24px] bg-black">
            <Slider
              className="w-full h-full"
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              loop
            >
              {(card.photos && card.photos.length > 0
                ? card.photos
                : [card.imageUrl]
              ).map((photo, idx) => (
                <SwiperSlide key={idx}>
                  <div className="w-full h-[221px] relative">
                    <img
                      className="object-cover w-full h-full"
                      src={photo}
                      alt={`${card.title} - تصویر ${idx + 1}`}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Slider>
          </div>
          <h1 className="font-[600] text-right text-[20px] text-text ">
            {card.title}
          </h1>
          <div className="flex justify-end gap-[5px]">
            <h1 className="text-right font-[500] text-[14px] text-text-secondary ">
              {card.address}
            </h1>
            <MapSVG color="gray" />
          </div>
          <div className="bg-border  h-[1px]"></div>
          <div className="flex flex-row-reverse justify-between">
            <div className="flex flex-row-reverse gap-[5px]">
              <BedSVG />
              <div className="flex flex-row-reverse gap-[3px]">
                <h1 className=" font-[yekannum]">{card.rooms}</h1>
                <h1>خواب</h1>
              </div>
            </div>
            <div className="bg-border  w-[1px]" />
            <div className="flex flex-row-reverse gap-[5px]">
              <BathroomSVG />
              <div className="flex flex-row-reverse gap-[3px]">
                <h1 className=" font-[yekannum]">{card.bathrooms}</h1>
                <h1>حمام</h1>
              </div>
            </div>
            <div className="bg-border  w-[1px]" />
            <div className="flex flex-row-reverse gap-[5px]">
              <ParkSVG />
              <div className="flex flex-row-reverse gap-[3px]">
                <h1 className="text-right">{card.yard_type}</h1>
              </div>
            </div>
            <div className="bg-border  w-[1px]" />
            <div className="flex flex-row-reverse gap-[5px]">
              <CarSVG />
              <div className="flex flex-row-reverse gap-[3px]">
                <h1 className=" font-[yekannum]">{card.parking}</h1>
                <h1>پارکینگ</h1>
              </div>
            </div>
          </div>
          <div className="flex gap-1" dir="rtl">
            <div className="flex flex-row-reverse gap-[10px]">
              <div className="relative">
                <div className="flex flex-row-reverse gap-[5px] ">
                  <h1 className="text-[20px] font-[yekannum] font-[700] my-auto">
                    {card.price}
                  </h1>
                </div>
              </div>
            </div>
            <p className="text-[12px] font-[700] my-auto text-text-secondary ">
              تومان
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}