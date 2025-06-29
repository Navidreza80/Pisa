"use client";

import ContainerDashboard from "@/components/common/dashboard/ContainerDashboard";
import FilterModal from "@/components/common/dashboard/FilterModal";
import Line from "@/components/common/dashboard/line";
import TableDashboard from "@/components/common/dashboard/Table";
import Title from "@/components/common/dashboard/Title";
import InputSelect from "@/components/common/inputs/select-input";
import ReserveTableContent from "@/components/pages/bd-bookings/contents/content";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Reservation } from "@/types/reserve";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";

const tableHeaderItems = [
  { text: "hotelName", clx: "rounded-r-xl" },
  { text: "bookingDate", clx: null },
  { text: "totalPrice", clx: null },
  { text: "passengerCount", clx: null },
  { text: "bookingStatus", clx: null },
  { text: "paymentStatus", clx: null },
  { text: "empty", clx: "rounded-l-xl" },
];

export default function BookingList({
  bookingList,
}: {
  bookingList: { data: Reservation[]; totalCount: number };
}) {
  const t = useTranslations("BookingList");
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = searchParams.get("page");
  const sort = searchParams.get("sort");
  const order = searchParams.get("order");

  const handleSetParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    router.push(`?${params.toString()}`);
  };

  return (
    <ContainerDashboard>
      <div className="flex items-center justify-between flex-row-reverse flex-wrap gap-4">
        <Title text={t("title")} />
        <div className="flex gap-[19px] flex-wrap justify-end">
          <FilterModal>
            <div className="grid grid-cols-2 gap-3 w-full">
              <InputSelect
                onChange={(sort) => handleSetParam("sort", sort.toString())}
                className="!w-full"
                items={[
                  { text: "زمان ساخت", value: "created_at" },
                  { text: "تاریخ آپدیت", value: "updated_at" },
                ]}
                label="مرتب سازی:"
                withLabel
                value={sort || "created_at"}
              />
              <InputSelect
                onChange={(order) => handleSetParam("order", order.toString())}
                items={[
                  { text: "صعودی", value: "ASC" },
                  { text: "نزولی", value: "DESC" },
                ]}
                className="!w-full"
                label="روند:"
                withLabel
                value={order || "DESC"}
              />
            </div>
          </FilterModal>
        </div>
      </div>

      <Line />

      {/* Table view for desktop */}
      <div className="hidden md:block">
        <TableDashboard
          headerSecondary={true}
          tableHeader={tableHeaderItems.map((item) => ({
            ...item,
            text: t(`tableHeaders.${item.text}`),
          }))}
          tableContent={bookingList.data.map((booking, index) => (
            <ReserveTableContent key={index} booking={booking} />
          ))}
          currentPage={Number(page) || 1}
          totalCount={bookingList.totalCount}
          pageSize={2}
          onPageChange={(page) => handleSetParam("page", page.toString())}
        />
      </div>

      {/* Card view for mobile */}
      <div className="md:hidden grid grid-cols-1 gap-4 mt-4">
        {bookingList.data.map((booking) => (
          <Card key={booking.id} className="overflow-hidden border-border">
            <CardContent className="p-0">
              <div className="p-4 space-y-3">
                {/* Header with hotel name and actions */}
                <div className="flex justify-end items-start">
                  <h2 className="text-lg font-bold text-right">
                    {booking.hotel}
                  </h2>
                </div>

                {/* Booking details */}
                <div className="flex flex-col gap-2 text-right">
                  <div className="space-y-1">
                    <p className="text-sm text-text-secondary">
                      {t("tableHeaders.bookingDate")}
                    </p>
                    <p className="font-medium">{booking.date}</p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm text-text-secondary">
                      :{t("tableHeaders.totalPrice")}
                    </p>
                    <p className="font-medium">{booking.total}</p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm text-text-secondary">
                      :{t("tableHeaders.passengerCount")}
                    </p>
                    <p className="font-medium">
                      {t("passengerCount", { count: booking.passengers })}
                    </p>
                  </div>
                </div>

                {/* Status badges */}
                <div className="flex flex-col justify-end gap-2 pt-2">
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-sm text-text-secondary">
                      :{t("tableHeaders.bookingStatus")}
                    </span>
                    <span
                      className={cn(
                        "px-2 py-1 rounded-full text-white text-xs",
                        booking.status === t("status.approved") &&
                          "bg-lime-400",
                        booking.status === t("status.pending") &&
                          "bg-orange-400"
                      )}
                    >
                      {booking.status}
                    </span>
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <span className="text-sm text-text-secondary">
                      {t("tableHeaders.paymentStatus")}
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
                <div className="flex justify-end gap-2 pt-2 border-t border-border mt-3">
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
                    {t("actions.details")}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </ContainerDashboard>
  );
}
