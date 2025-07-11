import Esfahan from "@/assets/images/landing/locations/esfahan.png";
import Shiraz from "@/assets/images/landing/locations/shiraz.png";
import Tehran from "@/assets/images/landing/locations/tehran.png";
import Reveal from "@/components/common/reveal";
import { getAllLocations } from "@/utils/service/location/get";
import { getTranslations } from "next-intl/server";
import LocationName from "../content/LocationName";
import Image from "next/image";
import { Location } from "@/types/house";

interface IProps {
  tehranHouses: number;
  shirazHouses: number;
  esfahanHouses: number;
}

const PopularLocations: React.FC<IProps> = async ({
  tehranHouses,
  shirazHouses,
  esfahanHouses,
}) => {
  const t = await getTranslations("HomePage");
  const locations = await getAllLocations({ page: 1, limit: 3 });

  return (
    <div className="flex flex-wrap">
      <Reveal>
        <div className=" text-[28px] mb-[32px] font-[700]">
          {t.rich("rentTitle", {
            br: () => <br />,
          })}
        </div>
      </Reveal>
      <div className="flex gap-[24px] justify-center md:justify-center lg:justify-between flex-wrap w-full">
        {locations.data.map((card: Location) => (
          <div
            key={card.id}
            className=" flex-1 bg-surface transition-transform duration-300 cursor-pointer border-[1px] border-border  p-[12px] rounded-[40px] lg:min-w-[389px] md:min-w-[389px] min-w-full w-[calc(33.3%-22px)]"
          >
            <div className="w-full h-[153px] rounded-t-[24px] rounded-b-[16px] overflow-hidden bg-black">
              <Image
                src={
                  card.id == 1
                    ? Tehran.src
                    : card.id == 2
                      ? Esfahan.src
                      : Shiraz.src
                }
                alt={card.area_name}
                width={500}
                height={500}
                className="object-cover w-full h-full transition-all duration-500 ease-in-out hover:scale-110 hover:opacity-60"
              />
            </div>

            <div className="p-4 flex flex-row-reverse justify-between items-center text-center">
              <Reveal>
                <span className="text-text-secondary " dir="rtl">
                  (
                  {card.area_name.includes("تهران")
                    ? tehranHouses
                    : card.area_name.includes("شیراز")
                      ? shirazHouses
                      : esfahanHouses}{" "}
                  مورد)
                </span>
              </Reveal>

              <LocationName area_name={card.area_name} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularLocations;
