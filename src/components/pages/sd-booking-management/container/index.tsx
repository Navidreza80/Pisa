"use client";

import ContainerDashboard from "@/components/common/dashboard/ContainerDashboard";
import Line from "@/components/common/dashboard/line";
import TableDashboard from "@/components/common/dashboard/Table";
import Title from "@/components/common/dashboard/Title";
import CanclePopover from "@/components/dashboard/svg/CanclePopover";
import CheckPopover from "@/components/dashboard/svg/CheckPopover";
import DeletePopover from "@/components/dashboard/svg/DeletePopover";
import DetailPopover from "@/components/dashboard/svg/DetailPopover";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Reservation } from "@/types/reserve";
import formatToPersianDate from "@/utils/helper/format-date";
import { formatNumber } from "@/utils/helper/format-number";
import { GetSellerBooking } from "@/utils/service/reserve/GetSellerBookings";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import PopoverItem from "../../sd-property-management/content/PopoverItem";
import useCancelBooking from "../content/hooks/useCancelBooking";
import useConfirmBooking from "../content/hooks/useConfirmBooking";
import useContinueBooking from "../content/hooks/useContinueBooking";
import useDeleteBooking from "../content/hooks/useDeleteBooking";
import Status from "../content/Status";
import ModalStep2 from "@/components/common/dashboard/modalStep2";
import { MdRestore } from "react-icons/md";
import { InfoRow } from "../content/InFrow";

const tableHeaderItems = [
  { text: "propertyName", clx: "rounded-r-xl" },
  { text: "travelerInfo", clx: null },
  { text: "bookingDate", clx: null },
  { text: "amount", clx: null },
  { text: "bookingStatus", clx: null },
  { text: "paymentStatus", clx: null },
  { text: "empty", clx: "rounded-l-xl" },
];

