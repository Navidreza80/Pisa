"use client";
import InputSelect from "@/components/dashboard/buyer/inputSelect";
import Line from "@/components/dashboard/buyer/line";
import ModalStep2 from "@/components/dashboard/buyer/modalStep2";
import FilterModal from "@/components/dashboard/filter-modal";
import DeleteSVG from "@/components/dashboard/svg/DeleteSVG";
import EditSVG from "@/components/dashboard/svg/EditSVG";
import TableDashboard from "@/components/dashboard/table";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import { useState } from "react";

const destinations = [
  {
    id: 1,
    name: "اصفهان",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPdTW8bpxoiuEvkxOi9NoD5jgyyAgO0lLd1w&s",
    description: "شهری تاریخی با معماری اسلامی فوق‌العاده",
    province: "اصفهان",
    status: "تایید شده",
  },
  {
    id: 2,
    name: "چالوس",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPdTW8bpxoiuEvkxOi9NoD5jgyyAgO0lLd1w&s",
    description: "مقصدی خوش‌آب‌وهوا در شمال کشور",
    province: "مازندران",
    status: "در حال بررسی",
  },
  {
    id: 3,
    name: "شیراز",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPdTW8bpxoiuEvkxOi9NoD5jgyyAgO0lLd1w&s",
    description: "شهری شاعرانه و مملو از باغ و بناهای باستانی",
    province: "فارس",
    status: "تایید نشده",
  },
];

const provinces = ["همه", "اصفهان", "مازندران", "فارس"];

const tableHeaderItems = [
  { text: "نام شهر", clx: "rounded-r-xl" },
  { text: "توضیحات", clx: null },
  { text: "وضعیت", clx: null },
  { text: "", clx: "rounded-l-xl" },
];

export default function DestinationsList() {
  const [provinceFilter, setProvinceFilter] = useState("همه");
  const [openPopoverId, setOpenPopoverId] = useState<number | null>(null);

  const filteredDestinations = destinations.filter((d) => {
    return provinceFilter === "همه" || d.province === provinceFilter;
  });

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "تایید شده":
        return "bg-green-500 text-white";
      case "تایید نشده":
        return "bg-red-500 text-white";
      case "در حال بررسی":
        return "bg-yellow-400 text-black";
      default:
        return "";
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-0">
        <h1 className="text-xl font-semibold my-auto order-1 md:order-2">
          لیست مقاصد دیدنی های من
        </h1>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 w-full md:w-auto order-2 md:order-1">
          <FilterModal />
          <Input
            dir="rtl"
            placeholder="نام تور مورد نظر ....."
            className="h-12 placeholder:text-text-secondary placeholder:text-[16px] border-border border-[2px] px-5 rounded-2xl w-full md:w-100"
          />
        </div>
      </div>
      <Line />

      <TableDashboard
      add={true}
        href={"/dashboard/seller/locations/add"}
        addTitle="مقصد دیدنی"
        tableHeader={tableHeaderItems}
        tableContent={filteredDestinations.map((locations) => (
          <tr
            key={locations.id}
            className="bg-background hover:bg-background/30 rounded-xl overflow-hidden"
          >
            <td className="pl-6 rounded-r-xl">
              <div className="flex gap-2">
                <div className="bg-text-secondary/30 w-27 h-20 m-0.5 overflow-hidden rounded-[12px]" >
                  <Image className="w-27 h-20" width={108} height={80} src={locations.image} alt=""/>
                </div>
                <div className="py-7  text-[18px] font-medium">
                  {locations.name}
                </div>
              </div>
            </td>
            <td className="p-2 text-[16px]">
              {locations.description.length > 20
                ? `${locations.description.substring(0, 20)}...`
                : locations.description}
            </td>
            <td className="p-2 text-[14px]">
              <span
                className={`px-3 py-1 rounded-full text-xs ${getStatusStyle(
                  locations.status
                )}`}
              >
                {locations.status}
              </span>
            </td>
            <td className="py-2 px-4 text-left rounded-l-xl">
              <Popover
                open={openPopoverId === locations.id}
                onOpenChange={(open) =>
                  setOpenPopoverId(open ? locations.id : null)
                }
              >
                <PopoverTrigger asChild>
                  <div className="text-2xl font-bold cursor-pointer">...</div>
                </PopoverTrigger>
                <PopoverContent className="text-right w-32 p-2 bg-background px-1 border-border shadow-sm shadow-border">
                  <div className="space-y-2">
                    <div className="w-full flex justify-end gap-2 cursor-pointer hover:bg-border rounded-[10px] px-1">
                      <h1>ویرایش</h1>
                      <div className="my-auto">
                        <EditSVG />
                      </div>
                    </div>
                    <div className="w-full flex justify-end gap-2 cursor-pointer hover:bg-border rounded-[10px] px-1">
                      <ModalStep2
                        name="حذف"
                        desc="امکان بازگشت پس از حذف وجود ندارد!"
                        title="آیا از حذف تور مطمئن هستید؟"
                        button="حذف"
                      />
                      <div className="my-auto">
                        <DeleteSVG />
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
  );
}
