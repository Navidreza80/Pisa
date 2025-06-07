"use client";

import ReserveDetail from "@/components/dashboard/buyer/reserveDetail";
import CanclePopover from "@/components/dashboard/svg/CanclePopover";
import CheckPopover from "@/components/dashboard/svg/CheckPopover";
import DeletePopover from "@/components/dashboard/svg/DeletePopover";
import DetailPopover from "@/components/dashboard/svg/DetailPopover";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Reservation } from "@/types/reserve";
import formatToPersianDateWithMoment from "@/utils/helper/format-date";
import { formatNumber } from "@/utils/helper/format-number";
import { getHouseById } from "@/utils/service/house/get-by-id";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

export default function ReserveTableContent({
  booking,
}: {
  booking: Reservation;
}) {
  const [title, setTitle] = useState("");

  const getHouseTitle = async () => {
    const res = await getHouseById(booking.houseId.toString());
    setTitle(res.title);
  };

  useEffect(() => {
    getHouseTitle();
  }, []);

  const t = useTranslations("BookingList");
  const [openPopoverId, setOpenPopoverId] = useState<number | null>(null);
  return (
    <tr key={booking.id} className="text-right border-b hover:bg-background/30">
      <td className="py-2 px-4 text-[18px] font-medium">{title || <ClipLoader color="#586cff" />}</td>
      <td className="py-2 px-4 text-[18px] font-medium">
        {formatToPersianDateWithMoment(booking.reservedDates[0].value)}
      </td>
      <td className="py-2 px-4 text-[18px] font-medium">
        {formatNumber(1500000)} ت
      </td>
      <td className="py-2 px-4 text-[18px] font-medium">
        {t("passengerCount", {
          count: booking.traveler_details.length,
        })}
      </td>
      <td className="py-2 px-4 text-[13px] font-medium">
        <span
          className={cn(
            "px-2 py-1 rounded-full text-white text-xs",
            booking.status === "approved" && "bg-lime-400",
            booking.status === "pending" && "bg-orange-400"
          )}
        >
          {booking.status == "pending" ? "در انتظار" : "تایید شده"}
        </span>
      </td>
      <td className="py-2 px-4 text-[13px] font-medium">
        <span
        //   className={cn(
        //     "px-2 py-1 rounded-full text-white text-xs",
        //     booking.paymentStatus === t("status.approved") &&
        //       "bg-lime-400",
        //     booking.paymentStatus === t("status.cancelled") &&
        //       "bg-rose-400"
        //   )}
        >
          تایید شده
        </span>
      </td>
      <td className="py-2 px-4 text-left">
        <Popover
          open={openPopoverId === booking.id}
          onOpenChange={(open) => setOpenPopoverId(open ? booking.id : null)}
        >
          <PopoverTrigger asChild>
            <div className="text-2xl font-bold cursor-pointer">...</div>
          </PopoverTrigger>
          <PopoverContent className="text-right w-32 p-2 bg-background px-1 border-border shadow-sm shadow-border">
            <div className="space-y-2">
              <div className="w-full flex justify-end gap-2 cursor-pointer hover:bg-border rounded px-1">
                <h1>{t("actions.approve")}</h1>
                <div className="my-auto">
                  <CheckPopover />
                </div>
              </div>
              <div className="w-full flex justify-end gap-2 cursor-pointer hover:bg-border rounded px-1">
                <h1>{t("actions.cancel")}</h1>
                <div className="my-auto">
                  <CanclePopover />
                </div>
              </div>
              <div className="w-full flex justify-end gap-2 cursor-pointer hover:bg-border rounded px-1">
                <ReserveDetail />
                <div className="my-auto">
                  <DetailPopover />
                </div>
              </div>
              <div className="w-full flex justify-end gap-2 cursor-pointer hover:bg-border text-red-600 rounded px-1">
                <h1>{t("actions.delete")}</h1>
                <div className="my-auto">
                  <DeletePopover />
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </td>
    </tr>
  );
}
