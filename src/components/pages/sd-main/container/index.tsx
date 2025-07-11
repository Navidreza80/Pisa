"use client";

import Line from "@/components/common/dashboard/line";
import { BookingCard } from "@/components/pages/sd-main/contents/DashboardCard";
import CanclePopover from "@/components/dashboard/svg/CanclePopover";
import CheckPopover from "@/components/dashboard/svg/CheckPopover";
import DeletePopover from "@/components/dashboard/svg/DeletePopover";
import DetailPopover from "@/components/dashboard/svg/DetailPopover";
import SellerReserveSVG from "@/components/dashboard/svg/SellerReserveSVG";
import ViewMoreSVG from "@/components/dashboard/svg/ViewMoreSVG";
import TableDashboard from "@/components/common/dashboard/Table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState } from "react";
import ContainerDashboard from "@/components/common/dashboard/ContainerDashboard";

const tableHeaderItems = (t) => [
  {
    text: t("tableHeaders.residenceName"),
    clx: "rounded-r-xl w-20 text-center",
  },
  { text: t("tableHeaders.bookingDate"), clx: null },
  { text: t("tableHeaders.price"), clx: null },
  { text: t("tableHeaders.status"), clx: null },
  { text: t("tableHeaders.empty"), clx: "rounded-l-xl" },
];

export default function SellerMainDashboard() {
  const t = useTranslations("BookingListSellerDashboard");
  const [openPopoverId, setOpenPopoverId] = useState<number | null>(null);

  const bookings = [
    {
      id: 1,
      hotel: t("mockData.hotelName"),
      date: t("mockData.bookingDate"),
      total: t("mockData.totalPrice", { price: "1,800,000" }),
      status: t("status.approved"),
    },
    {
      id: 2,
      hotel: t("mockData.hotelName"),
      date: t("mockData.bookingDate"),
      total: t("mockData.totalPrice", { price: "1,800,000" }),
      status: t("status.approved"),
    },
    {
      id: 3,
      hotel: t("mockData.hotelName"),
      date: t("mockData.bookingDate"),
      total: t("mockData.totalPrice", { price: "1,800,000" }),
      status: t("status.approved"),
    },
  ];

  const handleActionClick = (action, id) => {
    console.log(`Action ${action} on booking ${id}`);
  };

  return (
    <ContainerDashboard>
      <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-0 animate-fade-up">
        <Link
          href={"/dashboard/seller/reservations"}
          className="flex gap-1.5 py-2 w-full"
        >
          <div className="my-auto">
            <ViewMoreSVG />
          </div>
          <p className="font-medium text-text-secondary my-auto">
            {t("actions.view")}
          </p>
        </Link>
        <div className="flex gap-1.5 w-90 rtl">
          <h1 className="text-xl font-semibold my-auto order-1 md:order-2">
            {t("pageTitle")}
          </h1>
          <div className="my-auto">
            <SellerReserveSVG />
          </div>
        </div>
      </div>
      <Line />
      {/* Mobile view - Cards */}
      <div className="md:hidden mt-4">
        {bookings.map((booking) => (
          <BookingCard
            key={booking.id}
            booking={booking}
            t={t}
            onActionClick={handleActionClick}
          />
        ))}
      </div>
      {/* Desktop view - Table */}
      <div className="hidden md:block animate-fade-up">
        <TableDashboard
          headerSecondary={true}
          tableHeader={tableHeaderItems(t)}
          tableContent={bookings.map((booking) => (
            <tr
              key={booking.id}
              className="font-yekan font-semibold border-b hover:bg-table-header/50 cursor-pointer"
            >
              <td className="pl-6 rounded-r-xl">
                <div className="flex gap-2 w-90">
                  <div className="bg-text-secondary/30 w-27 h-20 m-0.5 rounded-[12px]" />
                  <div className="py-7 text-[18px] font-medium">
                    {booking.hotel}
                  </div>
                </div>
              </td>
              <td className="py-2 px-4 text-[18px] font-medium">
                {booking.date}
              </td>
              <td className="py-2 px-4 text-[18px] font-medium">
                {booking.total}
              </td>
              <td className="py-2 px-4">
                <span
                  className={cn(
                    "px-2 py-1 rounded-full text-white text-[13px] font-medium",
                    booking.status === t("status.approved") && "bg-lime-400",
                    booking.status === t("status.pending") && "bg-orange-400"
                  )}
                >
                  {booking.status}
                </span>
              </td>
              <td className="py-2 px-4  rounded-l-xl">
                <Popover
                  open={openPopoverId === booking.id}
                  onOpenChange={(open) =>
                    setOpenPopoverId(open ? booking.id : null)
                  }
                >
                  <PopoverTrigger asChild>
                    <div className="text-2xl font-bold cursor-pointer">...</div>
                  </PopoverTrigger>
                  <PopoverContent className=" w-32 p-2 bg-background px-1 border-border shadow-sm shadow-border">
                    <div className="space-y-2">
                      <div className="w-full flex justify-end gap-2 cursor-pointer hover:bg-border rounded px-1">
                        <h1>{t("actions.approve")}</h1>
                        <div className="my-auto">
                          <CheckPopover />
                        </div>
                      </div>
                      <div className="w-full flex justify-end gap-2 cursor-pointer hover:bg-border rounded px-1">
                        <h1>{t("actions.cancel")}</h1>
                        <div className="my-auto">
                          <CanclePopover />
                        </div>
                      </div>
                      <div className="w-full flex justify-end gap-2 cursor-pointer hover:bg-border rounded px-1">
                        <h1>{t("actions.details")}</h1>
                        <div className="my-auto">
                          <DetailPopover />
                        </div>
                      </div>
                      <div className="w-full flex justify-end gap-2 cursor-pointer hover:bg-border text-red-600 rounded px-1">
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
        />
      </div>
    </ContainerDashboard>
  );
}
