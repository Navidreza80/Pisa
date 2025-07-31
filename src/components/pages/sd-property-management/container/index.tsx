"use client";
import NoImage from "@/assets/images/no.jpg";
import ContainerDashboard from "@/components/common/dashboard/ContainerDashboard";
import Line from "@/components/common/dashboard/line";
import ModalStep2 from "@/components/common/dashboard/modalStep2";
import TableDashboard from "@/components/common/dashboard/Table";
import Title from "@/components/common/dashboard/Title";
import InputSelect from "@/components/common/inputs/select-input";
import Modal from "@/components/common/modal/modal";
import FilterModal from "@/components/dashboard/filter-modal";
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
import { TFunction } from "@/types";
import { HouseItemsInterface } from "@/types/house";
import formatToPersianDate from "@/utils/helper/format-date";
import { formatNumber } from "@/utils/helper/format-number";
import { getTransactionType } from "@/utils/helper/GetTransactionType";
import { deleteHouse } from "@/utils/service/house/delete";
import { putHouse } from "@/utils/service/house/put";
import { useMutation } from "@tanstack/react-query";
import { Camera, NotepadText } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import AddPropertyStepFour from "../../sd-property-create/contents/StepFour";
import EditHouse from "../content/EditHouse";
import PopoverItem from "../content/PopoverItem";
import ViewDocuments from "../content/ViewDocuments";

export const tableHeaderItems = (t: TFunction) => [
  { text: t("tableHeaders.propertyName"), clx: "rounded-r-xl" },
  { text: t("createdAt"), clx: null },
  { text: t("transactionType"), clx: null },
  { text: t("tableHeaders.price"), clx: null },
  { text: t("tableHeaders.rating"), clx: null },
  { text: t("tableHeaders.empty"), clx: "rounded-l-xl" },
];

const sortItems = [
  { text: "قیمت", value: "price" },
  { text: "تاریخ ساخت", value: "createdAt" },
];

const orderItems = [
  { text: "صعودی", value: "ASC" },
  { text: "نزولی", value: "DESC" },
];

