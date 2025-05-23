"use client";
import Button from "@/components/common/button";
import InputSelect from "@/components/dashboard/buyer/inputSelect";
import Line from "@/components/dashboard/buyer/line";
import { DashboardBuyerPaymentsType } from "@/utils/constant/folder";
import { useState } from "react";
import NotificationStatus from "../../../../../../components/dashboard/buyer/notification-status";

const transactions = [
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
  const [typeFilter, setTypeFilter] = useState("همه");
  const [statusFilter, setStatusFilter] = useState("همه");

  const filteredTransactions = transactions.filter((tx) => {
    return (
      (typeFilter === "همه" || tx.type === typeFilter) &&
      (statusFilter === "همه" || tx.status === statusFilter)
    );
  });

  const tableHeaderItems = [
    { text: "اعلان ها", clx: "rounded-r-xl" },
    { text: "تاریخ", clx: null },
    { text: "-", clx: "text-transparent rounded-l-xl" },
  ];

  return (
    <div dir="rtl">
      <div className="flex justify-between mt-6">
        <h1 className="text-xl font-bold font-yekan mb-auto">
          لیست اعلان های شما
        </h1>
        <div className="flex gap-4 ">
          <InputSelect value={typeFilter} items={DashboardBuyerPaymentsType}>
            <div className="text-fade font-medium text-[13px] absolute top-[-10] bg-background right-2 px-2">
              نوع اعلان :
            </div>
          </InputSelect>

          <Button className="!w-auto">علامت گذاری به عنوان خوانده شده</Button>
        </div>
      </div>

      <Line />

      <table className="w-full text-sm border-separate border-spacing-y-4">
        <thead>
          <tr className="bg-table-main p-2 font-yekan text-text">
            {tableHeaderItems.map((item, index) => {
              return (
                <th
                  key={index}
                  className={`p-2 text-lg  font-medium ${item.clx}`}
                >
                  {item.text}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          <NotificationStatus text="خوانده نشده" />
          {filteredTransactions.map((tx) => (
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
                <button className="pl-[15px] pr-[3.5px] text-white bg-primary rounded-full flex p-0.5 gap-1">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 2.5C14.1421 2.5 17.5 5.85786 17.5 10C17.5 14.1421 14.1421 17.5 10 17.5C5.85786 17.5 2.5 14.1421 2.5 10C2.5 5.85786 5.85786 2.5 10 2.5ZM13.9736 6.73145C13.5759 6.40014 12.9959 6.42963 12.6338 6.78418L12.5645 6.85938L9.7998 10.1777L9.37988 10.6738C9.26833 10.8011 9.18036 10.8941 9.10254 10.9648C9.10082 10.9663 9.09831 10.9673 9.09668 10.9688C9.095 10.9676 9.09249 10.9671 9.09082 10.9658C9.00694 10.9024 8.91063 10.8178 8.78809 10.7012L8.3252 10.2441L7.37305 9.29297C6.9825 8.90277 6.3494 8.90255 5.95898 9.29297C5.56889 9.68341 5.56889 10.3166 5.95898 10.707L6.91016 11.6582L7.41113 12.1514C7.57381 12.3056 7.7326 12.4464 7.88477 12.5615C8.17105 12.7779 8.53511 12.9833 8.98926 13.0146L9.18945 13.0166L9.38867 12.9961C9.8387 12.9239 10.1825 12.686 10.4482 12.4443C10.5893 12.316 10.7348 12.1624 10.8828 11.9941L11.3369 11.458L14.1016 8.14062L14.1631 8.05859C14.4465 7.63846 14.3713 7.06293 13.9736 6.73145Z"
                      fill="#222222"
                    />
                  </svg>
                  علامت گذاری به عنوان خوانده شده
                </button>
              </td>
            </tr>
          ))}
          <NotificationStatus text="خوانده شده" />
        </tbody>
      </table>

      <div className="flex justify-end mt-[71px] gap-2">
        {[1, 2, 3, 4, 5].map((p) => (
          <button
            key={p}
            className={`w-8 h-8 rounded-full border text-sm ${p === 1 ? "bg-primary text-white" : "bg-background"}`}
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  );
}
