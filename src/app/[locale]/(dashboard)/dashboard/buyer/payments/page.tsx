"use client";
import InputSelect from "@/components/dashboard/buyer/inputSelect";
import Line from "@/components/dashboard/buyer/line";
import {
  DashboardBuyerPaymentsStatus,
  DashboardBuyerPaymentsType,
} from "@/utils/constant/folder";
import { formatNumber } from "@/utils/helper/format-number";
import { CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";
import { useMediaQuery } from "@/utils/hooks/use-media-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
  const isMobile = useMediaQuery("(max-width: 768px)");

  const filteredTransactions = transactions.filter((tx) => {
    return (
      (typeFilter === "همه" || tx.type === typeFilter) &&
      (statusFilter === "همه" || tx.status === statusFilter)
    );
  });

  return (
    <div dir="rtl" >
      <div className="flex flex-col md:flex-row justify-between mt-6 gap-4 md:gap-0">
        <h1 className="text-xl font-bold font-yekan mb-auto order-1 md:order-2">
          لیست تراکنش های شما
        </h1>
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto order-2 md:order-1">
          <div className="flex flex-col flex-wrap gap-2 w-full sm:w-auto">
            <h1 className="font-yekan font-bold text-[14px]">نوع تراکنش</h1>
            <InputSelect
              value={typeFilter}
              items={DashboardBuyerPaymentsType}
            />
          </div>
          <div className="flex flex-col flex-wrap gap-2 w-full sm:w-auto">
            <h1 className="font-yekan font-bold text-[14px]">وضعیت پرداخت</h1>
            <InputSelect
              value={statusFilter}
              items={DashboardBuyerPaymentsStatus}
            />
          </div>
        </div>
      </div>

      <Line />

      {!isMobile ? (
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-separate border-spacing-y-4">
            <thead>
              <tr className="bg-text/30 p-2 font-yekan font-[400] text-text">
                <th className="p-2 text-lg rounded-r-xl">تاریخ</th>
                <th className="p-2 text-lg">شماره پیگیری</th>
                <th className="p-2 text-lg">مبلغ</th>
                <th className="p-2 text-lg">وضعیت پرداخت</th>
                <th className="p-2 text-lg">نوع تراکنش</th>
                <th className="p-2 text-lg rounded-l-xl"></th>
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
                  <td className="p-2 font-yekan font-semibold">{formatNumber(Number(tx.amount))}</td>
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
        </div>
      ) : (
        <div className="space-y-4 mt-4">
          {filteredTransactions.map((tx) => (
            <Card key={tx.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg font-semibold font-yekan">{tx.date} - {tx.time}</h3>
                    <p className="text-sm text-gray-500 mt-1">{formatNumber(Number(tx.amount))} تومان</p>
                  </div>
                  <span className="text-primary cursor-pointer hover:underline font-yekan font-semibold">
                    مشاهده رسید
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-3 text-sm mt-3">
                  <div>
                    <span className="text-gray-500">شماره پیگیری:</span>
                    <p className="mt-1 font-yekan font-semibold">{tx.trackingCode}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">نوع تراکنش:</span>
                    <p className="mt-1 font-yekan font-semibold">{tx.type}</p>
                  </div>
                  <div className="col-span-2">
                    <span className="text-gray-500">وضعیت پرداخت:</span>
                    <div className="mt-1">
                      <Badge
                        className={`px-2 py-1 text-white text-xs flex items-center gap-1 w-fit ${
                          tx.status === "تایید شده" ? "bg-green-500" : "bg-red-400"
                        }`}
                      >
                        {tx.status === "تایید شده" ? (
                          <CheckCircle size={14} />
                        ) : (
                          <XCircle size={14} />
                        )}
                        {tx.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="flex justify-center mt-4 gap-2">
        <div className="flex flex-wrap items-center justify-center gap-2">
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
    </div>
  );
}
