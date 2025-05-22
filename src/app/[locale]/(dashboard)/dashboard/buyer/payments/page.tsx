"use client";
import InputSelect from "@/components/dashboard/buyer/inputSelect";
import {
  DashboardBuyerPaymentsStatus,
  DashboardBuyerPaymentsType,
} from "@/utils/constant/folder";
import { CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";

const transactions = [
  {
    id: 1,
    date: "12 مرداد 1401",
    time: "13:33",
    trackingCode: "137245678913476456",
    amount: "1250000",
    status: "تایید شده",
    type: "شارژ کیف پول",
  },
  {
    id: 2,
    date: "12 مرداد 1401",
    time: "13:33",
    trackingCode: "137245678913476456",
    amount: "1250000",
    status: "تایید شده",
    type: "شارژ کیف پول",
  },
  {
    id: 3,
    date: "12 مرداد 1401",
    time: "13:33",
    trackingCode: "137245678913476456",
    amount: "1250000",
    status: "تایید نشده",
    type: "رزرو",
  },
  {
    id: 4,
    date: "12 مرداد 1401",
    time: "13:33",
    trackingCode: "137245678913476456",
    amount: "1250000",
    status: "تایید شده",
    type: "رزرو",
  },
  {
    id: 5,
    date: "12 مرداد 1401",
    time: "13:33",
    trackingCode: "137245678913476456",
    amount: "1250000",
    status: "تایید نشده",
    type: "رزرو",
  },
  {
    id: 6,
    date: "12 مرداد 1401",
    time: "12:00",
    trackingCode: "137245678913476456",
    amount: "1250000",
    status: "تایید شده",
    type: "شارژ کیف پول",
  },
  {
    id: 7,
    date: "12 مرداد 1401",
    time: "12:00",
    trackingCode: "137245678913476456",
    amount: "1250000",
    status: "تایید نشده",
    type: "رزرو",
  },
  {
    id: 8,
    date: "12 مرداد 1401",
    time: "12:00",
    trackingCode: "137245678913476456",
    amount: "1250000",
    status: "تایید نشده",
    type: "رزرو",
  },
];

export default function TransactionList() {
  const [typeFilter, setTypeFilter] = useState("همه");
  const [statusFilter, setStatusFilter] = useState("همه");

  const filteredTransactions = transactions.filter((tx) => {
    return (
      (typeFilter === "همه" || tx.type === typeFilter) &&
      (statusFilter === "همه" || tx.status === statusFilter)
    );
  });

  return (
    <div dir="rtl" className="p-4 bg-background rounded-xl shadow">
      <div className="flex justify-between mt-6">
        <h1 className="text-xl font-bold font-yekan mb-auto">
          لیست تراکنش های شما
        </h1>
        <div className="flex gap-4 ">
          <div className="flex flex-col flex-wrap gap-2">
            <h1 className="font-yekan font-bold text-[14px]">نوع تراکنش</h1>
            <InputSelect
              value={typeFilter}
              items={DashboardBuyerPaymentsType}
            />
          </div>
          <div className="flex flex-col flex-wrap gap-2">
            <h1 className="font-yekan font-bold text-[14px]">وضعیت پرداخت</h1>
            <InputSelect
              value={statusFilter}
              items={DashboardBuyerPaymentsStatus}
            />
          </div>
        </div>
      </div>

      <div className="border-b-2 border-dashed border-border my-[19px]" />

      <table className="w-full text-sm border-separate border-spacing-y-4">
        <thead>
          <tr className="bg-text/30 text-text">
            <th className="p-2 text-xl font-yekan rounded-r-xl">تاریخ</th>
            <th className="p-2 text-xl font-yekan">شماره پیگیری</th>
            <th className="p-2 text-xl font-yekan">مبلغ</th>
            <th className="p-2 text-xl font-yekan">وضعیت پرداخت</th>
            <th className="p-2 text-xl font-yekan">نوع تراکنش</th>
            <th className="p-2 text-xl font-yekan rounded-l-xl"></th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map((tx) => (
            <tr
              key={tx.id}
              className="bg-background hover:bg-background/30 rounded-xl overflow-hidden"
            >
              <td className="p-2 font-yekan font-semibold rounded-r-xl">
                {tx.date} - {tx.time}
              </td>
              <td className="p-2 font-yekan font-semibold">
                {tx.trackingCode}
              </td>
              <td className="p-2 font-yekan font-semibold">{tx.amount}</td>
              <td className="p-2 font-yekan font-semibold">
                <span
                  className={`px-2 py-1 rounded-full text-white text-xs flex items-center gap-1 w-fit ${
                    tx.status === "تایید شده" ? "bg-green-500" : "bg-red-400"
                  }`}
                >
                  {tx.status === "تایید شده" ? (
                    <CheckCircle size={14} />
                  ) : (
                    <XCircle size={14} />
                  )}
                  {tx.status}
                </span>
              </td>
              <td className="p-2 font-yekan font-semibold">{tx.type}</td>
              <td className="p-2 font-yekan font-semibold text-primary cursor-pointer hover:underline rounded-l-xl">
                مشاهده رسید
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center mt-4 gap-2">
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
