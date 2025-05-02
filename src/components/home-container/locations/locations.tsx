import { getTranslations } from "next-intl/server";
import Tehran from "@/assets/images/landing/locations/tehran.png";
import Shiraz from "@/assets/images/landing/locations/shiraz.png";
import Esfahan from "@/assets/images/landing/locations/esfahan.png";
import { getAllLocations } from "@/utils/service/location/location";
import LocationName from "./location-name";

export default async function Popular() {
  const t = await getTranslations("HomePage");
  const locations = await getAllLocations();
  return (
    <div>
      <div className="text-right text-[28px] font-[700]">
        {t.rich("rentTitle", {
          br: () => <br />,
        })}
      </div>
      <div className="container mx-auto p-4">
        <div className="flex flex-wrap justify-center md:justify-center lg:justify-between gap-[22px] mb-6">
          {(
            locations as Array<{ id: number; name: string; area_name: string }>
          ).map((card) => (
            <div
              key={card.id}
              className=" flex-1 bg-surface transition-transform duration-300 cursor-pointer border-[1px] border-border  p-[12px] rounded-[20px] min-w-[389px] w-[calc(33.3%-22px)]"
            >
              <div className="w-full h-[153px] rounded-[20px] overflow-hidden bg-black">
                <img
                  src={
                    card.id == 1
                      ? Tehran.src
                      : card.id == 2
                      ? Esfahan.src
                      : Shiraz.src
                  }
                  alt={card.name}
                  className="object-cover w-full h-full transition-all duration-500 ease-in-out hover:scale-110 hover:opacity-60"
                />
              </div>

              <div className="p-4 flex flex-row-reverse justify-between text-center">
                <LocationName area_name={card.area_name} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
