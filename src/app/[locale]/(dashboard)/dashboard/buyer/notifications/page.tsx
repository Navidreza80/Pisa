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
import {
  DashboardBuyerNotifications,
  tableHeaderItems,
} from "@/utils/constant/folder";

export default function Notifications() {
  // Mock data
  const data = [
    {
      id: 1,
      date: "12 مرداد - 1401 / 12:33",
      text: "فروشنده امیر محمد ملایی یک خانه برای رزرو آگهی کرده است",
    },
    {
      id: 2,
      date: "12 مرداد - 1401 / 12:33",
      text: "خوش آمدید !",
    },
  ];
  return (
    <div>
      <div className="flex justify-between flex-row-reverse mt-6">
        <Title text="لیست اعلان ها شما" />
        <div className="flex gap-4 ">
          <WarningModal
            title="            آیا مطمئن هستید که میخواهید همه مطالب سایت را به عنوان خوانده شده
            علامت بزنید؟"
          >
            <Button className="!w-auto">علامت گذاری به عنوان خوانده شده</Button>
          </WarningModal>
          <InputSelect
            label="نوع اعلان :"
            items={DashboardBuyerNotifications}
          />
        </div>
      </div>
      {/* Divider Line */}
      <Line />
      {/* Page Table */}
      <TableDashboard
        isNotification={true}
        notificationLineOne={<NotificationStatus text="خوانده نشده" />}
        notificationLineTwo={<NotificationStatus text="خوانده شده" />}
        tableHeader={tableHeaderItems}
        tableContent={data.map((tx) => (
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
                text="علامت گذاری به عنوان خوانده شده"
                clx="bg-primary"
              >
                <TickSVG />
              </ButtonDashboard>
            </td>
          </tr>
        ))}
      />
    </div>
  );
}
