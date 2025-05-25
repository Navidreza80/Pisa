"use client";

import Line from "@/components/dashboard/buyer/line";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import DeletePopover from "@/components/dashboard/svg/DeletePopover";
import DetailPopover from "@/components/dashboard/svg/DetailPopover";
import CanclePopover from "@/components/dashboard/svg/CanclePopover";
import CheckPopover from "@/components/dashboard/svg/CheckPopover";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ReserveDetail from "@/components/dashboard/buyer/reserveDetail";
import TableDashboard from "@/components/dashboard/table";

const bookings = [
  {
    id: 1,
    hotel: "هتل سراوان رانین رشت",
    date: "12 مرداد 1401 / 13:33",
    total: "1,800,000 تومان",
    passengers: 2,
    status: "تایید شده",
    paymentStatus: "تایید شده",
    cancelled: false,
  },
  {
    id: 2,
    hotel: "هتل سراوان رانین رشت",
    date: "12 مرداد 1401 / 13:33",
    total: "1,800,000 تومان",
    passengers: 2,
    status: "در انتظار",
    paymentStatus: "تایید شده",
    cancelled: false,
  },
  {
    id: 3,
    hotel: "هتل سراوان رانین رشت",
    date: "12 مرداد 1401 / 13:33",
    total: "1,800,000 تومان",
    passengers: 2,
    status: "تایید شده",
    paymentStatus: "لغو شده",
    cancelled: true,
  },
];

const tableHeaderItems = [
  { text: "نام اقامتگاه", clx: "rounded-r-xl" },
  { text: "تاریخ رزرو", clx: null },
  { text: "قیمت کل", clx: null },
  { text: "تعداد مسافر", clx: null },
  { text: " وضعیت رزرو", clx: null },
  { text: " وضعیت پرداخت", clx: null },
  { text: "", clx: "rounded-l-xl" },
];

export default function BookingList() {
  const [openPopoverId, setOpenPopoverId] = useState<number | null>(null);

  return (
    <>
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-[19px]">
        <Button className="bg-primary text-white h-12 w-full md:w-auto">
          فیلتر ها
        </Button>
        <Input
          dir="rtl"
          placeholder="نام هتل مورد نظر ....."
          className="h-12 placeholder:text-text-secondary placeholder:text-[16px] border-border border-[2px] px-5 rounded-2xl w-full md:w-100"
        />
      </div>

      <Line />

      <TableDashboard
        headerSecondary={true}
        tableHeader={tableHeaderItems}
        tableContent={bookings.map((booking) => (
          <tr
            key={booking.id}
            className="text-right border-b hover:bg-background/30"
          >
            <td className="py-2 px-4">{booking.hotel}</td>
            <td className="py-2 px-4">{booking.date}</td>
            <td className="py-2 px-4">{booking.total}</td>
            <td className="py-2 px-4">{`${booking.passengers} عدد مسافر`}</td>
            <td className="py-2 px-4">
              <span
                className={cn(
                  "px-2 py-1 rounded-full text-white text-xs",
                  booking.status === "تایید شده" && "bg-lime-400",
                  booking.status === "در انتظار" && "bg-orange-400"
                )}
              >
                {booking.status}
              </span>
            </td>
            <td className="py-2 px-4">
              <span
                className={cn(
                  "px-2 py-1 rounded-full text-white text-xs",
                  booking.paymentStatus === "تایید شده" && "bg-lime-400",
                  booking.paymentStatus === "لغو شده" && "bg-rose-400"
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
                      <h1>تایید رزرو</h1>
                      <div className="my-auto">
                        <CheckPopover />
                      </div>
                    </div>
                    <div className="w-full flex justify-end gap-2 cursor-pointer hover:bg-border rounded px-1">
                      <h1>لغو رزرو</h1>
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
                      <h1>حذف</h1>
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
