"use client";
// Components
import Slider from "@/components/common/slider/Slider";
// SVGs
import BathroomSVG from "@/components/common/svg/bathroom";
import BedSVG from "@/components/common/svg/bed";
import CarSVG from "@/components/common/svg/car";
import MapSVG from "@/components/common/svg/map";
import ParkSVG from "@/components/common/svg/park";
import PersonSVG from "../svg/person";
// React
import { Fragment, useEffect, useState } from "react";
// Swiper
import { SwiperSlide } from "swiper/react";
// Third party components
import Favorite from "./favorite";
// Types
import { FeatureItem, TopSaleCardListProps } from "@/types/house";
import LocationSVG from "../svg/location";
import { getClientCookie } from "@/utils/service/storage/client-cookie";
import { RefreshToken } from "@/utils/service/login/RefreshToken";
import { jwtDecode } from "jwt-decode";

export default function HouseCardList({
  setCurrentLoc,
  showOnMap,
  showFacilities = true,
  width,
  minWidth,
  card,
  showYard,
  showCapacity,
  showRooms,
  showBathrooms,
  showParking,
  discount,
}: TopSaleCardListProps) {
  const token = getClientCookie("clientAccessToken");
  useEffect(() => {
    if (token) {
      const intervalId = setInterval(() => {
        RefreshToken();
      }, 9000);

      // Clean up the interval on component unmount.
      return () => clearInterval(intervalId);
    }
  }, []);
  const decoded = typeof token == "string" && jwtDecode(token);
  // Feature items
  const featureItems: FeatureItem[] = [
    {
      id: "rooms",
      icon: <BedSVG />,
      value: card.rooms,
      label: "خواب",
      show: showRooms,
    },
    {
      id: "bathrooms",
      icon: <BathroomSVG />,
      value: card.bathrooms,
      label: "حمام",
      show: showBathrooms,
    },
    {
      id: "yard",
      icon: <ParkSVG />,
      value: card.yard_type,
      label: "",
      show: showYard,
    },
    {
      id: "parking",
      icon: <CarSVG />,
      value: card.parking,
      label: "پارکینگ",
      show: showParking,
    },
    {
      id: "capacity",
      icon: <PersonSVG />,
      value: card.capacity,
      label: "نفر",
      show: showCapacity,
    },
  ];

  // Filter only visible features
  const visibleFeatures = featureItems.filter((item) => item.show);

  // Hooks
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`flex flex-col flex-wrap overflow-hidden justify-between border ${
        minWidth ? minWidth : "min-w-[391px]"
      } ${
        width ? width : "w-[calc(33.3%-20px)]"
      } p-4 rounded-[40px] gap-[13px] border-border`}
    >
      <div className="overflow-hidden w-full relative h-[221px] rounded-b-[16px] rounded-t-[24px] bg-black">
        <Slider
          className="w-[359px] h-[221px] overflow-hidden"
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop
        >
          {(card.photos && card.photos.length > 0
            ? card.photos
            : "../../../assets/images/auth/jangal.png"
          ).map((photo: string, idx: number) => (
            <SwiperSlide key={idx} className="w-full h-[221px] relative">
              <img
                className="object-cover w-full h-full"
                src={photo}
                alt={`${card.title} - تصویر ${idx + 1}`}
              />
            </SwiperSlide>
          ))}
        </Slider>
        {showOnMap && (
          <button
            onClick={() => {
              setCurrentLoc([card.location.lat, card.location.lng]);
            }}
            className="bg-[#586CFF] cursor-pointer absolute z-10 py-1 px-3 rounded-[100px] bottom-2 right-2"
          >
            <LocationSVG />
          </button>
        )}
      </div>
      <div className="flex gap-[9px] flex-wrap justify-end">
        <h1 className="font-[600] w-full text-right text-[20px] text-text ">
          {card.title}
        </h1>
        <div className="flex justify-end gap-[5px]">
          <div className="flex gap-1.5">
            <MapSVG color="gray" />
            <h1 className="text-right font-[500] text-[14px] text-text-secondary ">
              {card.address}
            </h1>
          </div>
        </div>
      </div>

      <div className="bg-border h-[1px]"></div>
      {showFacilities && (
        <>
          <div className="flex flex-row-reverse justify-between">
            {visibleFeatures.map((feature, index) => (
              <Fragment key={feature.id}>
                {index > 0 && <div className="bg-border w-[1px]" />}
                <div className="flex flex-row-reverse gap-[5px]">
                  {feature.icon}
                  <div className="flex flex-row-reverse gap-[3px]">
                    <h1 className="font-yekannum">{feature.value}</h1>
                    {feature.label && <h1>{feature.label}</h1>}
                  </div>
                </div>
              </Fragment>
            ))}
          </div>
        </>
      )}

      {!discount ? (
        <div dir="rtl" className="flex justify-between">
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

          <Favorite
            setIsOpen={setIsOpen}
            isOpen={isOpen}
            userId={decoded.id}
            id={card.id}
          />
        </div>
      ) : (
        <div dir="rtl" className="flex justify-between">
          <div className="flex flex-row-reverse gap-[10px]">
            <div className="relative opacity-[0.5]">
              <div className="flex flex-row-reverse gap-[5px] ">
                <h1 className="text-[20px] font-[700] my-auto font-yekannum">
                  {card.price}
                </h1>
                <p className="text-[12px] font-[700] my-auto text-text-secondary ">
                  تومان
                </p>
              </div>

              <div className="bg-[#FF5555] top-[17px] absolute w-[100%] h-[2px] rotate-[-9.3deg]"></div>
            </div>
            <p className="text-[16px] font-[700] my-auto">/</p>
            <div className="flex flex-row-reverse gap-[5px]">
              <h1 className="text-[20px] font-[700] my-auto font-yekannum">
                {(card.price * 50) / 100}
              </h1>
              <p className="text-[12px] font-[700] my-auto text-text-secondary ">
                تومان
              </p>
            </div>
            <div className="bg-[#FF5555] rounded-[100px] flex flex-row-reverse gap-[2px] px-[12px] py-[5px] ">
              <h1 className="text-white text-[16px] font-[700] font-yekannum">
                50
              </h1>
              <h1 className="text-white text-[16px] font-[700]">%</h1>
            </div>
          </div>
          <Favorite
            setIsOpen={setIsOpen}
            isOpen={isOpen}
            userId={decoded.id}
            id={card.id}
          />
        </div>
      )}
    </div>
  );
}
