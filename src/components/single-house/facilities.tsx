import { getTranslations } from "next-intl/server";
import SectionName from "./section-name";

export default async function Facilities({
  isHotel,
  capacity,
  propertyType,
  bathrooms,
  parking,
  rooms,
  yard_type,
}: {
  isHotel: boolean;
  capacity: number;
  propertyType: string;
  bathrooms: number;
  parking: number;
  rooms: number;
  yard_type: string;
}) {
  const t = await getTranslations("SingleHouse");
  const facilittiesItems = [
    { value: capacity, text: t("capacityCount"), suffix: t("capacityValue") },
    { value: propertyType, text: t("propertyType"), suffix: "" },
    { value: bathrooms, text: t("bathrooms"), suffix: t("bathroomsValue") },
    { value: parking, text: t("parkings"), suffix: t("parkingsValue") },
    { value: rooms, text: t("rooms"), suffix: t("roomsValue") },
    { value: yard_type, text: t("yard"), suffix: "" },
  ];
  return (
    <div className={`${isHotel ? "mt-10" : "mt-1.5"} flex flex-col gap-4`}>
      <SectionName sectionName={t("facilities")} />
      <div className="w-full flex flex-wrap gap-3">
        {facilittiesItems.map((item, index) => {
          return (
            <span
              key={index}
              className="border-border animate-flip-up rounded-full px-4 py-3 border text-text-secondary flex justify-start gap-3 "
            >
              {item.text}
              <p className=" text-text">
                {item.value + " " + item.suffix}{" "}
              </p>
            </span>
          );
        })}
      </div>
    </div>
  );
}
