/* eslint-disable */

import CloseBtn from "@/components/common/dashboard/CloseBtn";
import Line from "@/components/common/dashboard/line";
import BathroomSVG from "@/components/common/svg/bathroom";
import BedSVG from "@/components/common/svg/bed";
import CarSVG from "@/components/common/svg/car";
import Share from "@/components/common/svg/share";
import Star from "@/components/common/svg/star";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { HouseItemsInterface } from "@/types/house";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import NoImage from "@/assets/images/no.jpg";
import { getHouseById } from "@/utils/service/house/get-by-id";

const ReserveDetail = ({
  trigger,
  houseId,
}: {
  trigger: React.ReactNode;
  houseId: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [house, setHouse] = useState<HouseItemsInterface | undefined>();
  const getHouse = async () => {
    const res = await getHouseById(houseId.toString());
    setHouse(res);
  };

  useEffect(() => {
    getHouse();
  }, []);
  const t = useTranslations("ReserveDetail");

  return (
    <Dialog open={isOpen}>
      <DialogTrigger asChild>
        <div onClick={() => setIsOpen(true)}>{trigger}</div>
      </DialogTrigger>

      <DialogContent className="!p-0 w-full max-w-[95vw] sm:max-w-[720px] md:max-w-[900px] lg:max-w-[918px] h-[80vh] overflow-y-scroll">
        <DialogHeader className="!p-0">
          <DialogTitle></DialogTitle>
        </DialogHeader>

        <div className="w-full bg-background rounded-xl pb-5">
          {/* Header */}
          <header className="px-4 sm:px-[19px] pt-6 flex justify-between items-center">
            <h1 className="text-text text-xl sm:text-2xl lg:text-[32px] font-extrabold">
              {house?.title}
            </h1>
            <CloseBtn onClick={() => setIsOpen((prev) => !prev)} />
          </header>

          <Line />

          {/* Body */}
          <div className="flex flex-col md:flex-row justify-between gap-5 px-4 sm:px-[19px] py-5 font-medium text-[15px] text-text-secondary leading-7">
            {/* Left column (image, address, icons) */}
            <div className="flex flex-col gap-5 md:w-1/2">
              <div className="w-full h-[225px] sm:h-[325px] bg-gray-200 rounded-lg relative">
                {house?.photos && (
                  <Image
                    src={house?.photos !== null ? house.photos[0] : NoImage}
                    unoptimized
                    alt="houseImage"
                    width={500}
                    height={500}
                    className="absolute inset-0 w-full h-full object-cover rounded-lg"
                  />
                )}
                <span className="absolute top-3 right-3 h-8 sm:h-10 px-3 bg-primary rounded-[10px] text-white flex gap-1.5 items-center text-sm sm:text-base">
                  <Star />
                  {t("starRating", { stars: house?.rate })}
                </span>
                <span className="absolute top-3 left-3 w-8 aspect-square sm:w-10 justify-center bg-primary rounded-[10px] text-white flex items-center">
                  <Share />
                </span>
              </div>

              <div className="text-sm sm:text-base whitespace-nowrap overflow-hidden text-ellipsis">
                <p className="text-fade inline-block">{t("address")}: </p>
                {house?.address}
              </div>

              <div className="flex flex-wrap gap-3 items-center text-sm sm:text-base">
                <span className="flex gap-2.5 text-text-secondary items-center">
                  <BedSVG /> {t("bedrooms", { count: house?.rooms })}
                </span>
                <p className="h-4 border-r border-border" />
                <span className="flex gap-2.5 text-text-secondary items-center">
                  <CarSVG /> {t("parking", { count: house?.parking })}
                </span>
                <p className="h-4 border-r border-border" />
                <span className="flex gap-2.5 text-text-secondary items-center">
                  <BathroomSVG /> {t("bathrooms", { count: house?.bathrooms })}
                </span>
              </div>
            </div>

            {/* Right column (caption and tags) */}
            <div className="flex flex-col gap-4 md:w-1/2">
              <p className="text-sm sm:text-base leading-6">
                {house?.caption || t("withoutDesc")}
              </p>
              <div className="flex flex-wrap gap-2 mt-2 items-center">
                <span className="text-fade font-medium">{t("tags")}:</span>
                {house?.tags?.length > 0 ? (
                  house.tags.map((item, index) => (
                    <span
                      className="rounded-xl border border-primary px-4 py-1 text-sm"
                      key={index}
                    >
                      {item}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-400 text-sm">بدون برچسب</span>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="flex flex-col sm:flex-row gap-4 justify-between px-4 sm:px-[19px] mt-3">
            <div className="bg-[#D9D9D9] w-full sm:w-[410px] h-[44px] rounded-xl px-5 flex items-center justify-between text-sm sm:text-base">
              <p className="text-[#555555]">{t("purchasePrice")}:</p>
              <p className="text-[#555555]">
                {house?.price} {t("currency")}
              </p>
            </div>

            <div className="flex justify-end">
              <button className="w-full sm:w-auto px-5 py-3 rounded-xl bg-primary text-white text-sm sm:text-base">
                {t("payments")}
              </button>
            </div>
          </footer>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default ReserveDetail;
