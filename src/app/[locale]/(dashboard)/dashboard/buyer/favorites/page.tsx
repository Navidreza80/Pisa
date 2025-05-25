"use client";

import InputSelect from "@/components/dashboard/buyer/inputSelect";
import Line from "@/components/dashboard/buyer/line";
import FilterModal from "@/components/dashboard/filter-modal";
import CheckPopover from "@/components/dashboard/svg/CheckPopover";
import DeletePopover from "@/components/dashboard/svg/DeletePopover";
import TableDashboard from "@/components/dashboard/table";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

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
          <FilterModal>
            <InputSelect label=":نوع ملک" width={220} />
            <InputSelect label=":نوع ملک" width={220} />
            <InputSelect label=":نوع ملک" width={220} />
            <InputSelect label=":نوع ملک" width={220} />
          </FilterModal>
          <Input
            dir="rtl"
            placeholder="نام هتل مورد نظر ....."
            className="h-12 placeholder:text-text-secondary placeholder:text-[16px] border-border border-[2px] px-5 rounded-2xl w-100"
          />
        </div>
      </div>

      <Line />
      <TableDashboard
      headerSecondary={true}
        tableContent={bookings.map((booking) => (
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
        tableHeader={tableHeaderItems}
      />
    </>
  );
}
