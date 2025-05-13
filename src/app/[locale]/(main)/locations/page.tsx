import Esfahan from "@/assets/images/landing/locations/esfahan.png";
import Shiraz from "@/assets/images/landing/locations/shiraz.png";
import Tehran from "@/assets/images/landing/locations/tehran.png";
import Reveal from "@/components/common/reveal";
import { HouseItemsInterface } from "@/types/house";
import { fetchHouses } from "@/utils/service/house/get";
import { getAllLocations } from "@/utils/service/location/get";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";

async function LocationsPage() {
  const t = await getTranslations("Location");
  const data: HouseItemsInterface[] = await fetchHouses({
    transactionType: "",
  });
  const locations = await getAllLocations();
  const tehranHouses = data.filter((e) => e.address?.includes("تهران")).length;
  const shirazHouses = data.filter((e) => e.address?.includes("شیراز")).length;
  const esfahanHouses = data.filter((e) =>
    e.address?.includes("اصفهان")
  ).length;
  return (
    <div dir="rtl" className="px-20 pt-10">
      <div>
        <Reveal>
          <div className="text-right text-text text-[36px] font-[700]">
            {t("LocationPageTitle")}
          </div>
        </Reveal>
        <div className="h-[48px] w-[396px] my-8  relative">
          <input
            type="text"
            placeholder={t("search")}
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
      <div className="flex flex-wrap gap-6 justify-center p-4">
        {locations.map((card) => (
          <div
            key={card.id}
            className="flex-1 bg-surface transition-transform duration-300 cursor-pointer border-[1px] border-border p-[12px] rounded-[40px] lg:min-w-[389px] md:min-w-[389px] min-w-[350px] w-[calc(33.3%-22px)] hover:shadow-lg"
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
  );
}

export default LocationsPage;
