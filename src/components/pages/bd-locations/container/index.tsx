"use client";
import Line from "@/components/common/dashboard/line";
import ModalStep2 from "@/components/common/dashboard/modalStep2";
import FilterModal from "@/components/common/dashboard/FilterModal";
import DeleteSVG from "@/components/dashboard/svg/DeleteSVG";
import EditSVG from "@/components/dashboard/svg/EditSVG";
import TableDashboard from "@/components/common/dashboard/Table";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Title from "@/components/common/dashboard/Title";

const destinations = [
  {
    id: 1,
    name: "اصفهان",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPdTW8bpxoiuEvkxOi9NoD5jgyyAgO0lLd1w&s",
    description: "شهری تاریخی با معماری اسلامی فوق‌العاده",
    province: "اصفهان",
    status: "approved",
  },
  {
    id: 2,
    name: "چالوس",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPdTW8bpxoiuEvkxOi9NoD5jgyyAgO0lLd1w&s",
    description: "مقصدی خوش‌آب‌وهوا در شمال کشور",
    province: "مازندران",
    status: "pending",
  },
  {
    id: 3,
    name: "شیراز",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPdTW8bpxoiuEvkxOi9NoD5jgyyAgO0lLd1w&s",
    description: "شهری شاعرانه و مملو از باغ و بناهای باستانی",
    province: "فارس",
    status: "rejected",
  },
];

export default function BuyerLocations() {
  const t = useTranslations("DestinationsList");
  const [provinceFilter, setProvinceFilter] = useState("all");
  const [openPopoverId, setOpenPopoverId] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<"table" | "card">("table");

  const tableHeaderItems = [
    { text: t("tableHeaders.city"), clx: "rounded-r-xl" },
    { text: t("tableHeaders.description"), clx: null },
    { text: t("tableHeaders.status"), clx: null },
    { text: t("tableHeaders.empty"), clx: "rounded-l-xl" },
  ];

  // Function to determine view mode based on screen size
  const handleResize = () => {
    if (typeof window !== "undefined") {
      setViewMode(window.innerWidth < 768 ? "card" : "table");
    }
  };

  // Set initial view mode and add resize listener
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filteredDestinations = destinations.filter((d) => {
    return provinceFilter === "all" || d.province === provinceFilter;
  });

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-500 text-white";
      case "rejected":
        return "bg-red-500 text-white";
      case "pending":
        return "bg-yellow-400 text-black";
      default:
        return "";
    }
  };

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
        <Link href="/dashboard/seller/locations/add">
          <Button className="bg-primary text-white">{t("addButton")}</Button>
        </Link>
      </div>

      {/* Table view for desktop */}
      <div className="hidden md:block">
        <TableDashboard
          add={true}
          href={"/dashboard/seller/locations/add"}
          addTitle={t("addButton")}
          tableHeader={tableHeaderItems}
          tableContent={filteredDestinations.map((locations) => (
            <tr
              key={locations.id}
              className="bg-background hover:bg-background/30 rounded-xl overflow-hidden"
            >
              <td className="pl-6 rounded-r-xl">
                <div className="flex gap-2">
                  <div className="bg-text-secondary/30 w-27 h-20 m-0.5 overflow-hidden rounded-[12px]">
                    <Image
                      className="w-27 h-20"
                      width={108}
                      height={80}
                      src={locations.image}
                      alt=""
                    />
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
                  {t(`status.${locations.status}`)}
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
                  <PopoverContent className="text-right w-32 p-2 bg-background px-1 border-border">
                    <div className="space-y-2">
                      <div className="w-full flex justify-end gap-2 cursor-pointer hover:bg-border rounded-[10px] px-1">
                        <h1>{t("actions.edit")}</h1>
                        <div className="my-auto">
                          <EditSVG />
                        </div>
                      </div>
                      <div className="w-full flex justify-end gap-2 cursor-pointer hover:bg-border rounded-[10px] px-1">
                        <ModalStep2
                          name={t("actions.delete")}
                          desc={t("deleteModal.description")}
                          title={t("deleteModal.title")}
                          button={t("actions.delete")}
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
        {filteredDestinations.map((location) => (
          <Card key={location.id} className="overflow-hidden border-border">
            <CardContent className="p-0">
              <div className="relative">
                <Image
                  src={location.image}
                  alt={location.name}
                  width={400}
                  height={150}
                  className="w-full h-[150px] object-cover"
                />
                <div className="absolute top-2 left-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${getStatusStyle(
                      location.status
                    )}`}
                  >
                    {t(`status.${location.status}`)}
                  </span>
                </div>
              </div>

              <div className="p-4 space-y-3">
                {/* Header with location name and actions */}
                <div className="flex justify-end items-start">
                  <h2 className="text-lg font-bold text-right">
                    {location.name}
                  </h2>
                </div>

                {/* Location details */}
                <div className="text-right">
                  <p>{location.description}</p>
                  <p className="text-text-secondary mt-2">
                    {t("provinceLabel")}: {location.province}
                  </p>
                </div>

                {/* Action buttons */}
                <div className="flex justify-end gap-2 pt-2 border-t border-border mt-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-500 border-red-200"
                  >
                    {t("actions.delete")}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-primary text-primary"
                  >
                    {t("actions.edit")}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
