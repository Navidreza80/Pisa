import { HouseItemsInterface } from "@/types/house";
import { Map, Star } from "lucide-react";
import { Skeleton } from "../../../ui/skeleton";
import { useTranslations } from "next-intl";

export const HotelInfoHeader = ({
  hotel,
  isLoading,
}: {
  hotel: HouseItemsInterface | null;
  isLoading: boolean;
}) => {
  const t = useTranslations("Overall");
  return (
    <div className="flex flex-col md:flex-row-reverse md:justify-between p-2 rounded-2xl gap-4 md:gap-0">
      <div className="flex gap-4 flex-row-reverse">
        <div className="bg-fade w-[120px] md:w-[156px] rounded-[20px] h-full md:h-[110px]" />
        <div className="flex flex-col justify-between gap-y-3">
          <span className="w-[82px] h-[28px] rounded-[8px] bg-primary flex items-center justify-center gap-1 text-[13px] text-white">
            <Star className="w-4 aspect-square text-white" />
            {isLoading ? (
              <Skeleton className="h-4 w-8 bg-primary/30" />
            ) : (
              <>{hotel?.rate} {t("star")}</>
            )}
          </span>
          <h1 className="font-semibold text-lg md:text-2xl">
            {isLoading ? (
              <Skeleton className="h-6 md:h-8 w-32 md:w-48 bg-fade/30" />
            ) : (
              hotel?.title
            )}
          </h1>
          <div className="flex gap-1 text-fade text-sm md:text-base">
            <Map className="text-fade" />
            <div className="w-full md:w-[319px] md:overflow-ellipsis md:overflow-hidden md:whitespace-nowrap whitespace-normal">
              {isLoading ? (
                <Skeleton className="h-4 md:h-5 w-40 md:w-64 bg-fade/30" />
              ) : (
                hotel?.address
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
