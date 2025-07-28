"use client";
import ContainerDashboard from "@/components/common/dashboard/ContainerDashboard";
import Line from "@/components/common/dashboard/line";
import TableDashboard from "@/components/common/dashboard/Table";
import Title from "@/components/common/dashboard/Title";
import InputSelect from "@/components/common/inputs/select-input";
import FilterModal from "@/components/dashboard/filter-modal";
import CheckPopover from "@/components/dashboard/svg/CheckPopover";
import DeletePopover from "@/components/dashboard/svg/DeletePopover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { deleteWishlist } from "@/utils/service/whishlist/delete";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import PopoverItem from "../../sd-property-management/content/PopoverItem";

const sortItems = [{ text: "تاریخ ساخت", value: "createdAt" }];

const orderItems = [
  { text: "صعودی", value: "ASC" },
  { text: "نزولی", value: "DESC" },
];

export default function BuyerWishlists({ wishlists, totalCount }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const sort = searchParams.get("sort");
  const order = searchParams.get("order");
  const handleSetParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    router.push(`?${params.toString()}`);
  };

  const t = useTranslations("Favorites");

  const { mutate: handleDelete } = useMutation({
    mutationKey: ["DELETE_WISHLIST"],
    mutationFn: (houseId: string) =>
      toast.promise(deleteWishlist(houseId), {
        pending: "درحال حذف...",
        success: "ملک با موفقیت از لیست حذف شد",
        error: "خطا در حذف",
      }),
    onSuccess: () => {
      router.refresh();
    },
  });

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
            className="h-12 placeholder:text-text-secondary placeholder:text-[16px] border-border border-[2px] px-5 rounded-2xl md:w-100 flex-1"
          />
          <FilterModal>
            <InputSelect
              withLabel
              defaultValue={sort || "createdAt"}
              items={sortItems}
              className="!w-full"
              label={"مرتب سازی بر اساس:"}
              onChange={(val) => handleSetParam("sort", val.toString())}
            />
            <InputSelect
              withLabel
              defaultValue={order || "DESC"}
              onChange={(val) => handleSetParam("order", val.toString())}
              items={orderItems}
              className="!w-full"
              label={"روند"}
            />
          </FilterModal>
        </div>
      </div>

      <Line />

      {/* Table view for larger screens */}
      <TableDashboard
        pageSize={5}
        currentPage={Number(page) || 1}
        onPageChange={(page) => handleSetParam("page", page.toString())}
        totalCount={totalCount}
        headerSecondary={true}
        card={
          <div className="md:hidden grid grid-cols-1 gap-4 mt-4">
            {wishlists.map((wishlist) => (
              <div
                key={wishlist.id}
                className="bg-surface rounded-2xl border border-border p-4"
              >
                <div className="flex items-start">
                  <h2 className="text-lg font-bold ">{wishlist.house.title}</h2>
                </div>

                <div className="mt-3 space-y-2 ">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{wishlist.house.price}</span>
                    <span>{t("priceLabel")}</span>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-text-secondary">
                      {t("addressLabel")}
                    </span>
                    <p className="">{wishlist.house.address}</p>
                  </div>

                  <div className="flex gap-2 pt-2 flex-wrap">
                    <Button
                      onClick={() =>
                        router.push(`/property-detail/${wishlist.houseId}`)
                      }
                      variant="outline"
                      size="sm"
                      className="border-primary text-primary cursor-pointer flex-1"
                    >
                      {t("actions.reserve")}
                    </Button>
                    <Button
                      onClick={() => handleDelete(wishlist.id)}
                      variant="outline"
                      size="sm"
                      className="border-red-200 text-red-500 cursor-pointer flex-1"
                    >
                      {t("actions.delete")}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        }
        tableContent={wishlists.map((wishlist) => (
          <tr key={wishlist.id} className=" border-b hover:bg-background/30">
            <td className="py-2 px-4 text-[18px] font-medium">
              {wishlist.house.title}
            </td>
            <td className="py-2 px-4 text-[18px] font-medium">
              {wishlist.house.price}
            </td>
            <td className="py-2 px-4 text-[18px] font-medium">
              {wishlist.house.address}
            </td>
            <td className="py-2 px-4 ">
              <Popover>
                <PopoverTrigger asChild>
                  <div className="text-2xl font-bold cursor-pointer">...</div>
                </PopoverTrigger>
                <PopoverContent className=" w-32 p-1 bg-background px-1 border-border shadow-sm shadow-border">
                  <PopoverItem
                    icon={<CheckPopover />}
                    handleClick={() =>
                      router.push(`/property-detail/${wishlist.house_id}`)
                    }
                    title={t("actions.reserve")}
                  />
                  <PopoverItem
                    icon={<DeletePopover />}
                    handleClick={() => handleDelete(wishlist.id)}
                    title={t("actions.delete")}
                  />
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
