"use client";
import ContainerDashboard from "@/components/common/dashboard/ContainerDashboard";
import Line from "@/components/common/dashboard/line";
import TableDashboard from "@/components/common/dashboard/Table";
import Title from "@/components/common/dashboard/Title";
import InputSelect from "@/components/common/inputs/select-input";
import Modal from "@/components/common/modal/modal";
import FilterModal from "@/components/dashboard/filter-modal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Comments } from "@/types/comments";
import formatToPersianDate from "@/utils/helper/format-date";
import { Eye, Star } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import PopoverItem from "../../sd-property-management/content/PopoverItem";
import ViewComment from "../content/ViewComment";
import ViewReplies from "../content/ViewReplies";

export const tableHeaderItems = [
  { text: "عنوان", clx: "rounded-r-xl" },
  { text: "امتیاز", clx: null },
  { text: "تاریخ", clx: null },
  { text: "عملیات", clx: "rounded-l-xl" },
];

const sortItems = [
  { text: "امتیاز", value: "rating" },
  { text: "تاریخ ساخت", value: "created_at" },
  { text: "تاریخ آپدیت", value: "updated_at" },
];

const orderItems = [
  { text: "صعودی", value: "ASC" },
  { text: "نزولی", value: "DESC" },
];

const ratingItems = [
  { text: "1 ستاره", value: "1" },
  { text: "2 ستاره", value: "2" },
  { text: "3 ستاره", value: "3" },
  { text: "4 ستاره", value: "4" },
  { text: "5 ستاره", value: "5" },
];

export default function SellerDashboardComments({
  comments,
}: {
  comments: Comments[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sort = searchParams.get("sort");
  const rating = searchParams.get("rating");
  const order = searchParams.get("order");

  const handleSetParam = (key: string, value: string | number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <ContainerDashboard>
      {/* Header: Filter & Search */}
      <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-0">
        <Title text={"مدیریت نظرات"} />
        <div className="flex gap-[19px] flex-wrap justify-between">
          <FilterModal>
            <InputSelect
              className="!w-full"
              withLabel
              onChange={(val) => handleSetParam("sort", val)}
              label="مرتب سازی"
              items={sortItems}
              defaultValue={sort || "created_at"}
            />
            <InputSelect
              className="!w-full"
              defaultValue={order || "ASC"}
              withLabel
              onChange={(val) => handleSetParam("order", val)}
              label="روند"
              items={orderItems}
            />
            <InputSelect
              className="!w-full"
              defaultValue={rating || ""}
              withLabel
              onChange={(val) => handleSetParam("rating", val)}
              label="امتیاز"
              items={ratingItems}
            />
          </FilterModal>
        </div>
      </div>
      <Line />

      {/* Table view for desktop */}
      <TableDashboard
        card={
          <div className="grid grid-cols-1 gap-4 mt-4 w-full">
            {comments.map((comment: Comments) => (
              <Card
                key={comment.id}
                className="rounded-xl border-border shadow-sm hover:shadow-md transition-shadow"
              >
                <CardContent className="p-4">
                  <div className="flex flex-col gap-3">
                    {/* Header with title and actions */}
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-semibold line-clamp-1 text-ellipsis">
                        {comment.title}
                      </h3>
                    </div>

                    {/* Rating and Date */}
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1 bg-amber-50 text-amber-700 px-2 py-1 rounded-full">
                        <Star
                          size={14}
                          className="fill-amber-500 text-amber-500"
                        />
                        <span>{comment.rating} ستاره</span>
                      </div>
                      <span className="text-muted-foreground">
                        {formatToPersianDate(comment.created_at)}
                      </span>
                    </div>
                    <Modal
                      trigger={
                        <Button className="lg:w-full w-[90vw] text-surface">
                          مشاهده نظر
                        </Button>
                      }
                    >
                      <ViewComment comment={comment} />
                    </Modal>
                    <Modal
                      className="lg:w-[50vw] w-[90vw] overflow-y-scroll h-[80vh]"
                      trigger={
                        <Button className="w-full text-surface">
                          مشاهده پاسخ ها
                        </Button>
                      }
                    >
                      <ViewReplies commentId={comment.id} />
                    </Modal>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        }
        headerSecondary={true}
        tableHeader={tableHeaderItems}
        tableContent={comments.map((comment) => (
          // Table content
          <tr key={comment.id} className="rounded-xl">
            <td className="pl-6 rounded-r-xl">
              <div className="p-2 text-[18px] font-medium truncate overflow-hidden whitespace-nowrap max-w-full">
                {comment.title}
              </div>
            </td>
            <td className="text-lg">{comment.rating} ستاره</td>
            <td className="text-lg">
              {formatToPersianDate(comment.created_at)}
            </td>
            <td className="px-6 py-2  text-[18px] font-medium">
              {/* Popover */}
              <Popover>
                <PopoverTrigger asChild>
                  <button className="text-xl font-bold cursor-pointer">
                    ...
                  </button>
                </PopoverTrigger>
                <PopoverContent className="p-2 bg-background px-1 border-border shadow-sm shadow-border rounded-[15px] !w-auto">
                  <div className="flex flex-col gap-y-2">
                    {/* View Comment */}
                    <Modal
                      className="lg:w-[50vw] w-[90vw]"
                      trigger={
                        <PopoverItem icon={<Eye />} title="مشاهده نظر" />
                      }
                    >
                      <ViewComment comment={comment} />
                    </Modal>
                    <Modal
                      className="lg:w-[50vw] w-[90vw] overflow-y-scroll h-[80vh]"
                      trigger={
                        <PopoverItem icon={<Eye />} title="مشاهده پاسخ ها" />
                      }
                    >
                      <ViewReplies commentId={comment.id} />
                    </Modal>
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