export default function SellerDashboardProperties({
  houses,
  totalCount,
}: {
  houses: HouseItemsInterface[];
  totalCount: number;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const sort = searchParams.get("sort");
  const order = searchParams.get("");
  const search = searchParams.get("search");
  const t = useTranslations("SellerPropertyList");
  const handleSetParam = (key: string, value: string | number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value.toString());
    router.push(`?${params.toString()}`);
  };

  const { mutate: handleEdit } = useMutation({
    mutationKey: ["EDIT_HOUSE"],
    mutationFn: (payload: { data: HouseItemsInterface; id: string }) =>
      toast.promise(() => putHouse(payload.data, payload.id), {
        error: t("editError"),
        success: t("editSuccess"),
        pending: t("editLoading"),
      }),
    onSuccess: () => router.refresh(),
  });
  const { mutate: handleDelete } = useMutation({
    mutationKey: ["DELETE_HOUSE"],
    mutationFn: (id: string) =>
      toast.promise(() => deleteHouse(id), {
        error: t("deleteError"),
        success: t("deleteSuccess"),
        pending: t("deleteLoading"),
      }),
    onSuccess: () => router.refresh(),
  });

  return (
    <ContainerDashboard>
      {/* Header: Filter & Search */}
      <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-0">
        <Title text={t("title")} />
        <div className="flex gap-[19px] flex-wrap justify-between">
          <Input
            defaultValue={search || ""}
            onChange={(e) => {
              setTimeout(() => {
                handleSetParam("search", e.target.value);
              }, 1000);
            }}
            placeholder={t("searchPlaceholder")}
            className="h-12 placeholder:text-text-secondary placeholder:text-[16px] border-border border-[2px] px-5 rounded-2xl flex-1 md:w-100"
          />
          <FilterModal>
            <InputSelect
              className="!w-full"
              withLabel
              onChange={(val) => handleSetParam("sort", val)}
              label="مرتب سازی"
              items={sortItems}
              defaultValue={sort || "price"}
            />
            <InputSelect
              className="!w-full"
              defaultValue={order || "ASC"}
              withLabel
              onChange={(val) => handleSetParam("order", val)}
              label="روند"
              items={orderItems}
            />
          </FilterModal>
        </div>
      </div>
      <Line />

      {/* Table view for desktop */}
      <TableDashboard
        add={true}
        card={
          <div className="grid grid-cols-1 gap-4 mt-4 w-full">
            {houses.map((property) => (
              <Card
                key={property.id}
                className="overflow-hidden shadow-none border-border"
              >
                <CardContent className="p-2">
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
                    src={
                      property.photos !== null ? property.photos[0] : NoImage
                    }
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
                      <p className="font-medium">
                        {formatNumber(Number(property.price))}
                      </p>
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
                  <div className="flex gap-2 pt-3 border-t border-border mt-3">
                    <ModalStep2
                      onConfirm={() => handleDelete(property.id)}
                      trigger={
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-500 border-red-200 cursor-pointer"
                        >
                          {t("delete")}
                        </Button>
                      }
                      desc={t("deleteWarning")}
                      title={t("deleteConfirm")}
                      button={t("delete")}
                    />
                    {/* Edit House */}
                    <EditHouse
                      trigger={
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-primary border-primary/80 cursor-pointer"
                        >
                          {t("edit")}
                        </Button>
                      }
                      house={property}
                      onSubmit={(data) =>
                        handleEdit({ data: data, id: property.id })
                      }
                    />
                    {/* Add Photo */}
                    <Modal
                      trigger={
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-primary border-primary/80 cursor-pointer"
                        >
                          افزودن عکس
                        </Button>
                      }
                    >
                      <AddPropertyStepFour
                        refresh={router.refresh}
                        houseId={property.id}
                      />
                    </Modal>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        }
        currentPage={Number(page) || 1}
        totalCount={totalCount}
        pageSize={5}
        onPageChange={(page) => handleSetParam("page", page.toString())}
        href={"/dashboard/seller/properties/add"}
        addTitle={t("addProperty")}
        headerSecondary={true}
        tableHeader={tableHeaderItems(t)}
        tableContent={houses.map((property) => (
          // Table content
          <tr key={property.id} className="bg-table-main/30 rounded-xl">
            <td className="pl-6 rounded-r-xl">
              <div className="flex gap-2 ">
                <Image
                  width={200}
                  height={200}
                  unoptimized
                  alt="image"
                  src={property.photos !== null ? property.photos[0] : NoImage}
                  className="bg-text-secondary/30 w-27 h-20 m-0.5 rounded-[12px]"
                />
                <div className="py-7 text-[18px] font-medium truncate overflow-hidden whitespace-nowrap w-[100px]">
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
              {/* Popover */}
              <Popover>
                <PopoverTrigger asChild>
                  <button className="text-xl font-bold cursor-pointer">
                    ...
                  </button>
                </PopoverTrigger>
                <PopoverContent className="p-2 bg-background px-1 border-border shadow-sm shadow-border rounded-[15px] !w-auto">
                  <div className="flex flex-col gap-y-2">
                    {/* Edit House */}
                    <EditHouse
                      trigger={
                        <PopoverItem icon={<EditSVG />} title="ویرایش ملک" />
                      }
                      house={property}
                      onSubmit={(data) =>
                        handleEdit({ data: data, id: property.id })
                      }
                    />

                    {/* View Documents */}
                    <Modal
                      className="min-w-[70vw]"
                      title="مدارک املاک"
                      trigger={
                        <PopoverItem
                          icon={<NotepadText />}
                          title="مشاهده مدارک"
                        />
                      }
                    >
                      <ViewDocuments
                        houseTitle={property.title}
                        houseId={property.id}
                      />
                    </Modal>

                    {/* Add Photo */}
                    <Modal
                      trigger={
                        <PopoverItem icon={<Camera />} title="افزودن عکس" />
                      }
                    >
                      <AddPropertyStepFour
                        refresh={router.refresh}
                        houseId={property.id}
                      />
                    </Modal>

                    {/* Delete House */}
                    <div className="w-full flex gap-[15px] cursor-pointer hover:bg-border rounded-xl px-1">
                      <ModalStep2
                        onConfirm={() => handleDelete(property.id)}
                        trigger={
                          <PopoverItem icon={<DeleteSVG />} title="حذف ملک" />
                        }
                        desc={t("deleteWarning")}
                        title={t("deleteConfirm")}
                        button={t("delete")}
                      />
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </td>
          </tr>
        ))}
      />
    </ContainerDashboard>
  );
}
