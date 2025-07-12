import formatToPersianDate from "@/utils/helper/format-date";
import { CalendarCheck } from "lucide-react";
import { useTranslations } from "next-intl";

export const ReservationDates = ({
  dateStart,
  dateEnd,
}: {
  dateStart: string | null;
  dateEnd: string | null;
}) => {
  const t = useTranslations("ReserveDetail");
  return (
    <div className="flex flex-col justify-evenly">
      <h3 className="flex gap-1 flex-row-reverse text-fade text-sm md:text-base">
        <CalendarCheck className="w-4 md:w-5" /> {t("dateStart")}
        <span className="text-primary">{formatToPersianDate(dateStart)}</span>
      </h3>
      <h3 className="flex gap-1 flex-row-reverse text-fade text-sm md:text-base mt-2 md:mt-0">
        <CalendarCheck className="w-4 md:w-5" /> {t("dateExit")}
        <span className="text-primary">{formatToPersianDate(dateEnd)}</span>
      </h3>
    </div>
  );
};
