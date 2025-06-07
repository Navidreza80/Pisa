import formatToPersianDate from "@/utils/helper/format-date";
import { CalendarCheck } from "lucide-react";

export const ReservationDates = ({
  dateStart,
  dateEnd,
}: {
  dateStart: string | null;
  dateEnd: string | null;
}) => (
  <div className="flex flex-col justify-evenly">
    <h3 className="flex gap-1 flex-row-reverse text-fade text-sm md:text-base">
      <CalendarCheck className="w-4 md:w-5" /> : تاریخ ورود{" "}
      <span dir="rtl" className="text-primary">
        {formatToPersianDate(dateStart)}
      </span>
    </h3>
    <h3 className="flex gap-1 flex-row-reverse text-fade text-sm md:text-base mt-2 md:mt-0">
      <CalendarCheck className="w-4 md:w-5" /> : تاریخ خروج{" "}
      <span dir="rtl" className="text-primary">
        {formatToPersianDate(dateEnd)}
      </span>
    </h3>
  </div>
);
