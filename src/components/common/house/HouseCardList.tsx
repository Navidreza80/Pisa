/* eslint-disable */

"use client";
// React & Next
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { Fragment, useEffect } from "react";

// Third party components
import Slider from "@/components/common/slider/Slider";

// Dependencies
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { SwiperSlide } from "swiper/react";

// SVGs
import BedSVG from "@/components/common/svg/bed";
import CarSVG from "@/components/common/svg/car";
import MapSVG from "@/components/common/svg/map";
import ParkSVG from "@/components/common/svg/park";
import LocationSVG from "../svg/location";
import PersonSVG from "../svg/person";
import NoImage from "@/assets/images/no.jpg";

// Types
import { TransitionLink } from "@/components/common/TransitionLink";
import { FeatureItem, TopSaleCardListProps } from "@/types/house";
import { formatNumber } from "@/utils/helper/format-number";
import { useAppSelector } from "@/utils/hooks/react-redux/store/hook";
import { setComparisonIds } from "@/utils/hooks/react-redux/store/slices/comparison";
import {
  Bath,
  CalendarRange,
  House,
  Layers3,
  Star,
  Tag,
  User,
} from "lucide-react";
import { useDispatch } from "react-redux";
import Reveal from "../reveal";
import Image from "next/image";

/**
 * Filter reservation houses component.
 *
 * @component
 * @returns {JSX.Element} - Rendered filter modal
 */

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
  isList,
}: TopSaleCardListProps) {
  // Hooks
  const t = useTranslations("HomePage");
  const Ids = useAppSelector((state) => state.comparisonIds);
  const router = useRouter();

  useEffect(() => {
    if (Ids.ids?.length == 2) router.push(`/comparison?ids=${Ids.ids}`);
  }, [Ids.ids]);

  // Redux
  const dispatch = useDispatch();

  // Feature items
  const featureItems: FeatureItem[] = [
    {
      id: "rooms",
      icon: <BedSVG />,
      value: card.rooms,
      label: t("rooms"),
      show: showRooms,
    },
    {
      id: "bathrooms",
      icon: <Bath />,
      value: card.bathrooms,
      label: t("bathrooms"),
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
      label: t("parking"),
      show: showParking,
    },
    {
      id: "capacity",
      icon: <PersonSVG />,
      value: card.capacity,
      label: t("capacity"),
      show: showCapacity,
    },
  ];

  // Filter only visible features
  const visibleFeatures = featureItems.filter((item) => item.show);

  return !isList ? (
    <Tilt
      transitionSpeed={2500}
      className={`flex flex-col group hover:shadow-lg flex-wrap overflow-hidden justify-between border ${
        minWidth ? minWidth : "lg:min-w-[391px] md:min-w-[391px] min-w-full"
      } ${
        width ? width : "lg:w-[calc(33.3%-20px)]"
      } p-4 rounded-[40px] gap-[13px] border-border`}
    >
      <motion.div
        className="overflow-hidden w-full relative h-[221px] rounded-b-[16px] rounded-t-[24px] bg-black"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Photo slider section */}
        <Slider
          className="w-[300px] md:w-[391px] lg:w-[391px] h-[221px] overflow-hidden"
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop
        >
          {(card.photos && card.photos.length > 0
            ? card.photos
            : "../../../assets/images/auth/jangal.png"
          ).map((photo: string, idx: number) => (
            <SwiperSlide key={idx} className="w-full h-[221px] relative">
              <Image
                fill
                unoptimized
                className="object-cover w-full h-full"
                src={
                  photo !== null && photo != "" && photo.startsWith("https")
                    ? photo
                    : NoImage.src
                }
                alt={`${card.title} - تصویر ${idx + 1}`}
              />
            </SwiperSlide>
          ))}
        </Slider>
        {/* Map icon section */}
        {showOnMap && (
          <button
            onClick={() => {
              setCurrentLoc([card.location.lat, card.location.lng]);
            }}
            className="group bg-[#586CFF] cursor-pointer z-10 py-1 px-3 rounded-[100px] bottom-9 right-2
    transition-all duration-300
    hover:bg-[#586CFF]/70 hover:backdrop-blur-md
    hover:shadow-lg hover:shadow-[#586CFF]/30
    hover:border hover:border-white/30 relative overflow-hidden"
          >
            <span className="absolute inset-0 bg-white/10 group-hover:bg-white/15 transition-all duration-300"></span>
            <LocationSVG color="white" className="relative z-10" />
          </button>
        )}
        {/* Compare section */}
        <button
          onClick={() => dispatch(setComparisonIds(String(card.id)))}
          className={`cursor-pointer absolute z-10 py-1 px-3 hover:scale-105 hover:animate-rotate-y transition-all duration-300 w-10 aspect-square rounded-full top-2 right-2 ${Ids.ids?.includes(String(card.id)) ? "bg-primary compareIconSelected" : "bg-white compareIcon"}`}
        ></button>
      </motion.div>
      <TransitionLink
        href={`/property-detail/${card.id}`}
        className="flex gap-[9px] flex-wrap justify-end"
      >
        {/* Title and rate section */}
        <div dir="ltr" className="flex justify-between items-center w-full">
          <span className="w-[80px] h-9 flex items-center justify-between px-2 py-1 gap-1.5 font-semibold bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:border-primary/30 hover:bg-primary/5 group">
            <Star className="w-5 h-5 text-yellow-400 group-hover:text-primary transition-colors duration-300 fill-yellow-400/30 group-hover:fill-primary/20" />
            <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-primary transition-colors duration-300">
              {card.rate}
              <span className="text-xs text-gray-400 dark:text-gray-500 ml-0.5">
                /5
              </span>
            </span>
          </span>
          <Reveal width="100%">
            <h1 className="font-semibold text-right group-hover:text-primary transition-all duration-300 w-full text-right text-[20px] text-text ">
              {card.title}
            </h1>
          </Reveal>
        </div>

        {/* Address section */}
        <div dir="rtl" className="flex w-full justify-start gap-[5px]">
          <div dir="rtl" className="flex gap-1.5">
            <MapSVG color="gray" />
            <Reveal>
              <h1 className="text-right font-[500] text-[14px] text-text-secondary ">
                {card.address}
              </h1>
            </Reveal>
          </div>
        </div>
      </TransitionLink>

      <div className="bg-border h-[1px]"></div>
      {/* House facilities section */}
      {showFacilities && (
        <>
          <div className="md:flex hidden flex-row-reverse justify-between max-w-full">
            {visibleFeatures.map((feature, index) => (
              <Fragment key={feature.id}>
                {index > 0 && <div className="bg-border w-[1px]" />}
                <div className="flex flex-row-reverse gap-[5px]">
                  {feature.icon}
                  <div className="flex flex-row-reverse gap-[3px]">
                    <h1 className="">{feature.value}</h1>
                    {feature.label && <h1>{feature.label}</h1>}
                  </div>
                </div>
              </Fragment>
            ))}
          </div>
        </>
      )}

      {/* Price section */}
      {!discount ? (
        <div dir="rtl" className="flex justify-between">
          <div className="flex gap-1" dir="rtl">
            <div className="flex flex-row-reverse gap-[10px]">
              <div className="relative">
                <div className="flex flex-row-reverse gap-[5px] ">
                  <h1 className="text-[20px] animate-rotate-y font-[yekan] font-[700] my-auto">
                    {formatNumber(Number(card.price))}
                  </h1>
                </div>
              </div>
            </div>
            <p className="text-[12px] font-[700] my-auto text-text-secondary ">
              تومان
            </p>
          </div>
        </div>
      ) : (
        // Price with discount section
        <div dir="rtl" className="flex justify-between">
          <div className="flex flex-row gap-[10px]">
            <div className="bg-[#FF5555] rounded-[100px] flex flex-row-reverse gap-[2px] px-[12px] py-[5px] ">
              <h1 className="text-white text-[16px] font-[700]">%</h1>
              <h1 className="text-white text-[16px] font-[700] ">50</h1>
            </div>
            <div className="relative opacity-[0.5]">
              <div className="flex flex-row-reverse gap-[5px] ">
                <p className="text-[12px] font-[700] my-auto text-text-secondary ">
                  {t("toman")}
                </p>
                <h1 className="text-[20px] font-[700] my-auto ">
                  {formatNumber(Number(card.price))}
                </h1>
              </div>

              <div className="bg-[#FF5555] top-[17px] absolute w-[100%] h-[2px] rotate-[-9.3deg]"></div>
            </div>

            <p className="text-[16px] font-[700] my-auto">/</p>
            <div className="flex flex-row-reverse gap-[5px]">
              <p className="text-[12px] font-[700] my-auto text-text-secondary ">
                {t("toman")}
              </p>
              <h1 className="text-[20px] font-[700] my-auto ">
                {formatNumber(Number(Number(card.price) * 50) / 100)}
              </h1>
            </div>
          </div>
        </div>
      )}
    </Tilt>
  ) : (
    <div
      className={`group hover:shadow-lg border transition-all duration-300 border-border rounded-[40px] p-4 gap-[13px] overflow-hidden flex-row w-full items-center flex`}
    >
      {/* Image Section */}
      <div className="w-[300px] h-[180px]">
        <Image
          unoptimized
          fill
          className="object-cover w-full h-full rounded-lg"
          src={card.photos?.[0] ?? "https://via.placeholder.com/300"}
          alt={card.title}
        />
      </div>

      {/* Content Section */}
      <div className="flex flex-1 flex-col pl-4">
        {/* Title & Address */}
        <h1 className="font-semibold text-[20px]">{card.title}</h1>
        <p className="text-sm text-text-secondary">{card.address}</p>

        {/* Facilities */}
        {showFacilities && (
          <div className="flex flex-wrap gap-4 mt-2">
            {featureItems.map((feature) => (
              <div key={feature.id} className="flex items-center gap-2">
                {feature.icon}
                <span>
                  {feature.value} {feature.label}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Extra Fields in List View */}
        <div className="mt-4 border-t border-border pt-2 flex gap-y-1.5 flex-col">
          <p className="text-text-secondary text-sm flex items-center gap-1.5">
            <CalendarRange /> آخرین به‌روزرسانی:{" "}
            {new Date(card.last_updated).toLocaleDateString()}
          </p>
          <p className="text-text-secondary text-sm flex items-center gap-1.5">
            <House /> نوع معامله:{" "}
            {card.transaction_type === "rental" ? "اجاره‌ای" : "فروش"}
          </p>
          <p className="text-text-secondary text-sm flex items-center gap-1.5">
            <Layers3 />
            دسته‌بندی: {card.categories?.name}
          </p>
          {card.tags?.length > 0 && (
            <p className="text-text-secondary text-sm flex items-center gap-1.5">
              <Tag />
              برچسب‌ها: {card.tags.join(", ")}
            </p>
          )}
          {card.sellerName && card.sellerName !== "Unknown" && (
            <p className="text-text-secondary text-sm flex items-center gap-1.5">
              <User />
              فروشنده: {card.sellerName}
            </p>
          )}
        </div>

        {/* Price & Rating */}
        <div className="mt-3 flex justify-between">
          <span className="text-lg font-bold">
            {formatNumber(Number(card.price))} تومان
          </span>
          <span className="flex gap-2">
            {card.rate}
            <Star />{" "}
          </span>
        </div>
      </div>
    </div>
  );
}
