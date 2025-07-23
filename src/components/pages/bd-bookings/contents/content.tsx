/* eslint-disable */

"use client";

import TableDashboard from "@/components/common/dashboard/Table";
import Modal from "@/components/common/modal/modal";
import DeletePopover from "@/components/dashboard/svg/DeletePopover";
import DetailPopover from "@/components/dashboard/svg/DetailPopover";
import PaymentSVG from "@/components/dashboard/svg/PaymentSVG";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { HouseItemsInterface } from "@/types/house";
import { Reservation } from "@/types/reserve";
import formatToPersianDateWithMoment from "@/utils/helper/format-date";
import { formatNumber } from "@/utils/helper/format-number";
import { getHouseById } from "@/utils/service/house/get-by-id";
import { deleteReservation } from "@/utils/service/reserve/delete";
import { Users, X } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import ReserveDetail from "./reserveDetail";
import { cancelBooking } from "@/utils/service/reserve/cancel";
import { continueBooking } from "@/utils/service/reserve/continue";

export default function ReserveTableContent({
  booking,
}: {
  booking: Reservation;
}) {
  const t = useTranslations("BookingList");
  const tableHeaderItems = [
    { text: t("name"), clx: "rounded-r-xl" },
    { text: t("nationalCode"), clx: null },
    { text: t("gender"), clx: null },
    { text: t("birthDate"), clx: "rounded-l-xl" },
  ];
  const router = useRouter();
  const handleDelete = async (id: string) => {
    await deleteReservation(id);
    router.refresh();
  };
  const handleCancel = async (id: string) => {
    await cancelBooking(id);
    router.refresh();
  };
  const handleContinue = async (id: string) => {
    await continueBooking(id);
    router.refresh();
  };
  const deleteBooking = async (id: string) => {
    try {
      toast.promise(() => handleDelete(id), {
        success: t("success"),
        pending: t("pending"),
      });
    } catch (err) {
      console.log(err);
    }
  };
  const cancelReserve = async (id: string) => {
    try {
      toast.promise(() => handleCancel(id), {
        success: "رزرو با موفقیت لغو شد",
        pending: "درحال لغو رزرو...",
      });
    } catch (err) {
      console.log(err);
    }
  };
  const continueReserve = async (id: string) => {
    try {
      toast.promise(() => handleContinue(id), {
        success: "رزرو با موفقیت بازیابی شد",
        pending: "درحال بازیابی رزرو...",
      });
    } catch (err) {
      console.log(err);
    }
  };
  const [detailModal, setDetailModal] = useState<boolean>(false);

  const [openPopoverId, setOpenPopoverId] = useState<number | null>(null);
  return (
    <tr key={booking.id} className=" border-b hover:bg-background/30">
      <td className="py-2 px-4 text-[18px] font-medium">
        {booking.house.title}
      </td>
      <td className="py-2 px-4 text-[18px] font-medium">
        {booking.reservedDates.length > 0 &&
          formatToPersianDateWithMoment(booking.reservedDates[0].value)}
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
            booking.status === "confirmed" && "bg-lime-400",
            booking.status === "pending" && "bg-orange-400",
            booking.status === "canceled" && "bg-red-400"
          )}
        >
          {booking.status == "pending"
            ? t("pendingStatus")
            : booking.status == "confirmed"
              ? t("submit")
              : "لغو شده"}
        </span>
      </td>
      <td className="py-2 px-4 text-[13px] font-medium">
        <span>{t("submit")}</span>
      </td>
      <td className="py-2 px-4 ">
        <Popover
          open={openPopoverId === booking.id}
          onOpenChange={(open) => setOpenPopoverId(open ? booking.id : null)}
        >
          <PopoverTrigger asChild>
            <div className="text-2xl font-bold cursor-pointer">...</div>
          </PopoverTrigger>
          <PopoverContent className=" w-32 p-2 bg-background px-1 border-border shadow-sm shadow-border">
            <div className="space-y-2">
              <div
                onClick={() => setDetailModal((prev: boolean) => !prev)}
                className="w-full flex justify-end gap-2 cursor-pointer hover:bg-border rounded px-1"
              >
                <ReserveDetail
                  isOpen={detailModal}
                  toggleModal={() => setDetailModal((prev: boolean) => !prev)}
                  houseId={booking.houseId}
                />
                <div className="my-auto">
                  <DetailPopover />
                </div>
              </div>
              <Link
                className="w-full flex justify-end gap-2 cursor-pointer hover:bg-border rounded px-1"
                href={`/payment/${booking.houseId.toString()}`}
              >
                <h1>{t("actions.payment")}</h1>
                <div className="my-auto">
                  <PaymentSVG />
                </div>
              </Link>
              <div
                onClick={() => deleteBooking(booking.id.toString())}
                className="w-full flex justify-end gap-2 cursor-pointer hover:bg-border text-red-600 rounded px-1"
              >
                <h1>{t("actions.delete")}</h1>
                <div className="my-auto">
                  <DeletePopover />
                </div>
              </div>
              {booking.status == "pending" && (
                <div
                  onClick={() => cancelReserve(booking.id.toString())}
                  className="w-full flex justify-end gap-2 cursor-pointer hover:bg-border text-red-600 rounded px-1"
                >
                  <h1>لغو رزرو</h1>
                  <div className="my-auto">
                    <X />
                  </div>
                </div>
              )}
              {booking.status == "canceled" && (
                <div
                  onClick={() => continueReserve(booking.id.toString())}
                  className="w-full flex justify-end gap-2 cursor-pointer hover:bg-border text-red-600 rounded px-1"
                >
                  <h1>بازیابی رزرو</h1>
                  <div className="my-auto">
                    <X />
                  </div>
                </div>
              )}
              <div className="w-full flex justify-end gap-2 cursor-pointer hover:bg-border rounded px-1">
                <Modal
                  title={t("travelerInformation")}
                  trigger={<h1 className="cursor-pointer">{t("travelers")}</h1>}
                >
                  <TableDashboard
                    tableHeader={tableHeaderItems}
                    tableContent={booking.traveler_details.map(
                      (traveler, index) => (
                        <tr key={index}>
                          <td className="py-2 px-4 text-[18px] font-medium">
                            {traveler.firstName}
                          </td>
                          <td className="py-2 px-4 text-[18px] font-medium">
                            {traveler.nationalId}
                          </td>
                          <td className="py-2 px-4 text-[18px] font-medium">
                            {traveler.gender}
                          </td>
                          <td className="py-2 px-4 text-[18px] font-medium">
                            {traveler.birthDate}
                          </td>
                        </tr>
                      )
                    )}
                  />
                </Modal>
                <div className="my-auto">
                  <Users />
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </td>
    </tr>
  );
}
