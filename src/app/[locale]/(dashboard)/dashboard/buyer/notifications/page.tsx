"use client";
import Button from "@/components/common/button";
import ButtonDashboard from "@/components/dashboard/button";
import InputSelect from "@/components/dashboard/buyer/inputSelect";
import Line from "@/components/dashboard/buyer/line";
import NotificationStatus from "@/components/dashboard/buyer/notification-status";
import TableDashboard from "@/components/dashboard/table";
import Title from "@/components/dashboard/title";
import WarningModal from "@/components/dashboard/warning-modal";
import { TickSVG } from "@/components/svg";
import { useTranslations } from "next-intl";
import {
  DashboardBuyerNotifications,
  tableHeaderItems,
} from "@/utils/constant/folder";
import { useState } from "react";

export default function Notifications() {
  const t = useTranslations("Notifications");
  const [showRead, setShowRead] = useState(false);
  const [showUnRead, setShowUnRead] = useState(true);

  // Mock data
  const data = [
    {
      id: 1,
      date: t("mockData.date1"),
      text: t("mockData.text1"),
    },
    {
      id: 2,
      date: t("mockData.date1"), // Same date format
      text: t("mockData.text2"),
    },
  ];

  const data2 = [
    {
      id: 1,
      date: t("mockData.date1"),
      text: t("mockData.text1"),
    },
    {
      id: 2,
      date: t("mockData.date1"), // Same date format
      text: t("mockData.text2"),
    },
  ];

  return (
    <>
      <div className="flex items-center justify-between flex-row-reverse flex-wrap gap-4">
        <Title text={t("title")} />
        <div className="flex gap-4 ">
          <WarningModal title={t("markAllAsReadConfirmation")}>
            <Button className="!w-auto">{t("markAsRead")}</Button>
          </WarningModal>
          <InputSelect
            label={t("notificationType") + ":"}
            items={DashboardBuyerNotifications}
          />
        </div>
      </div>
      {/* Divider Line */}
      <Line />
      {/* Table view for larger screens */}
      <div className="hidden md:block">
        <TableDashboard
          tableHeader={tableHeaderItems}
          tableContent={
            <>
              <NotificationStatus
                isOpen={showUnRead}
                onClick={() => setShowUnRead((prev) => !prev)}
                text={t("status.unread")}
              />
              {data.map(
                (tx) =>
                  showUnRead && (
                    <tr
                      key={tx.id}
                      className="bg-background hover:bg-background/30 rounded-xl overflow-hidden"
                    >
                      <td className="p-2 font-yekan font-medium text-[16px] text-nowrap">
                        {tx.text}
                      </td>
                      <td className="p-2 font-yekan font-medium text-[20px] text-nowrap">
                        {tx.date}
                      </td>
                      <td>
                        <ButtonDashboard
                          text={t("markAsRead")}
                          clx="bg-primary"
                        >
                          <TickSVG />
                        </ButtonDashboard>
                      </td>
                    </tr>
                  )
              )}
              <NotificationStatus
                isOpen={showRead}
                onClick={() => setShowRead((prev) => !prev)}
                text={t("status.read")}
              />
              {data2.map(
                (tx) =>
                  showRead && (
                    <tr
                      key={tx.id}
                      className="bg-background hover:bg-background/30 rounded-xl overflow-hidden"
                    >
                      <td className="p-2 font-yekan font-medium text-[16px] text-nowrap">
                        {tx.text}
                      </td>
                      <td className="p-2 font-yekan font-medium text-[20px] text-nowrap">
                        {tx.date}
                      </td>
                      <td>
                        <ButtonDashboard
                          text={t("markAsRead")}
                          clx="bg-primary"
                        >
                          <TickSVG />
                        </ButtonDashboard>
                      </td>
                    </tr>
                  )
              )}
            </>
          }
        />
      </div>
      {/* Card view for mobile screens */}
      <div className="md:hidden grid grid-cols-1 gap-4 mt-4">
        {data.map((item) => (
          <div
            key={item.id}
            className="bg-surface rounded-2xl border border-border p-4"
          >
            <div className="mt-3 space-y-2 text-right">
              <div className="flex justify-end items-center gap-2">
                <span className="font-medium">{item.date}</span>
                <span>{t("dateLabel")}</span>
              </div>

              <div className="flex flex-col items-end">
                <p className="text-right">{item.text}</p>
              </div>
              <div dir="rtl" className="flex">
                <ButtonDashboard text={t("markAsRead")} clx="bg-primary">
                  <TickSVG />
                </ButtonDashboard>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
