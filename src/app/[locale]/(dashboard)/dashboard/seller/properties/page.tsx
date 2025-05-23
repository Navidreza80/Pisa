"use client";
import Line from "@/components/dashboard/buyer/line";
import AddSVG from "@/components/dashboard/svg/AddSVG";
import CheckPopover from "@/components/dashboard/svg/CheckPopover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";

const properties = [
  {
    id: 1,
    name: "هتل ساران زبید رشت",
    price: "۸٬۰۰۰٬۰۰۰",
    score: "۴ از ۵",
    views: 5,
    reservations: 5,
    status: "فعال",
  },
  {
    id: 2,
    name: "هتل ساران زبید رشت",
    price: "۸٬۰۰۰٬۰۰۰",
    score: "۴ از ۵",
    views: 5,
    reservations: 5,
    status: "در انتظار",
  },
  {
    id: 3,
    name: "هتل ساران زبید رشت",
    price: "۸٬۰۰۰٬۰۰۰",
    score: "۴ از ۵",
    views: 5,
    reservations: 5,
    status: "غیرفعال",
  },
  {
    id: 4,
    name: "هتل ساران زبید رشت",
    price: "۸٬۰۰۰٬۰۰۰",
    score: "۴ از ۵",
    views: 5,
    reservations: 5,
    status: "در انتظار",
  },
  {
    id: 5,
    name: "هتل ساران زبید رشت",
    price: "۸٬۰۰۰٬۰۰۰",
    score: "۴ از ۵",
    views: 5,
    reservations: 5,
    status: "فعال",
  },
];

const statusColor = {
  فعال: "bg-green-400 text-white",
  "در انتظار": "bg-yellow-400 text-black",
  غیرفعال: "bg-red-400 text-white",
};

export default function PropertyList() {
  return (
    <div dir="rtl">
      <div className="flex flex-col md:flex-row-reverse justify-between gap-4 md:gap-0">
        <div className="flex flex-col md:flex-row-reverse items-start md:items-center gap-4 md:gap-[19px] w-full md:w-auto order-2 md:order-1">
          <Button className="bg-primary text-white h-12 w-full md:w-auto">
            فیلتر ها
          </Button>
          <Input
            dir="rtl"
            placeholder="نام ملک مورد نظر ....."
            className="h-12 placeholder:text-text-secondary placeholder:text-[16px] border-border border-[2px] px-5 rounded-2xl w-full md:w-100"
          />
        </div>
        <h1 className="text-xl font-semibold my-auto order-1 md:order-2">
          لیست املاک من
        </h1>
      </div>
      <Line />

      <table className="w-full border-separate border-spacing-y-2">
        <thead>
          <tr className="text-text bg-table-header">
            <th className="px-2 py-3 text-center rounded-r-xl">نام اقامتگاه</th>
            <th className="px-2 py-3">قیمت</th>
            <th className="px-2 py-3">امتیاز</th>
            <th className="px-2 py-3">بازدیدها</th>
            <th className="px-2 py-3">رزروها</th>
            <th className="px-2 py-3">وضعیت</th>
            <th className="px-2 py-3 rounded-l-xl"></th>
          </tr>
        </thead>
        <tbody>
          {properties.map((property) => (
            <tr key={property.id} className="bg-table-header/50 rounded-xl">
              <td className="rounded-r-xl px-2 flex gap-2 w-73">
                <div className="bg-text-secondary/30 w-27 my-auto h-20 m-0.5 rounded-[12px]" />{" "}
                {/* width={108} height={72} src={"x"} alt="" */}
                <div className="py-7">{property.name}</div>
              </td>
              <td className="px-6 py-7">{property.price}</td>
              <td className="px-6 py-7">{property.score}</td>
              <td className="px-6 py-7">{property.views}</td>
              <td className="px-6 py-7">{property.reservations}</td>
              <td className="px-6 py-7">
                <span
                  className={`px-3 py-1 rounded-full text-sm ${statusColor[property.status]}`}
                >
                  {property.status}
                </span>
              </td>
              <td className="px-6 py-2 relative rounded-l-xl">
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="text-xl font-bold cursor-pointer">
                      ...
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="text-right w-32 p-2 bg-background px-1 border-border shadow-sm shadow-border rounded-[15px]">
                    <div className="space-y-2">
                      <div className="w-full flex justify-end gap-2 cursor-pointer hover:bg-border rounded-[10px] px-1">
                        <h1>فعال کردن</h1>
                        <div className="my-auto">t</div>
                      </div>
                      <div className="w-full flex justify-end gap-2 cursor-pointer hover:bg-border rounded-[10px] px-1">
                        <h1>ویرایش</h1>
                        <div className="my-auto">t</div>
                      </div>
                      <div className="w-full flex justify-end gap-2 cursor-pointer hover:bg-border rounded-[10px] px-1">
                        حذف
                        <div className="my-auto">t</div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="ml-auto flex justify-between w-[60%] mt-10">
        <Button
          size="sm"
          className="rounded-[12px] py-5 px-3 cursor-pointer my-auto"
        >
          <h1 className="text-background">افزودن به صفحه</h1>
          <AddSVG />
        </Button>
        <div dir="ltr" className="flex justify-center my-auto">
          <div className="flex flex-wrap items-center gap-2">
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
      </div>
    </div>
  );
}
