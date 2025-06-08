"use client";
import Line from "@/components/common/dashboard/line";
import ModalStep2 from "@/components/common/dashboard/modalStep2";
import FilterModal from "@/components/dashboard/filter-modal";
import CheckPopover from "@/components/dashboard/svg/CheckPopover";
import DeleteSVG from "@/components/dashboard/svg/DeleteSVG";
import EditSVG from "@/components/dashboard/svg/EditSVG";
import TableDashboard from "@/components/dashboard/table";
import Title from "@/components/dashboard/title";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState } from "react";

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

export const tableHeaderItems = (t) => [
  { text: t("tableHeaders.propertyName"), clx: "rounded-r-xl" },
  { text: t("tableHeaders.price"), clx: null },
  { text: t("tableHeaders.rating"), clx: null },
  { text: t("tableHeaders.visits"), clx: null },
  { text: t("tableHeaders.reservations"), clx: null },
  { text: t("tableHeaders.status"), clx: null },
  { text: t("tableHeaders.empty"), clx: "rounded-l-xl" },
];

export default function SellerDashboardProperties() {
  const t = useTranslations("SellerPropertyList");
  const [openPopoverId, setOpenPopoverId] = useState<number | null>(null);

  return (
    <div>
      <div className="flex flex-col md:flex-row-reverse justify-between gap-4 md:gap-0">
        <Title text={t("title")} />
        <div className="flex gap-[19px] flex-wrap justify-end">
          <FilterModal />
          <Input
            dir="rtl"
            placeholder={t("searchPlaceholder")}
            className="h-12 placeholder:text-text-secondary placeholder:text-[16px] border-border border-[2px] px-5 rounded-2xl w-full md:w-100"
          />
        </div>
      </div>
      <Line />

      {/* Add button for mobile view */}
      <div className="md:hidden flex justify-end mb-4">
        <Link href="/dashboard/seller/properties/add">
          <Button className="bg-primary text-white">
            {t("addProperty")} +
          </Button>
        </Link>
      </div>

      {/* Table view for desktop */}
      <div className="hidden md:block">
        <TableDashboard
          add={true}
          href={"/dashboard/seller/properties/add"}
          addTitle={t("addProperty")}
          headerSecondary={true}
          tableHeader={tableHeaderItems(t)}
          tableContent={properties.map((property) => (
            <tr key={property.id} className="bg-table-main/30 rounded-xl">
              <td className="pl-6 rounded-r-xl">
                <div className="flex gap-2 ">
                  <div className="bg-text-secondary/30 w-27 h-20 m-0.5 rounded-[12px]" />
                  <div className="py-7  text-[18px] font-medium">
                    {property.name}
                  </div>
                </div>
              </td>
              <td className="px-6 py-7  text-[18px] font-medium">
                {property.price}
              </td>
              <td className="px-6 py-7 text-[18px] font-medium">
                {property.score}
              </td>
              <td className="px-6 py-7 text-[18px] font-medium">
                {property.views} {t("times")}
              </td>
              <td className="px-6 py-7 text-[18px] font-medium">
                {property.reservations} {t("times")}
              </td>
              <td className="px-6 py-7">
                <span
                  className={`px-3 py-1 rounded-full  text-[13px] font-medium text-sm ${statusColor[property.status]}`}
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
                        <h1>{t("activate")}</h1>
                        <div className="my-auto">
                          <CheckPopover />
                        </div>
                      </div>
                      <div className="w-full flex justify-end gap-2 cursor-pointer hover:bg-border rounded-[10px] px-1">
                        <h1>{t("edit")}</h1>
                        <div className="my-auto">
                          <EditSVG />
                        </div>
                      </div>
                      <div className="w-full flex justify-end gap-2 cursor-pointer hover:bg-border rounded-[10px] px-1">
                        <ModalStep2
                          name={t("delete")}
                          desc={t("deleteWarning")}
                          title={t("deleteConfirm")}
                          button={t("delete")}
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

      {/* Card view for mobile */}
      <div className="md:hidden grid grid-cols-1 gap-4 mt-4">
        {properties.map((property) => (
          <Card key={property.id} className="overflow-hidden border-border">
            <CardContent className="p-4">
              {/* Header with property name and actions */}
              <div className="flex justify-between items-start mb-3">
                <Popover
                  open={openPopoverId === property.id}
                  onOpenChange={(open) =>
                    setOpenPopoverId(open ? property.id : null)
                  }
                >
                  <PopoverTrigger asChild>
                    <button className="text-xl font-bold cursor-pointer">
                      ...
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="text-right w-32 p-2 bg-background px-1 border-border shadow-sm shadow-border rounded-[15px]">
                    <div className="space-y-2">
                      <div className="w-full flex justify-end gap-2 cursor-pointer hover:bg-border rounded-[10px] px-1">
                        <h1>{t("activate")}</h1>
                        <div className="my-auto">
                          <CheckPopover />
                        </div>
                      </div>
                      <div className="w-full flex justify-end gap-2 cursor-pointer hover:bg-border rounded-[10px] px-1">
                        <h1>{t("edit")}</h1>
                        <div className="my-auto">
                          <EditSVG />
                        </div>
                      </div>
                      <div className="w-full flex justify-end gap-2 cursor-pointer hover:bg-border rounded-[10px] px-1">
                        <ModalStep2
                          name={t("delete")}
                          desc={t("deleteWarning")}
                          title={t("deleteConfirm")}
                          button={t("delete")}
                        />
                        <div className="my-auto">
                          <DeleteSVG />
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>

                <div className="flex flex-col items-end">
                  <h2 className="text-lg font-bold text-right">
                    {property.name}
                  </h2>
                  <span
                    className={`px-3 py-1 rounded-full text-xs mt-2 ${statusColor[property.status]}`}
                  >
                    {property.status}
                  </span>
                </div>
              </div>

              {/* Property image placeholder */}
              <div className="bg-text-secondary/30 w-full h-[120px] rounded-[12px] mb-3" />

              {/* Property details */}
              <div className="grid grid-cols-2 gap-3 text-right">
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">
                    {t("tableHeaders.price")}:
                  </p>
                  <p className="font-medium">{property.price}</p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-gray-500">
                    {t("tableHeaders.rating")}:
                  </p>
                  <p className="font-medium">{property.score}</p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-gray-500">
                    {t("tableHeaders.visits")}:
                  </p>
                  <p className="font-medium">
                    {property.views} {t("times")}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-gray-500">
                    {t("tableHeaders.reservations")}:
                  </p>
                  <p className="font-medium">
                    {property.reservations} {t("times")}
                  </p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex justify-end gap-2 pt-3 border-t border-border mt-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-500 border-red-200"
                >
                  {t("delete")}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-primary text-primary"
                >
                  {t("edit")}
                </Button>
                <Button size="sm" className="bg-primary text-white">
                  {t("activate")}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
