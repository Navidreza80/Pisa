"use client";
import Button from "@/components/common/button";
import ButtonDashboard from "@/components/dashboard/button";
import InputSelect from "@/components/dashboard/buyer/inputSelect";
import Line from "@/components/dashboard/buyer/line";
import NotificationStatus from "@/components/dashboard/buyer/notification-status";
import Table from "@/components/dashboard/table";
import Title from "@/components/dashboard/title";
import { TickSVG } from "@/components/svg";
import {
  DashboardBuyerNotifications,
  tableHeaderItems,
} from "@/utils/constant/folder";

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

export default function Notifications() {
  return (
    <div dir="rtl">
      <div className="flex justify-between mt-6">
        <Title text="لیست اعلان ها شما" />
        <div className="flex gap-4 ">
          <InputSelect items={DashboardBuyerNotifications}>
            <div className="text-fade font-medium text-[13px] absolute top-[-10] bg-background right-2 px-2">
              نوع اعلان :
            </div>
          </InputSelect>

          <Button className="!w-auto">علامت گذاری به عنوان خوانده شده</Button>
        </div>
      </div>
      {/* Divider Line */}
      <Line />
      {/* Page Table */}
      <Table
        isNotification={true}
        notificationLineOne={<NotificationStatus text="خوانده نشده" />}
        notificationLineTwo={<NotificationStatus text="خوانده شده" />}
        tableHeader={tableHeaderItems}
        tableContent={data.map((tx) => (
          <tr
            key={tx.id}
            className="bg-background hover:bg-background/30 rounded-xl overflow-hidden"
          >
            <td className="p-2 font-yekan font-medium text-[16px]">
              {tx.text}
            </td>
            <td className="p-2 font-yekan font-medium text-[20px]">
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
