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
import Status from "../content/Status";

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
  const searchParams = useSearchParams();
  // const search = searchParams.get("search");
  const page = searchParams.get("page");
  const handleSetParam = (key: string, value: string | number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value.toString());
    router.push(`?${params.toString()}`);
  };

  const t = useTranslations("BookingListSeller");
  const [openPopoverId, setOpenPopoverId] = useState<number | null>(null);
  const { data } = useQuery({
    queryKey: ["SELLERS_BOOKINGS"],
    queryFn: () => GetSellerBooking({ params: { limit } }),
  });

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
                      <PopoverItem
                        icon={<CheckPopover />}
                        title={t("actions.approve")}
                      />
                      <PopoverItem
                        icon={<CanclePopover />}
                        title={t("actions.cancel")}
                      />
                      <PopoverItem
                        icon={<DetailPopover />}
                        title={t("actions.details")}
                      />
                      <PopoverItem
                        icon={<DeletePopover />}
                        title={t("actions.delete")}
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
        {data?.bookings.map((booking) => (
          <Card key={booking.id} className="overflow-hidden border-border">
            <CardContent className="p-4">
              {/* Header with property name and actions */}
              <div className="flex justify-between items-start mb-3">
                <Popover
                  open={openPopoverId === booking.id}
                  onOpenChange={(open) =>
                    setOpenPopoverId(open ? booking.id : null)
                  }
                >
                  <PopoverTrigger asChild>
                    <button className="text-xl font-bold cursor-pointer">
                      ...
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className=" w-32 p-2 bg-background px-1 border-border shadow-sm shadow-border">
                    <div className="space-y-2">
                      <div className="w-full flex gap-2 cursor-pointer hover:bg-border rounded px-1">
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
                        <h1>{t("actions.details")}</h1>
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

                <h2 className="text-lg font-bold ">{booking.hotel}</h2>
              </div>

              {/* Booking details */}
              <div className="grid grid-cols-2 gap-3 ">
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">
                    {t("tableHeaders.travelerInfo")}:
                  </p>
                  <p className="font-medium">{booking.traveler}</p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-gray-500">
                    {t("tableHeaders.bookingDate")}:
                  </p>
                  <p className="font-medium">{booking.date}</p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-gray-500">
                    {t("tableHeaders.amount")}:
                  </p>
                  <p className="font-medium">{booking.total}</p>
                </div>
              </div>

              {/* Status badges */}
              <div className="flex flex-wrap justify-end gap-4 pt-3 mt-3">
                <div className="flex flex-col items-end gap-1">
                  <span className="text-sm text-gray-500">
                    {t("tableHeaders.bookingStatus")}:
                  </span>
                  <span
                    className={cn(
                      "px-2 py-1 rounded-full text-white text-xs",
                      booking.status === t("status.approved") && "bg-lime-400",
                      booking.status === t("status.pending") && "bg-orange-400"
                    )}
                  >
                    {booking.status}
                  </span>
                </div>

                <div className="flex flex-col items-end gap-1">
                  <span className="text-sm text-gray-500">
                    {t("tableHeaders.paymentStatus")}:
                  </span>
                  <span
                    className={cn(
                      "px-2 py-1 rounded-full text-white text-xs",
                      booking.paymentStatus === t("status.approved") &&
                        "bg-lime-400",
                      booking.paymentStatus === t("status.cancelled") &&
                        "bg-rose-400"
                    )}
                  >
                    {booking.paymentStatus}
                  </span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex justify-end gap-2 pt-3 border-t border-border mt-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-500 border-red-200"
                >
                  {t("actions.delete")}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-orange-200 text-orange-500"
                >
                  {t("actions.cancel")}
                </Button>
                <Button size="sm" className="bg-primary text-white">
                  {t("actions.approve")}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </ContainerDashboard>
  );
}
