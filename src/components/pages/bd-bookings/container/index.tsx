"use client";

import ContainerDashboard from "@/components/common/dashboard/ContainerDashboard";
import FilterModal from "@/components/dashboard/filter-modal";
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
import Status from "../../sd-booking-management/content/Status";
import { Button } from "@/components/ui/button";
import ModalStep2 from "@/components/common/dashboard/modalStep2";
import ReserveDetail from "../contents/reserveDetail";
import useContinueBooking from "../../sd-booking-management/content/hooks/useContinueBooking";
import useCancelBooking from "../../sd-booking-management/content/hooks/useCancelBooking";
import useDeleteBooking from "../../sd-booking-management/content/hooks/useDeleteBooking";

const tableHeaderItems = [
  { text: "hotelName", clx: "rtl:rounded-r-xl ltr:rounded-l-xl" },
  { text: "bookingDate", clx: null },
  { text: "totalPrice", clx: null },
  { text: "passengerCount", clx: null },
  { text: "bookingStatus", clx: null },
  { text: "paymentStatus", clx: null },
  { text: "empty", clx: "rtl:rounded-l-xl ltr:rounded-r-xl" },
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

  const { handleDelete } = useDeleteBooking(() => router.refresh());
  const { handleCancel } = useCancelBooking(() => router.refresh());
  const { handleContinue } = useContinueBooking(() => router.refresh());

  return (
    <ContainerDashboard>
      <div className="flex items-center justify-between flex-row-reverse flex-wrap gap-4">
        <div className="flex gap-[19px] flex-wrap justify-end">
          {!noFilter && (
            <FilterModal>
              <InputSelect
                onChange={(sort) => handleSetParam("sort", sort.toString())}
                className="!w-full"
                items={[
                  { text: t("createdAt"), value: "createdAt" },
                  { text: t("updatedAt"), value: "updatedAt" },
                ]}
                label={t("sort")}
                withLabel
                value={sort || "createdAt"}
              />
              <InputSelect
                onChange={(order) => handleSetParam("order", order.toString())}
                items={[
                  { text: t("asc"), value: "ASC" },
                  { text: t("desc"), value: "DESC" },
                ]}
                className="!w-full"
                label={t("order")}
                withLabel
                value={order || "ASC"}
              />
            </FilterModal>
          )}
        </div>
        <Title text={title || t("title")} />
      </div>

      <Line />

      {/* Table view for desktop */}
      <TableDashboard
        headerSecondary={true}
        tableHeader={tableHeaderItems.map((item) => ({
          ...item,
          text: t(`tableHeaders.${item.text}`),
        }))}
        tableContent={bookingList.data.map((booking, index) => (
          <ReserveTableContent key={index} booking={booking} />
        ))}
        card={
          <div className="grid grid-cols-1 gap-4 mt-4">
            {bookingList.data.map((booking) => (
              <Card
                key={booking.id}
                className="overflow-hidden border-border rounded-2xl shadow-none p-2"
              >
                <CardContent className="p-0">
                  <div className="p-4 space-y-4">
                    {/* Booking details */}
                    <div className="flex flex-col gap-3">
                      <div className="flex justify-between items-start border-b pb-2">
                        <div className="space-y-1">
                          <p className="text-sm text-text-secondary">
                            {t("tableHeaders.bookingDate")}
                          </p>
                          <p className="font-semibold text-base">
                            {booking.reservedDates.length > 0 &&
                              formatToPersianDate(
                                booking.reservedDates[0].value
                              )}
                          </p>
                        </div>
                        <div className="text-right space-y-1">
                          <p className="text-sm text-text-secondary">
                            {t("tableHeaders.passengerCount")}:
                          </p>
                          <p className="font-semibold text-base">
                            {t("passengerCount", {
                              count: booking.traveler_details.length,
                            })}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Status badges */}
                    <div className="grid grid-cols-2 gap-4 text-right">
                      <div className="space-y-1">
                        <p className="text-sm text-text-secondary">
                          {t("tableHeaders.bookingStatus")}:
                        </p>
                        <Status status={booking.status} />
                      </div>

                      <div className="space-y-1">
                        <p className="text-sm text-text-secondary">
                          {t("tableHeaders.paymentStatus")}:
                        </p>
                        <Status status={"canceled"} />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 pt-4 border-t border-border mt-4">
                    <ReserveDetail
                      trigger={
                        <Button variant="outline" size="sm" className=" w-full">
                          جزییات
                        </Button>
                      }
                      houseId={booking.houseId}
                    />
                    <ModalStep2
                      onConfirm={() => handleDelete(booking.id)}
                      button="حذف رزرو"
                      desc="امکان بازگشت پس از حذف وجود ندارد!"
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
                    {booking.status === "canceled" && (
                      <Button
                        variant="outline"
                        onClick={() => handleContinue(booking.id)}
                        size="sm"
                        className="border-green-200 text-green-500"
                      >
                        بازیابی
                      </Button>
                    )}
                    {booking.status === "pending" && (
                      <Button
                        onClick={() => handleCancel(booking.id)}
                        variant="outline"
                        size="sm"
                        className="border-orange-200 text-orange-500"
                      >
                        {t("actions.cancel")}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        }
        currentPage={Number(page) || 1}
        totalCount={bookingList.totalCount}
        pageSize={5}
        onPageChange={(page) => handleSetParam("page", page.toString())}
      />
    </ContainerDashboard>
  );
}
