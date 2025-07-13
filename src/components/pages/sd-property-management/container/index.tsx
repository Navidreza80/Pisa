"use client";
import ContainerDashboard from "@/components/common/dashboard/ContainerDashboard";
import Line from "@/components/common/dashboard/line";
import ModalStep2 from "@/components/common/dashboard/modalStep2";
import TableDashboard from "@/components/common/dashboard/Table";
import Title from "@/components/common/dashboard/Title";
import FilterModal from "@/components/dashboard/filter-modal";
import DeleteSVG from "@/components/dashboard/svg/DeleteSVG";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import formatToPersianDate from "@/utils/helper/format-date";
import { formatNumber } from "@/utils/helper/format-number";
import { getTransactionType } from "@/utils/helper/GetTransactionType";
import { deleteHouse } from "@/utils/service/house/delete";
import { putHouse } from "@/utils/service/house/put";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import EditHouse from "../content/EditHouse";

export const tableHeaderItems = (t) => [
  { text: t("tableHeaders.propertyName"), clx: "rounded-r-xl" },
  { text: t("createdAt"), clx: null },
  { text: t("transactionType"), clx: null },
  { text: t("tableHeaders.price"), clx: null },
  { text: t("tableHeaders.rating"), clx: null },
  { text: t("tableHeaders.empty"), clx: "rounded-l-xl" },
];

export default function SellerDashboardProperties({ houses }) {
  const router = useRouter();
  const t = useTranslations("SellerPropertyList");

  const { mutate: handleEdit } = useMutation({
    mutationKey: ["EDIT_HOUSE"],
    mutationFn: (payload) =>
      toast.promise(() => putHouse(payload.data, payload.id), {
        error: t("editError"),
        success: t("editSuccess"),
        pending: t("editLoading"),
      }),
    onSuccess: () => router.refresh(),
  });
  const { mutate: handleDelete } = useMutation({
    mutationKey: ["DELETE_HOUSE"],
    mutationFn: (id) =>
      toast.promise(() => deleteHouse(id), {
        error: t("deleteError"),
        success: t("deleteSuccess"),
        pending: t("deleteLoading"),
      }),
    onSuccess: () => router.refresh(),
  });

  return (
    <ContainerDashboard>
      <div className="flex flex-col md:flex-row-reverse justify-between gap-4 md:gap-0">
        <div className="flex gap-[19px] flex-wrap justify-end">
          <FilterModal />
          <Input
            placeholder={t("searchPlaceholder")}
            className="h-12 placeholder:text-text-secondary placeholder:text-[16px] border-border border-[2px] px-5 rounded-2xl w-full md:w-100"
          />
        </div>
        <Title text={t("title")} />
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
          tableContent={houses.map((property) => (
            <tr key={property.id} className="bg-table-main/30 rounded-xl">
              <td className="pl-6 rounded-r-xl">
                <div className="flex gap-2 ">
                  <Image
                    width={200}
                    height={200}
                    unoptimized
                    alt="image"
                    src={property.photos[0]}
                    className="bg-text-secondary/30 w-27 h-20 m-0.5 rounded-[12px]"
                  />
                  <div className="py-7 text-[18px] font-medium truncate overflow-hidden whitespace-nowrap w-[200px]">
                    {property.title}
                  </div>
                </div>
              </td>
              <td className="font-bold">
                {formatToPersianDate(property.last_updated)}
              </td>
              <td className="text-lg">
                {getTransactionType(property.transaction_type)?.text}
              </td>
              <td className="px-6 py-7  text-[18px] font-medium">
                {property.price}
              </td>
              <td className="px-6 py-7 text-[18px] font-medium">
                {property.rating || t("noRate")}
              </td>
              <td className="px-6 py-2 relative rounded-l-xl">
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="text-xl font-bold cursor-pointer">
                      ...
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className=" w-32 p-2 bg-background px-1 border-border shadow-sm shadow-border rounded-[15px]">
                    <div className="space-y-2">
                      <EditHouse
                        house={property}
                        onSubmit={(data) =>
                          handleEdit({ data: data, id: property.id })
                        }
                      />

                      <div className="w-full flex justify-end gap-2 cursor-pointer hover:bg-border rounded-[10px] px-1">
                        <ModalStep2
                          onConfirm={() => handleDelete(property.id)}
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
        {houses.map((property) => (
          <Card key={property.id} className="overflow-hidden border-border">
            <CardContent className="p-4">
              {/* Header with property name and actions */}
              <div className="flex justify-between items-start mb-3 w-full">
                <div className="flex flex-col items-end w-full">
                  <h2 className="text-lg font-bold text-center w-full">
                    {property.title}
                  </h2>
                </div>
              </div>

              {/* Property image placeholder */}
              <Image
                alt="houseImage"
                unoptimized
                src={property.photos[0]}
                width={100}
                height={100}
                className="bg-text-secondary/30 w-full h-[120px] rounded-[12px] mb-3"
              />

              {/* Property details */}
              <div className="grid grid-cols-2 gap-3 ">
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">
                    {t("tableHeaders.price")}:
                  </p>
                  <p className="font-medium">{formatNumber(property.price)}</p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-gray-500">
                    {t("tableHeaders.rating")}:
                  </p>
                  <p className="font-medium">
                    {property.rating || "بدون امتیاز"}
                  </p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex justify-end gap-2 pt-3 border-t border-border mt-3">
                <Button
                  onClick={() => handleDelete(property.id)}
                  variant="outline"
                  size="sm"
                  className="text-red-500 border-red-200 cursor-pointer"
                >
                  {t("delete")}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </ContainerDashboard>
  );
}
