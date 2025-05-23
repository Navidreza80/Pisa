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
import ReserveDetail from "@/components/dashboard/buyer/reserveDetail";

const bookings = [
  {
    id: 1,
    hotel: "هتل سراوان رانین رشت",
    price: "1،800،000ت",
    address: " گیلان ، رشت ، میدان آزادی ، جنب چهار راه عظ....گیلان ، رشت...",
  },
  {
    id: 2,
    hotel: "هتل سراوان رانین رشت",
    price: "1،800،000ت",
    address: " گیلان ، رشت ، میدان آزادی ، جنب چهار راه عظ....گیلان ، رشت...",
  },
  {
    id: 3,
    hotel: "هتل سراوان رانین رشت",
    price: "1،800،000ت",
    address: " گیلان ، رشت ، میدان آزادی ، جنب چهار راه عظ....گیلان ، رشت...",
  },
];

const tableHeaderItems = [
  { text: "نام اقامتگاه", clx: "rounded-r-xl" },
  { text: "قیمت", clx: null },
  { text: "آدرس", clx: null },
  { text: "-", clx: "text-transparent rounded-l-xl" },
];

export default function BookingList() {
  const [openPopoverId, setOpenPopoverId] = useState<number | null>(null);

  return (
    <>
      <div className="flex items-center justify-between flex-row-reverse">
        <h1 className="text-xl font-medium font-yekan mb-auto">
          لیست رزرو های ذخیره شده
        </h1>
        <div className="flex gap-[19px]">
          <Button className="bg-primary text-white h-12 rounded-[14px]">
            فیلتر ها
          </Button>
          <Input
            dir="rtl"
            placeholder="نام هتل مورد نظر ....."
            className="h-12 placeholder:text-text-secondary placeholder:text-[16px] border-border border-[2px] px-5 rounded-2xl w-100"
          />
        </div>
      </div>

      <Line />

      <table
        dir="rtl"
        className="w-full text-sm border-separate border-spacing-y-4"
      >
        <thead>
          <tr className="font-bold bg-table-header text-text">
            {tableHeaderItems.map((item, index) => {
              return (
                <th
                  key={index}
                  className={`p-2 text-lg  font-medium ${item.clx}`}
                >
                  {item.text}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr
              key={booking.id}
              className="text-right border-b hover:bg-background/30"
            >
              <td className="py-2 px-4">{booking.hotel}</td>
              <td className="py-2 px-4">{booking.price}</td>
              <td className="py-2 px-4">{booking.address}</td>
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
                  <PopoverContent className="text-right w-32 p-1 bg-background px-1 border-border shadow-sm shadow-border">
                    <div>
                      <div className="w-full flex justify-end gap-2 cursor-pointer hover:bg-border py-1 rounded-2xl px-1">
                        <h1>رزرو</h1>
                        <div className="my-auto">
                          <CheckPopover />
                        </div>
                      </div>
                      <div className="w-full flex justify-end gap-2 cursor-pointer hover:bg-border py-1 rounded-2xl px-1">
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

      <div className="flex justify-start mt-[71px] gap-2">
        {[1, 2, 3, 4, 5].map((p) => (
          <button
            key={p}
            className={`w-8 h-8 rounded-full border text-sm ${p === 1 ? "bg-primary text-white" : "bg-background"}`}
          >
            {p}
          </button>
        ))}
      </div>
    </>
  );
}
