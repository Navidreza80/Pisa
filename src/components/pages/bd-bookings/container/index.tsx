"use client";

import ContainerDashboard from "@/components/common/dashboard/ContainerDashboard";
import FilterModal from "@/components/common/dashboard/FilterModal";
import Line from "@/components/common/dashboard/line";
import TableDashboard from "@/components/common/dashboard/Table";
import Title from "@/components/common/dashboard/Title";
import InputSelect from "@/components/common/inputs/select-input";
import ReserveTableContent from "@/components/pages/bd-bookings/contents/content";
import { Card, CardContent } from "@/components/ui/card";
import { Reservation } from "@/types/reserve";
import formatToPersianDate from "@/utils/helper/format-date";
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
  noFilter = false,
  title,
}: {
  bookingList: { data: Reservation[]; totalCount: number };
  title?: string;
  noFilter?: boolean;
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
        <Title text={title || t("title")} />
        <div className="flex gap-[19px] flex-wrap justify-end">
          {!noFilter && (
            <FilterModal>
              <div className="grid grid-cols-2 gap-3 w-full">
                <InputSelect
                  onChange={(sort) => handleSetParam("sort", sort.toString())}
                  className="!w-full"
                  items={[
                    { text: t("createdAt"), value: "created_at" },
                    { text: t("updatedAt"), value: "updated_at" },
                  ]}
                  label={t("sort")}
                  withLabel
                  value={sort || "created_at"}
                />
                <InputSelect
                  onChange={(order) =>
                    handleSetParam("order", order.toString())
                  }
                  items={[
                    { text: t("asc"), value: "ASC" },
                    { text: t("desc"), value: "DESC" },
                  ]}
                  className="!w-full"
                  label={t("order")}
                  withLabel
                  value={order || "DESC"}
                />
              </div>
            </FilterModal>
          )}
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
                {/* Booking details */}
                <div className="flex flex-col gap-2 ">
                  <div className="space-y-1">
                    <p className="text-sm text-text-secondary">
                      {t("tableHeaders.bookingDate")}
                    </p>
                    <p className="font-medium">
                      {booking.reservedDates.length > 0 &&
                        formatToPersianDate(booking.reservedDates[0].value)}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm text-text-secondary">
                      :{t("tableHeaders.passengerCount")}
                    </p>
                    <p className="font-medium">
                      {t("passengerCount", {
                        count: booking.traveler_details.length,
                      })}
                    </p>
                  </div>
                </div>

                {/* Status badges */}
                <div className="flex flex-col justify-end gap-2 pt-2">
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-sm text-text-secondary">
                      :{t("tableHeaders.bookingStatus")}
                    </span>
                    <span>
                      {booking.status == "pending" ? t("pending") : t("submit")}
                    </span>
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <span className="text-sm text-text-secondary">
                      {t("tableHeaders.paymentStatus")}
                    </span>
                    <span>{t("submit")}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </ContainerDashboard>
  );
}