export default function SellerReservationManagement({
  isFilter = true,
  endItem,
  limit = "5",
}: {
  isFilter?: boolean;
  endItem?: React.ReactNode;
  limit?: string;
}) {
  const router = useRouter();
  const t = useTranslations("BookingListSeller");

  const searchParams = useSearchParams();
  // const search = searchParams.get("search");
  const page = searchParams.get("page");
  const handleSetParam = (key: string, value: string | number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value.toString());
    router.push(`?${params.toString()}`);
  };
  const [openPopoverId, setOpenPopoverId] = useState<number | null>(null);
  const { data, refetch } = useQuery({
    queryKey: ["SELLERS_BOOKINGS"],
    queryFn: () => GetSellerBooking({ params: { limit } }),
  });
  const { handleDelete } = useDeleteBooking({ refetch });
  const { handleCancel } = useCancelBooking({ refetch });
  const { handleContinue } = useContinueBooking({ refetch });
  const { handleConfirm } = useConfirmBooking({ refetch });

  return (
    <ContainerDashboard>
      <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-0">
        <Title text={t("pageTitle")} />
        {/* {isFilter ? (
          <div className="flex gap-[19px] flex-wrap justify-between">
            <Input
              defaultValue={search || ""}
              onChange={(e) => {
                setTimeout(() => {
                  handleSetParam("search", e.target.value);
                }, 1000);
              }}
              placeholder={t("searchPlaceholder")}
              className="h-12 placeholder:text-text-secondary placeholder:text-[16px] border-border border-[2px] px-5 rounded-2xl flex-1 md:w-100"
            />
            <FilterModal>
              <div>Hello</div>
            </FilterModal>
          </div>
        ) : (
          endItem
        )} */}
      </div>
      <Line />

      {/* Table view for desktop */}
      <div className="hidden md:block">
        <TableDashboard
          currentPage={Number(page) || 1}
          totalCount={data?.totalCount}
          pageSize={5}
          onPageChange={(page) => handleSetParam("page", page.toString())}
          headerSecondary={true}
          tableHeader={tableHeaderItems.map((item) => ({
            ...item,
            text: t(`tableHeaders.${item.text}`),
          }))}
          tableContent={data?.bookings.map((booking: Reservation) => (
            <tr
              key={booking.id}
              className="font-yekan font-semibold border-b hover:bg-table-header/50 cursor-pointer"
            >
              <td className="py-2 px-4 text-[18px] font-medium rounded-r-xl">
                نام ملک
              </td>
              <td className="py-2 px-4 text-[18px] font-medium">
                {booking.traveler_details[0].firstName}
              </td>
              <td className="py-2 px-4 text-[18px] font-medium">
                {formatToPersianDate(booking.reservedDates[0].value)}
              </td>
              <td className="py-2 px-4 text-[18px] font-medium">
                {formatNumber(1200000)}
              </td>
              <td className="py-2 px-4 w-auto">
                <Status status={booking.status} />
              </td>
              <td className="py-2 px-4">
                <span
                  className={"px-2 py-1 rounded-full text-[13px] font-medium"}
                >
                  پرداخت نشده
                </span>
              </td>
              <td className="py-2 px-4  rounded-l-xl">
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="text-xl font-bold cursor-pointer">
                      ...
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="p-2 bg-background px-1 border-border shadow-sm shadow-border rounded-[15px] !w-auto">
                    <div className="flex flex-col">
                      {booking.status == "pending" && (
                        <PopoverItem
                          handleClick={() => handleConfirm(booking.id)}
                          icon={<CheckPopover />}
                          title={t("actions.approve")}
                        />
                      )}
                      {booking.status == "pending" && (
                        <PopoverItem
                          handleClick={() => handleCancel(booking.id)}
                          icon={<CanclePopover />}
                          title={t("actions.cancel")}
                        />
                      )}
                      {booking.status == "canceled" && (
                        <PopoverItem
                          handleClick={() => handleContinue(booking.id)}
                          icon={<MdRestore />}
                          title={"بازیابی"}
                        />
                      )}
                      <PopoverItem
                        icon={<DetailPopover />}
                        title={t("actions.details")}
                      />

                      <ModalStep2
                        button="حذف رزرو"
                        desc="امکان بازگشت پس از حذف وجود ندارد!"
                        onConfirm={() => handleDelete(booking.id)}
                        title="آیا از حذف کردن این رزرو مطمعنید؟"
                        trigger={
                          <PopoverItem
                            icon={<DeletePopover />}
                            title={t("actions.delete")}
                          />
                        }
                      />
                    </div>
                  </PopoverContent>
                </Popover>
              </td>
            </tr>
          ))}
        />
      </div>

      {/* Card view for mobile */}
      <div className="md:hidden grid grid-cols-1 gap-4 mt-4">
        {data?.bookings.map((booking: Reservation) => (
          <Card
            key={booking.id}
            className="overflow-hidden shadow-none border border-border rounded-2xl"
          >
            <CardContent className="p-4 space-y-4">
              {/* Header */}
              <div className="flex flex-col">
                <h2 className="text-lg font-bold mb-1">
                  {booking.propertyName || "نام خانه"}
                </h2>
                <p className="text-sm text-gray-500">
                  {t("tableHeaders.travelerInfo")}:{" "}
                  {booking.traveler_details?.[0]?.firstName || "-"}
                </p>
              </div>

              {/* Contact Info */}
              <div className="space-y-1">
                {booking.sharedMobile && (
                  <p className="text-sm">
                    شماره موبایل: {booking.sharedMobile}
                  </p>
                )}
                {booking.sharedEmail && (
                  <p className="text-sm">
                    ایمیل: {booking.sharedEmail}
                  </p>
                )}
              </div>

              {/* Booking Info Grid */}
              <div className="grid grid-cols-1 gap-3">
                <InfoRow
                  label={t("tableHeaders.bookingDate")}
                  value={formatToPersianDate(booking.reservedDates?.[0]?.value)}
                />
                <InfoRow
                  label={t("tableHeaders.amount")}
                  value={`${formatNumber(1500000)} تومان`}
                />
              </div>

              {/* Status */}
              <div className="flex flex-col gap-2">
                <InfoRow
                  label={t("tableHeaders.bookingStatus")}
                  value={<Status status={booking.status} />}
                />
                <InfoRow
                  label={t("tableHeaders.paymentStatus")}
                  value={<Status status="canceled" />}
                />
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2 pt-4 border-t border-border mt-4">
                <ModalStep2
                  button="حذف رزرو"
                  desc="امکان بازگشت پس از حذف وجود ندارد!"
                  onConfirm={() => handleDelete(booking.id)}
                  title="آیا از حذف کردن این رزرو مطمعنید؟"
                  trigger={
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-500 border-red-200 w-full"
                    >
                      {t("actions.delete")}
                    </Button>
                  }
                />

                {booking.status === "pending" && (
                  <div className="flex flex-col gap-2">
                    <Button
                      onClick={() => handleCancel(booking.id)}
                      variant="outline"
                      size="sm"
                      className="border-orange-200 text-orange-500"
                    >
                      {t("actions.cancel")}
                    </Button>

                    <Button
                      onClick={() => handleConfirm(booking.id)}
                      size="sm"
                      className="bg-primary text-white"
                    >
                      {t("actions.approve")}
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </ContainerDashboard>
  );
}
