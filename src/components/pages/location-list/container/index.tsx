"use client";

import Esfahan from "@/assets/images/landing/locations/esfahan.png";
import Shiraz from "@/assets/images/landing/locations/shiraz.png";
import Tehran from "@/assets/images/landing/locations/tehran.png";
import Reveal from "@/components/common/reveal";
import { useHouses } from "@/utils/hooks/use-houses";
import { getAllLocations } from "@/utils/service/location/get";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { LocationCardSkeleton } from "../skeletons/LocationCardSkeleton";
import { HeartIcon } from "lucide-react";

/**
 * locations page - Displaying all locations.
 *
 * @page
 * @route /locations
 *
 * Features:
 * - Displaying all locations
 *
 */

export default function LocationsListContainer() {
  // Hooks
  const t = useTranslations("Location");
  const { data } = useHouses();
  const { data: locations, isPending } = useQuery({
    queryKey: ["LOCATIONS"],
    queryFn: getAllLocations,
  });

  // Get the number of houses that are in every location
  const tehranHouses = data?.filter((e) => e.address?.includes("تهران")).length;
  const shirazHouses = data?.filter((e) => e.address?.includes("شیراز")).length;
  const esfahanHouses = data?.filter((e) =>
    e.address?.includes("اصفهان")
  ).length;

  return (
    <div dir="rtl" className="flex flex-col flex-wrap w-[85.5%] pt-6">
      <div className="py-6">
        {/* Page title */}
        <Reveal>
          <div className="text-right text-[36px] font-[700]">
            {t("LocationPageTitle")}
          </div>
        </Reveal>
      </div>
      {/* All locations */}
      <div className="flex gap-[24px] justify-center md:justify-center lg:justify-start flex-wrap w-full">
        {isPending &&
          Array(6)
            .fill(null)
            .map((_, index) => <LocationCardSkeleton key={index} />)}
        {locations?.data.map((card) => (
          <div
            key={card.id}
            className="group bg-surface transition-all duration-300 cursor-pointer border border-border rounded-3xl lg:min-w-[389px] md:min-w-[389px] min-w-[350px] w-[calc(33.3%-16px)] hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 overflow-hidden"
          >
            <div className="relative w-full h-[153px] rounded-t-3xl rounded-b-[16px] overflow-hidden bg-gray-200">
              <Image
                src={
                  card.id == 1
                    ? Tehran.src
                    : card.id == 2
                      ? Esfahan.src
                      : Shiraz.src
                }
                alt={card.area_name}
                width={389}
                height={153}
                className="object-cover w-full h-full transition-all duration-500 ease-in-out group-hover:scale-110"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-row-reverse justify-between items-center">
              <Reveal>
                <span
                  className="text-text-secondary dark:text-gray-400 text-sm"
                  dir="rtl"
                >
                  (
                  {card.area_name.includes("تهران")
                    ? tehranHouses
                    : card.area_name.includes("شیراز")
                      ? shirazHouses
                      : esfahanHouses}{" "}
                  مورد)
                </span>
              </Reveal>

              <Link
                href={`locations/${card.id}`}
                className="relative overflow-hidden"
              >
                <p className="text-lg text-text dark:text-white font-semibold transition-all duration-300 group-hover:text-primary group-hover:translate-x-0">
                  {card.area_name}
                </p>
                {/* Underline animation */}
                <span className="absolute bottom-0 right-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
