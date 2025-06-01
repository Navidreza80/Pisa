"use client";

import Line from "@/components/dashboard/buyer/line";
import ReserveDetail from "@/components/dashboard/buyer/reserveDetail";
import CanclePopover from "@/components/dashboard/svg/CanclePopover";
import CheckPopover from "@/components/dashboard/svg/CheckPopover";
import DeletePopover from "@/components/dashboard/svg/DeletePopover";
import DetailPopover from "@/components/dashboard/svg/DetailPopover";
import TableDashboard from "@/components/dashboard/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

const tableHeaderItems = [
  { text: "hotelName", clx: "rounded-r-xl" },
  { text: "bookingDate", clx: null },
  { text: "totalPrice", clx: null },
  { text: "passengerCount", clx: null },
  { text: "bookingStatus", clx: null },
  { text: "paymentStatus", clx: null },
  { text: "empty", clx: "rounded-l-xl" },
];

export default function BookingList() {
  const t = useTranslations('BookingList');
  const [openPopoverId, setOpenPopoverId] = useState<number | null>(null);

  // Mock data with translations
  const bookings = [
    {
      id: 1,
      hotel: t('mockData.hotelName'),
      date: t('mockData.bookingDate'),
      total: t('mockData.totalPrice', { price: "1,800,000" }),
      passengers: 2,
      status: t('status.approved'),
      paymentStatus: t('status.approved'),
      cancelled: false,
    },
    {
      id: 2,
      hotel: t('mockData.hotelName'),
      date: t('mockData.bookingDate'),
      total: t('mockData.totalPrice', { price: "1,800,000" }),
      passengers: 2,
      status: t('status.pending'),
      paymentStatus: t('status.approved'),
      cancelled: false,
    },
    {
      id: 3,
      hotel: t('mockData.hotelName'),
      date: t('mockData.bookingDate'),
      total: t('mockData.totalPrice', { price: "1,800,000" }),
      passengers: 2,
      status: t('status.approved'),
      paymentStatus: t('status.cancelled'),
      cancelled: true,
    },
  ];

  return (
    <>
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-[19px]">
        <Button className="bg-primary text-white h-12 w-full md:w-auto">
          {t('filtersButton')}
        </Button>
        <Input
          dir="rtl"
          placeholder={t('searchPlaceholder')}
          className="h-12 placeholder:text-text-secondary placeholder:text-[16px] border-border border-[2px] px-5 rounded-2xl w-full md:w-100"
        />
      </div>

      <Line />

      {/* Table view for desktop */}
      <div className="hidden md:block">
        <TableDashboard
          headerSecondary={true}
          tableHeader={tableHeaderItems.map(item => ({
            ...item,
            text: t(`tableHeaders.${item.text}`)
          }))}
          tableContent={bookings.map((booking) => (
            <tr
              key={booking.id}
              className="text-right border-b hover:bg-background/30"
            >
              <td className="py-2 px-4 text-[18px] font-medium">
                {booking.hotel}
              </td>
              <td className="py-2 px-4 text-[18px] font-medium">
                {booking.date}
              </td>
              <td className="py-2 px-4 text-[18px] font-medium">
                {booking.total}
              </td>
              <td className="py-2 px-4 text-[18px] font-medium">
                {t('passengerCount', { count: booking.passengers })}
              </td>
              <td className="py-2 px-4 text-[13px] font-medium">
                <span
                  className={cn(
                    "px-2 py-1 rounded-full text-white text-xs",
                    booking.status === t('status.approved') && "bg-lime-400",
                    booking.status === t('status.pending') && "bg-orange-400"
                  )}
                >
                  {booking.status}
                </span>
              </td>
              <td className="py-2 px-4 text-[13px] font-medium">
                <span
                  className={cn(
                    "px-2 py-1 rounded-full text-white text-xs",
                    booking.paymentStatus === t('status.approved') && "bg-lime-400",
                    booking.paymentStatus === t('status.cancelled') && "bg-rose-400"
                  )}
                >
                  {booking.paymentStatus}
                </span>
              </td>
              <td className="py-2 px-4 text-left">
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
                        <ReserveDetail />
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
      </div>

      {/* Card view for mobile */}
      <div className="md:hidden grid grid-cols-1 gap-4 mt-4">
        {bookings.map((booking) => (
          <Card key={booking.id} className="overflow-hidden border-border">
            <CardContent className="p-0">
              <div className="p-4 space-y-3">
                {/* Header with hotel name and actions */}
                <div className="flex justify-end items-start">
                  <h2 className="text-lg font-bold text-right">{booking.hotel}</h2>
                </div>

                {/* Booking details */}
                <div className="flex flex-col gap-2 text-right">
                  <div className="space-y-1">
                    <p className="text-sm text-text-secondary">:{t('tableHeaders.bookingDate')}</p>
                    <p className="font-medium">{booking.date}</p>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-sm text-text-secondary">:{t('tableHeaders.totalPrice')}</p>
                    <p className="font-medium">{booking.total}</p>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-sm text-text-secondary">:{t('tableHeaders.passengerCount')}</p>
                    <p className="font-medium">
                      {t('passengerCount', { count: booking.passengers })}
                    </p>
                  </div>
                </div>

                {/* Status badges */}
                <div className="flex flex-col justify-end gap-2 pt-2">
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-sm text-text-secondary">:{t('tableHeaders.bookingStatus')}</span>
                    <span
                      className={cn(
                        "px-2 py-1 rounded-full text-white text-xs",
                        booking.status === t('status.approved') && "bg-lime-400",
                        booking.status === t('status.pending') && "bg-orange-400"
                      )}
                    >
                      {booking.status}
                    </span>
                  </div>
                  
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-sm text-text-secondary">:{t('tableHeaders.paymentStatus')}</span>
                    <span
                      className={cn(
                        "px-2 py-1 rounded-full text-white text-xs",
                        booking.paymentStatus === t('status.approved') && "bg-lime-400",
                        booking.paymentStatus === t('status.cancelled') && "bg-rose-400"
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
                    {t('actions.delete')}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-orange-200 text-orange-500"
                  >
                    {t('actions.cancel')}
                  </Button>
                  <Button 
                    size="sm"
                    className="bg-primary text-white"
                  >
                    {t('actions.details')}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
