import { HouseItemsInterface } from "@/types/house";
import HouseCardList from "@/components/common/house/HouseCardList";
import { getTranslations } from "next-intl/server";

export default async function RelatedHouse({
  relatedHouses,
}: {
  relatedHouses: HouseItemsInterface[];
}) {
  const t = await getTranslations("SingleHouse");

  return (
    relatedHouses?.length > 0 && (
      <>
        <div className="mt-[72px] w-full flex flex-col">
          <h1 className="text-[28px] text-text font-bold">
            {t("similarHouses")}
          </h1>
          <div></div>
        </div>
        <div
          
          className="flex gap-[30px] justify-center w-full md:justify-center lg:justify-start flex-wrap"
        >
          {relatedHouses.map((card: HouseItemsInterface, index: number) => (
            <HouseCardList
              key={index}
              showRooms
              showBathrooms
              showParking
              showCapacity
              card={card}
            />
          ))}
        </div>
      </>
    )
  );
}
