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

const bookings = [
  {
    id: 1,
    hotel: "هتل سرافراز زائین رشت",
    date: "12 مرداد 1401 / 13:33",
    total: "1,800,000 تومان",
    passengers: 2,
    status: "تایید شده",
    paymentStatus: "تایید شده",
    cancelled: false,
  },
  {
    id: 2,
    hotel: "هتل سرافراز زائین رشت",
    date: "12 مرداد 1401 / 13:33",
    total: "1,800,000 تومان",
    passengers: 2,
    status: "در انتظار",
    paymentStatus: "تایید شده",
    cancelled: false,
  },
  {
    id: 3,
    hotel: "هتل سرافراز زائین رشت",
    date: "12 مرداد 1401 / 13:33",
    total: "1,800,000 تومان",
    passengers: 2,
    status: "تایید شده",
    paymentStatus: "لغو شده",
    cancelled: true,
  },
];

export default function BookingList() {
  const [openPopoverId, setOpenPopoverId] = useState<number | null>(null);

  return (
    <>
      <div className="flex items-center gap-[19px]">
        <Button className="bg-primary text-white h-12">فیلتر ها</Button>
        <Input
          dir="rtl"
          placeholder="نام هتل مورد نظر ....."
          className="h-12 placeholder:text-text-secondary placeholder:text-[16px] border-border border-[2px] px-5 rounded-2xl w-100"
        />
      </div>

      <Line />

      <table
        dir="rtl"
        className="w-full text-sm border-separate border-spacing-y-4"
      >
        <thead>
          <tr className="font-bold bg-text/30 text-text">
            <th className="p-2 text-lg rounded-r-xl">نام اقامتگاه</th>
            <th className="p-2 text-lg">تاریخ رزرو</th>
            <th className="p-2 text-lg">قیمت کل</th>
            <th className="p-2 text-lg">تعداد مسافر</th>
            <th className="p-2 text-lg">وضعیت رزرو</th>
            <th className="p-2 text-lg">وضعیت پرداخت</th>
            <th className="p-2 text-lg rounded-l-xl"></th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
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
                        <h1>جزئیات</h1>
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
        </tbody>
      </table>

      <div className="flex justify-center pt-4">
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, "...", 9].map((page, idx) => (
            <Button
              key={idx}
              size="sm"
              variant={page === 1 ? "default" : "ghost"}
              className="rounded-full px-3"
            >
              {page}
            </Button>
          ))}
        </div>
      </div>
    </>
  );
}
