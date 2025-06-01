"use client";

import Line from "@/components/dashboard/buyer/line";
import CanclePopover from "@/components/dashboard/svg/CanclePopover";
import CheckPopover from "@/components/dashboard/svg/CheckPopover";
import DeletePopover from "@/components/dashboard/svg/DeletePopover";
import DetailPopover from "@/components/dashboard/svg/DetailPopover";
import TableDashboard from "@/components/dashboard/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useTranslations } from "next-intl";

const tableHeaderItems = [
  { text: "propertyName", clx: "rounded-r-xl" },
  { text: "travelerInfo", clx: null },
  { text: "bookingDate", clx: null },
  { text: "amount", clx: null },
  { text: "bookingStatus", clx: null },
  { text: "paymentStatus", clx: null },
  { text: "empty", clx: "rounded-l-xl" },
];

export default function BookingList() {
  const t = useTranslations('BookingListSeller');
  const [openPopoverId, setOpenPopoverId] = useState<number | null>(null);

  // Mock data with translations
  const bookings = [
    {
      id: 1,
      hotel: t('mockData.hotelName'),
      date: t('mockData.bookingDate'),
      total: t('mockData.totalPrice', { price: "1,800,000" }),
      traveler: t('mockData.travelerInfo'),
      status: t('status.approved'),
      paymentStatus: t('status.approved'),
      cancelled: false,
    },
    {
      id: 2,
      hotel: t('mockData.hotelName'),
      date: t('mockData.bookingDate'),
      total: t('mockData.totalPrice', { price: "1,800,000" }),
      traveler: t('mockData.travelerInfo'),
      status: t('status.pending'),
      paymentStatus: t('status.approved'),
      cancelled: false,
    },
    {
      id: 3,
      hotel: t('mockData.hotelName'),
      date: t('mockData.bookingDate'),
      total: t('mockData.totalPrice', { price: "1,800,000" }),
      traveler: t('mockData.travelerInfo'),
      status: t('status.approved'),
      paymentStatus: t('status.cancelled'),
      cancelled: true,
    },
  ];

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-0">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-[19px] w-full md:w-auto order-2 md:order-1">
          <Button className="bg-primary text-white h-12 w-full md:w-auto">
            {t('filtersButton')}
          </Button>
          <Input
            dir="rtl"
            placeholder={t('searchPlaceholder')}
            className="h-12 placeholder:text-text-secondary placeholder:text-[16px] border-border border-[2px] px-5 rounded-2xl w-full md:w-100"
          />
        </div>
        <h1 className="text-xl font-semibold my-auto order-1 md:order-2">
          {t('pageTitle')}
        </h1>
      </div>
      <Line />

      <TableDashboard
        headerSecondary={true}
        tableHeader={tableHeaderItems.map(item => ({
          ...item,
          text: t(`tableHeaders.${item.text}`)
        }))}
        tableContent={bookings.map((booking) => (
          <tr
            key={booking.id}
            className="font-yekan font-semibold border-b hover:bg-table-header/50 cursor-pointer"
          >
            <td className="py-2 px-4 text-[18px] font-medium rounded-r-xl">
              {booking.hotel}
            </td>
            <td className="py-2 px-4 text-[18px] font-medium">
              {booking.traveler}
            </td>
            <td className="py-2 px-4 text-[18px] font-medium">
              {booking.date}
            </td>
            <td className="py-2 px-4 text-[18px] font-medium">
              {booking.total}
            </td>
            <td className="py-2 px-4">
              <span
                className={cn(
                  "px-2 py-1 rounded-full text-white text-[13px] font-medium",
                  booking.status === t('status.approved') && "bg-lime-400",
                  booking.status === t('status.pending') && "bg-orange-400"
                )}
              >
                {booking.status}
              </span>
            </td>
            <td className="py-2 px-4">
              <span
                className={cn(
                  "px-2 py-1 rounded-full text-white text-[13px] font-medium",
                  booking.paymentStatus === t('status.approved') && "bg-lime-400",
                  booking.paymentStatus === t('status.cancelled') && "bg-rose-400"
                )}
              >
                {booking.paymentStatus}
              </span>
            </td>
            <td className="py-2 px-4 text-left rounded-l-xl">
              <Popover
                open={openPopoverId === booking.id}
                onOpenChange={(open) =>
                  setOpenPopoverId(open ? booking.id : null)
                }
              >
                <PopoverTrigger asChild>
                  <div className="text-2xl font-bold cursor-pointer">...</div>
                </PopoverTrigger>
                <PopoverContent className="text-right w-32 p-2 bg-background px-1 border-border shadow-sm shadow-border">
                  <div className="space-y-2">
                    <div className="w-full flex justify-end gap-2 cursor-pointer hover:bg-border rounded px-1">
                      <h1>{t('actions.approve')}</h1>
                      <div className="my-auto">
                        <CheckPopover />
                      </div>
                    </div>
                    <div className="w-full flex justify-end gap-2 cursor-pointer hover:bg-border rounded px-1">
                      <h1>{t('actions.cancel')}</h1>
                      <div className="my-auto">
                        <CanclePopover />
                      </div>
                    </div>
                    <div className="w-full flex justify-end gap-2 cursor-pointer hover:bg-border rounded px-1">
                      <h1>{t('actions.details')}</h1>
                      <div className="my-auto">
                        <DetailPopover />
                      </div>
                    </div>
                    <div className="w-full flex justify-end gap-2 cursor-pointer hover:bg-border text-red-600 rounded px-1">
                      <h1>{t('actions.delete')}</h1>
                      <div className="my-auto">
                        <DeletePopover />
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </td>
          </tr>
        ))}
      />
    </>
  );
}