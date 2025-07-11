"use client";
import InputSelect from "@/components/common/inputs/select-input";
import Line from "@/components/common/dashboard/line";
import FilterModal from "@/components/common/dashboard/FilterModal";
import CheckPopover from "@/components/dashboard/svg/CheckPopover";
import DeletePopover from "@/components/dashboard/svg/DeletePopover";
import TableDashboard from "@/components/common/dashboard/Table";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { useTranslations } from "next-intl";
import Title from "@/components/common/dashboard/Title";
import ContainerDashboard from "@/components/common/dashboard/ContainerDashboard";

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

export default function BuyerFavorites() {
  const t = useTranslations("Favorites");
  const [openPopoverId, setOpenPopoverId] = useState<number | null>(null);

  const tableHeaderItems = [
    { text: t("tableHeaders.hotel"), clx: "rounded-r-xl" },
    { text: t("tableHeaders.price"), clx: null },
    { text: t("tableHeaders.address"), clx: null },
    { text: t("tableHeaders.empty"), clx: "text-transparent rounded-l-xl" },
  ];

  return (
    <ContainerDashboard>
      <div className="flex items-center justify-between flex-row-reverse flex-wrap gap-4">
        <Title text={t("title")} />
        <div className="flex gap-[19px] flex-wrap justify-end">
          <FilterModal>
            <InputSelect
              withLabel
              label={t("filters.propertyType")}
              className="flex-grow"
            />
            <InputSelect
              withLabel
              label={t("filters.propertyType")}
              className="flex-grow"
            />
            <InputSelect
              withLabel
              label={t("filters.propertyType")}
              className="flex-grow"
            />
            <InputSelect
              withLabel
              label={t("filters.propertyType")}
              className="flex-grow"
            />
          </FilterModal>
          <Input
            dir="rtl"
            placeholder={t("searchPlaceholder")}
            className="h-12 placeholder:text-text-secondary placeholder:text-[16px] border-border border-[2px] px-5 rounded-2xl w-100"
          />
        </div>
      </div>

      <Line />

      {/* Table view for larger screens */}
      <div className="hidden md:block">
        <TableDashboard
          headerSecondary={true}
          tableContent={bookings.map((booking) => (
            <tr
              key={booking.id}
              className=" border-b hover:bg-background/30"
            >
              <td className="py-2 px-4 text-[18px] font-medium">
                {booking.hotel}
              </td>
              <td className="py-2 px-4 text-[18px] font-medium">
                {booking.price}
              </td>
              <td className="py-2 px-4 text-[18px] font-medium">
                {booking.address}
              </td>
              <td className="py-2 px-4 ">
                <Popover
                  open={openPopoverId === booking.id}
                  onOpenChange={(open) =>
                    setOpenPopoverId(open ? booking.id : null)
                  }
                >
                  <PopoverTrigger asChild>
                    <div className="text-2xl font-bold cursor-pointer">...</div>
                  </PopoverTrigger>
                  <PopoverContent className=" w-32 p-1 bg-background px-1 border-border shadow-sm shadow-border">
                    <div>
                      <div className="w-full flex justify-end gap-2 cursor-pointer hover:bg-border py-1 rounded-2xl px-1">
                        <h1>{t("actions.reserve")}</h1>
                        <div className="my-auto">
                          <CheckPopover />
                        </div>
                      </div>
                      <div className="w-full flex justify-end gap-2 cursor-pointer hover:bg-border py-1 rounded-2xl px-1">
                        <h1>{t("actions.delete")}</h1>
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
      </div>

      {/* Card view for mobile screens */}
      <div className="md:hidden grid grid-cols-1 gap-4 mt-4">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="bg-surface rounded-2xl border border-border p-4"
          >
            <div className="flex items-start justify-end">
              <h2 className="text-lg font-bold ">{booking.hotel}</h2>
            </div>

            <div className="mt-3 space-y-2 ">
              <div className="flex justify-end items-center gap-2">
                <span className="font-medium">{booking.price}</span>
                <span>{t("priceLabel")}</span>
              </div>

              <div className="flex flex-col items-end">
                <span className="text-text-secondary">{t("addressLabel")}</span>
                <p className="">{booking.address}</p>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button className="bg-primary text-white px-3 py-1 rounded-lg text-sm">
                  {t("actions.reserve")}
                </button>
                <button className="bg-red-50 text-red-500 border border-red-200 px-3 py-1 rounded-lg text-sm">
                  {t("actions.delete")}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </ContainerDashboard>
  );
}
