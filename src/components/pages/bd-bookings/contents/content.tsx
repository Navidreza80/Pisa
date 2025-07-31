"use client";

import ModalStep2 from "@/components/common/dashboard/modalStep2";
import TableDashboard from "@/components/common/dashboard/Table";
import Modal from "@/components/common/modal/modal";
import CancelSVG from "@/components/common/svg/CancelSVG";
import ConfirmSVG from "@/components/common/svg/ConfirmSVG";
import DeletePopover from "@/components/dashboard/svg/DeletePopover";
import DetailSVG from "@/components/dashboard/svg/DetailPopover";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Reservation } from "@/types/reserve";
import formatToPersianDateWithMoment from "@/utils/helper/format-date";
import { formatNumber } from "@/utils/helper/format-number";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import useCancelBooking from "../../sd-booking-management/content/hooks/useCancelBooking";
import useContinueBooking from "../../sd-booking-management/content/hooks/useContinueBooking";
import useDeleteBooking from "../../sd-booking-management/content/hooks/useDeleteBooking";
import Status from "../../sd-booking-management/content/Status";
import PopoverItem from "../../sd-property-management/content/PopoverItem";
import ReserveDetail from "./reserveDetail";

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
  const { handleDelete } = useDeleteBooking(() => router.refresh());
  const { handleCancel } = useCancelBooking(() => router.refresh());
  const { handleContinue } = useContinueBooking(() => router.refresh());

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
        <Status status={booking.status} />
      </td>
      <td className="py-2 px-4 text-[13px] font-medium">
        <Status status={"canceled"} />
      </td>
      <td className="py-2 px-4 ">
        <Popover>
          <PopoverTrigger asChild>
            <div className="text-2xl font-bold cursor-pointer">...</div>
          </PopoverTrigger>
          <PopoverContent className=" w-32 p-2 bg-background px-1 border-border shadow-sm shadow-border">
            <div className="space-y-2">
              <ReserveDetail
                trigger={<PopoverItem icon={<DetailSVG />} title={"جزییات"} />}
                houseId={booking.houseId}
              />
              <PopoverItem
                icon={<ConfirmSVG />}
                title={t("actions.payment")}
                handleClick={() =>
                  router.push(
                    `/payment/${booking.houseId.toString()}?bookingId=${booking.id.toString()}`
                  )
                }
              />
              <ModalStep2
                title="آیا از حذف این رزرو مطمعنید؟"
                desc="امکان بازگشت پس از حذف وجود ندارد!"
                button="حذف رزرو"
                trigger={
                  <PopoverItem
                    icon={<DeletePopover />}
                    title={t("actions.delete")}
                  />
                }
                onConfirm={() => handleDelete(booking.id.toString())}
              />
              {booking.status == "pending" && (
                <PopoverItem
                  title="لغو رزرو"
                  icon={<CancelSVG />}
                  handleClick={() => handleCancel(booking.id.toString())}
                />
              )}
              {booking.status == "canceled" && (
                <PopoverItem
                  title="بازیابی رزرو"
                  icon={<ConfirmSVG />}
                  handleClick={() => handleContinue(booking.id.toString())}
                />
              )}
              <Modal
                title={t("travelerInformation")}
                trigger={
                  <PopoverItem icon={<ConfirmSVG />} title={t("travelers")} />
                }
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
            </div>
          </PopoverContent>
        </Popover>
      </td>
    </tr>
  );
}
