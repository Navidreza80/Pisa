"use client";
import Button from "@/components/common/button";
import ButtonDashboard from "@/components/common/dashboard/Button";
import ContainerDashboard from "@/components/common/dashboard/ContainerDashboard";
import Line from "@/components/common/dashboard/line";
import ModalStep2 from "@/components/common/dashboard/modalStep2";
import NotificationStatus from "@/components/common/dashboard/notification-status";
import TableDashboard from "@/components/common/dashboard/Table";
import Title from "@/components/common/dashboard/Title";
import InputSelect from "@/components/common/inputs/select-input";
import { TickSVG } from "@/components/svg";
import {
  DashboardBuyerNotifications,
  tableHeaderItems,
} from "@/utils/constant/folder";
import formatToPersianDate from "@/utils/helper/format-date";
import { MarkAllAsRead } from "@/utils/service/notifications/MarkAsRead";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function BuyerNotifications({ notifications, totalCount }) {
  const router = useRouter();

  const searchParams = useSearchParams();
  const page = searchParams.get("page");

  const handleSetParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    router.push(`?${params.toString()}`);
  };

  const readMessages = notifications.filter((item) => item.isRead == true);
  const unReadMessages = notifications.filter((item) => item.isRead == false);

  const t = useTranslations("Notifications");

  const [showRead, setShowRead] = useState(false);
  const [showUnRead, setShowUnRead] = useState(true);

  const { mutate: MarkAllNotificationsAsRead } = useMutation({
    mutationKey: ["MARK_ALL_AS_READ"],
    mutationFn: () =>
      toast.promise(MarkAllAsRead(), {
        success: "عملیات با موفقیت انجام شد",
        pending: "درحال پردازش",
        error: "خطا ",
      }),
    onSuccess: () => router.refresh(),
  });
  return (
    <ContainerDashboard>
      <div className="flex items-center justify-between flex-row flex-wrap gap-4">
        <Title text={t("title")} />
        <div className="flex gap-4 flex-wrap">
          <InputSelect
            withLabel
            label={t("notificationType") + ":"}
            items={DashboardBuyerNotifications}
          />
          <ModalStep2
            trigger={
              <Button className="md:!w-auto w-full flex-1">
                {t("markAsRead")}
              </Button>
            }
            onConfirm={MarkAllNotificationsAsRead}
            button="موافقت"
            title="آیا مطمئن هستید که میخواهید همه مطالب سایت را به عنوان خوانده شده علامت بزنید؟"
          />
        </div>
      </div>
      {/* Divider Line */}
      <Line />
      {/* Table view for larger screens */}
      <TableDashboard
        currentPage={Number(page) || 1}
        totalCount={totalCount}
        pageSize={5}
        onPageChange={(page) => handleSetParam("page", page.toString())}
        tableHeader={tableHeaderItems}
        card={
          <div className="md:hidden grid grid-cols-1 gap-4 mt-4">
            {notifications.map((item) => (
              <div
                key={item.id}
                className="bg-surface rounded-2xl border border-border p-4"
              >
                <div className="space-y-4">
                  {/* Date row */}
                  <div className="flex items-center justify-between text-sm text-text-secondary">
                    <span>{t("dateLabel")}</span>
                    <span className="font-medium text-text">
                      {formatToPersianDate(item.createdAt)}
                    </span>
                  </div>

                  {/* Title */}
                  <div className="text-base font-semibold text-text">
                    {item.title}
                  </div>

                  {/* Action button */}
                  <div className="flex">
                    <ButtonDashboard text={t("markAsRead")} clx="bg-primary">
                      <TickSVG />
                    </ButtonDashboard>
                  </div>
                </div>
              </div>
            ))}
          </div>
        }
        tableContent={
          <>
            <NotificationStatus
              isOpen={showUnRead}
              onClick={() => setShowUnRead((prev) => !prev)}
              text={t("status.unread")}
            />
            {unReadMessages.map(
              (tx) =>
                showUnRead && (
                  <tr
                    key={tx.id}
                    className="bg-background hover:bg-background/30 rounded-xl overflow-hidden"
                  >
                    <td className="p-2 font-yekan font-medium text-[16px] text-nowrap">
                      {tx.title}
                    </td>
                    <td className="p-2 font-yekan font-medium text-[20px] text-nowrap">
                      {formatToPersianDate(tx.createdAt)}
                    </td>
                    <td>
                      <ButtonDashboard text={t("markAsRead")} clx="bg-primary">
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
            {readMessages.map(
              (tx) =>
                showRead && (
                  <tr
                    key={tx.id}
                    className="bg-background hover:bg-background/30 rounded-xl overflow-hidden"
                  >
                    <td className="p-2 font-yekan font-medium text-[16px] text-nowrap">
                      {tx.title}
                    </td>
                    <td className="p-2 font-yekan font-medium text-[20px] text-nowrap">
                      {formatToPersianDate(tx.createdAt)}
                    </td>
                    <td>
                      <ButtonDashboard text={t("markAsRead")} clx="bg-primary">
                        <TickSVG />
                      </ButtonDashboard>
                    </td>
                  </tr>
                )
            )}
          </>
        }
      />
    </ContainerDashboard>
  );
}
