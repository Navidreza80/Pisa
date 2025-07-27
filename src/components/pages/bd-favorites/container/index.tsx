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
import Link from "next/link";
import Image from "next/image";
import NoImage from "@/assets/images/no.jpg";
import { formatNumber } from "@/utils/helper/format-number";

export default function BuyerFavorites({ favorites }) {
  const t = useTranslations("Favorites");
  const [openPopoverId, setOpenPopoverId] = useState<number | null>(null);

  const tableHeaderItems = [
    { text: t("tableHeaders.hotel"), clx: "rtl:rounded-r-xl ltr:rounded-l-xl" },
    { text: t("tableHeaders.price"), clx: null },
    { text: t("tableHeaders.address"), clx: null },
    {
      text: t("tableHeaders.empty"),
      clx: "text-transparent rtl:rounded-l-xl ltr:rounded-r-xl",
    },
  ];

  return (
    <ContainerDashboard>
      <div className="flex items-center justify-between flex-row flex-wrap gap-4">
        <Title text={t("title")} />
        <div className="flex gap-[19px] flex-wrap">
          <Input
            placeholder={t("searchPlaceholder")}
            className="h-12 flex-1 placeholder:text-text-secondary placeholder:text-[16px] border-border border-[2px] px-5 rounded-2xl"
          />
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
        </div>
      </div>

      <Line />

      {/* Table view for larger screens */}
      <TableDashboard
        card={
          <div className="md:hidden grid grid-cols-1 gap-4 mt-4">
            {favorites.map((favorite) => (
              <div
                key={favorite.id}
                className="bg-surface rounded-2xl border border-border p-4"
              >
                <div className="flex items-start">
                  <h2 className="text-lg font-bold ">{favorite.house.title}</h2>
                </div>

                <div className="mt-3 space-y-2 ">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{favorite.house.price}</span>
                    <span>{t("priceLabel")}</span>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-text-secondary">
                      {t("addressLabel")}
                    </span>
                    <p className="">{favorite.house.address}</p>
                  </div>

                  <div className="flex gap-2 pt-2">
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
        }
        headerSecondary={true}
        tableContent={favorites.map((favorite) => (
          <tr key={favorite.id} className=" border-b hover:bg-background/30">
            <td className="py-2 px-4 text-[18px] font-medium flex items-center gap-2">
              <Image
                src={
                  favorite.house.photos !== null
                    ? favorite.house.photos[0]
                    : NoImage
                }
                unoptimized
                width={107}
                className="w-[107px] h-[77px] rounded-xl"
                height={72}
                alt={favorite.house.title}
              />
              {favorite.house.title}
            </td>
            <td className="py-2 px-4 text-[18px] font-medium">
              {formatNumber(favorite.house.price)}
            </td>
            <td className="py-2 px-4 text-[18px] font-medium">
              {favorite.house.address}
            </td>
            <td className="py-2 px-4 ">
              <Popover
                open={openPopoverId === favorite.id}
                onOpenChange={(open) =>
                  setOpenPopoverId(open ? favorite.id : null)
                }
              >
                <PopoverTrigger asChild>
                  <div className="text-2xl font-bold cursor-pointer">...</div>
                </PopoverTrigger>
                <PopoverContent className=" w-32 p-1 bg-background px-1 border-border shadow-sm shadow-border">
                  <div>
                    <Link
                      href={`/property-detail/${favorite.house_id}`}
                      className="w-full flex justify-end gap-2 cursor-pointer hover:bg-border py-1 rounded-2xl px-1"
                    >
                      <h1>{t("actions.reserve")}</h1>
                      <div className="my-auto">
                        <CheckPopover />
                      </div>
                    </Link>
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
    </ContainerDashboard>
  );
}
