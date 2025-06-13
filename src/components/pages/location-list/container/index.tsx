"use client";

import Esfahan from "@/assets/images/landing/locations/esfahan.png";
import Shiraz from "@/assets/images/landing/locations/shiraz.png";
import Tehran from "@/assets/images/landing/locations/tehran.png";
import Container from "@/components/common/container";
import Reveal from "@/components/common/reveal";
import { useHouses } from "@/utils/hooks/use-houses";
import { getAllLocations } from "@/utils/service/location/get";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { LocationCardSkeleton } from "../skeletons/LocationCardSkeleton";

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
    <Container>
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
        <div className="flex gap-[24px] justify-center md:justify-center lg:justify-between flex-wrap w-full">
          {isPending &&
            Array(6)
              .fill(null)
              .map((_, index) => <LocationCardSkeleton key={index} />)}
          {locations?.data.map((card) => (
            <div
              key={card.id}
              className="bg-surface transition-transform duration-300 cursor-pointer border-[1px] border-border rounded-[40px] lg:min-w-[389px] md:min-w-[389px] min-w-[350px] w-[calc(33.3%-22px)]"
            >
              <div className="w-full h-[153px] rounded-t-[24px] rounded-b-[16px] overflow-hidden bg-gray-200">
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
                  className="object-cover w-full h-full transition-all duration-500 ease-in-out hover:scale-110 hover:opacity-80"
                  priority
                />
              </div>
              <div className="p-4 flex flex-row-reverse justify-between items-center text-center">
                <Reveal>
                  <span className="text-text-secondary" dir="rtl">
                    (
                    {card.area_name.includes("تهران")
                      ? tehranHouses
                      : card.area_name.includes("شیراز")
                        ? shirazHouses
                        : esfahanHouses}{" "}
                    مورد)
                  </span>
                </Reveal>

                <Link href={`locations/${card.id}`}>
                  <p className="text-lg hover:text-primary hover:underline text-[20px] font-[600] text-text ">
                    {card.area_name}
                  </p>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
