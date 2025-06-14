"use client";
import ContainerDashboard from "@/components/common/dashboard/ContainerDashboard";
import FilterModal from "@/components/common/dashboard/FilterModal";
import Line from "@/components/common/dashboard/line";
import ModalStep2 from "@/components/common/dashboard/modalStep2";
import TableDashboard from "@/components/common/dashboard/Table";
import Title from "@/components/common/dashboard/Title";
import DeleteSVG from "@/components/dashboard/svg/DeleteSVG";
import EditSVG from "@/components/dashboard/svg/EditSVG";
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
    startDate: "۱۴۰۴/۰۲/۱۰",
    endDate: "۱۴۰۴/۰۲/۱۵",
    score: "۴ از ۵",
    reservations: 5,
  },
  {
    id: 2,
    name: "تور کوه‌نوردی دماوند",
    price: "۱۲٬۰۰۰٬۰۰۰",
    startDate: "۱۴۰۴/۰۳/۰۵",
    endDate: "۱۴۰۴/۰۳/۱۰",
    score: "۴.۵ از ۵",
    reservations: 8,
  },
  {
    id: 3,
    name: "تور جنگل‌های هیرکانی",
    price: "۶٬۵۰۰٬۰۰۰",
    startDate: "۱۴۰۴/۰۳/۱۰",
    endDate: "۱۴۰۴/۰۳/۱۲",
    score: "۳.۸ از ۵",
    reservations: 3,
  },
  {
    id: 4,
    name: "تور کویر مرنجاب",
    price: "۵٬۰۰۰٬۰۰۰",
    startDate: "۱۴۰۵/۰۵/۱۸",
    endDate: "۱۴۰۵/۰۵/۲۰",
    score: "۴.۲ از ۵",
    reservations: 9,
  },
  {
    id: 5,
    name: "تور دریاچه ارومیه",
    price: "۹٬۰۰۰٬۰۰۰",
    startDate: "۱۴۰۴/۰۶/۲۰",
    endDate: "۱۴۰۴/۰۶/۲۲",
    score: "۴ از ۵",
    reservations: 4,
  },
];

export const tableHeaderItems = (t: any) => [
  { text: t("tableHeaders.tourName"), clx: "rounded-r-xl text-center w-73" },
  { text: t("tableHeaders.tourCost"), clx: "text-center" },
  { text: t("tableHeaders.date"), clx: "text-center" },
  { text: t("tableHeaders.score"), clx: "text-center" },
  { text: t("tableHeaders.participants"), clx: "text-center" },
  { text: t("tableHeaders.empty"), clx: "rounded-l-xl text-center" },
];

export default function SellerTourManagement() {
  const t = useTranslations("SellerToursList");
  const [openPopoverId, setOpenPopoverId] = useState<number | null>(null);

  return (
    <ContainerDashboard>
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
        <Link href="/dashboard/seller/Tour/add">
          <Button className="bg-primary text-white">{t("addTour")} +</Button>
        </Link>
      </div>

      {/* Table view for desktop */}
      <div className="hidden md:block">
        <TableDashboard
          href={"/dashboard/seller/Tour/add"}
          add={true}
          addTitle={t("addTour")}
          headerSecondary={true}
          tableHeader={tableHeaderItems(t)}
          tableContent={properties.map((property) => (
            <tr key={property.id} className="bg-table-main/30 rounded-xl">
              <td className="pl-6 rounded-r-xl">
                <div className="flex gap-2 w-73">
                  <div className="bg-text-secondary/30 w-27 h-20 m-0.5 rounded-[12px]" />
                  <div className="py-7  text-[18px] font-medium">
                    {property.name}
                  </div>
                </div>
              </td>

              <td className="px-6 py-7 text-center  text-[18px] font-medium">
                {property.price}
              </td>
              <td className="px-6 py-7">
                <div className="flex justify-center gap-1">
                  <h1 className=" text-[18px] font-medium">
                    {property.startDate}
                  </h1>
                  <span>/</span>
                  <h1 className=" text-[18px] font-medium">
                    {property.endDate}
                  </h1>
                </div>
              </td>
              <td className="px-6 py-7 text-center  text-[18px] font-medium">
                {property.score}
              </td>
              <td className="px-6 py-7 text-center  text-[18px] font-medium">
                {property.reservations}
              </td>
              <td className="px-6 py-2 relative rounded-l-xl text-center">
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="text-xl font-bold cursor-pointer">
                      ...
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="text-right w-32 p-2 bg-background px-1 border-border shadow-sm shadow-border rounded-[15px]">
                    <div className="space-y-2">
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
                          title={t("deleteConfirmation")}
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
          <Card
            dir="rtl"
            key={property.id}
            className="overflow-hidden border-border"
          >
            <CardContent className="p-4">
              {/* Tour image and name */}
              <div className="flex gap-3 mb-3">
                <div className="bg-text-secondary/30 w-24 h-24 rounded-[12px] flex-shrink-0" />
                <div className="flex flex-col justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-right">
                      {property.name}
                    </h2>
                    <p className="text-right text-primary font-medium">
                      {property.price}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-600">
                      {property.score}
                    </span>
                    <span className="mx-1">•</span>
                    <span className="text-sm text-gray-600">
                      {property.reservations}
                    </span>
                  </div>
                </div>
              </div>

              {/* Tour dates */}
              <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg mb-3">
                <p className="text-sm text-gray-500 text-right mb-1">
                  {t("tableHeaders.date")}:
                </p>
                <div className="flex gap-1 font-medium">
                  <span>{property.endDate}</span>
                  <span>-</span>
                  <span>{property.startDate}</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex justify-between pt-2 border-t border-border mt-2">
                <div className="flex gap-2">
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
                </div>
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
                        <h1>{t("edit")}</h1>
                        <div className="my-auto">
                          <EditSVG />
                        </div>
                      </div>
                      <div className="w-full flex justify-end gap-2 cursor-pointer hover:bg-border rounded-[10px] px-1">
                        <ModalStep2
                          name={t("delete")}
                          desc={t("deleteWarning")}
                          title={t("deleteConfirmation")}
                          button={t("delete")}
                        />
                        <div className="my-auto">
                          <DeleteSVG />
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </ContainerDashboard>
  );
}
