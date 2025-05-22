"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Line from "@/components/dashboard/buyer/line";

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
  const [openDialogId, setOpenDialogId] = useState<number | null>(null);

  return (
    <main className="flex-1 bg-background p-8 rounded-[12px]">
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
                <Dialog
                  open={openDialogId === booking.id}
                  onOpenChange={(open) =>
                    setOpenDialogId(open ? booking.id : null)
                  }
                >
                  <DialogTrigger asChild>
                    <div className="text-2xl font-bold cursor-pointer">
                      ...
                    </div>
                  </DialogTrigger>
                  <DialogContent className="text-right">
                    <Card className="space-y-2">
                      <CardContent className="space-y-2">
                        <div className="w-full">
                          پرداخت
                        </div>
                        <div className="w-full">
                          جزئیات
                        </div>
                        <div className="w-full">
                          حذف
                        </div>
                      </CardContent>
                    </Card>
                  </DialogContent>
                </Dialog>
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
    </main>
  );
}
