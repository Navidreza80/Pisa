"use client";
import InputSelect from "@/components/common/inputs/select-input";
import Line from "@/components/common/dashboard/line";
import TableDashboard from "@/components/common/dashboard/Table";
import Title from "@/components/common/dashboard/Title";
import { Card, CardContent } from "@/components/ui/card";
import { formatNumber } from "@/utils/helper/format-number";
import { useTranslations } from "next-intl";
import ContainerDashboard from "@/components/common/dashboard/ContainerDashboard";
import formatToPersianDate from "@/utils/helper/format-date";

const statusColor = {
  فعال: "bg-green-400 text-white",
  "در انتظار": "bg-yellow-400 text-black",
  غیرفعال: "bg-red-400 text-white",
};

export const tableHeaderItems = (t) => [
  { text: t("tableHeaders.date"), clx: "rounded-r-xl" },
  { text: t("tableHeaders.trackingNumber"), clx: null },
  { text: t("tableHeaders.amount"), clx: null },
  { text: t("tableHeaders.paymentStatus"), clx: null },
  { text: t("tableHeaders.transactionType"), clx: null },
  { text: t("tableHeaders.empty"), clx: "rounded-l-xl" },
];

export default function SellerFinanceManagement({ payments }) {
  const t = useTranslations("FinanceManagement");

  return (
    <ContainerDashboard>
      <div className="flex flex-col md:flex-row-reverse justify-between gap-4 md:gap-0">
        <div className="flex gap-[19px] flex-wrap justify-end">
          <InputSelect withLabel label={t("transactionType")} />
          <InputSelect withLabel label={t("paymentStatus")} />
        </div>
        <Title text={t("title")} />
      </div>
      <Line />

      {/* Table view for desktop */}
      <div className="hidden md:block">
        <TableDashboard
          addTitle={t("property")}
          tableHeader={tableHeaderItems(t)}
          tableContent={payments.data.map((payment) => (
            <tr key={payment.id} className="rounded-xl">
              <td className="pl-6 py-7 rounded-r-xl text-[20px] font-medium">
                {formatToPersianDate(payment)}
              </td>
              <td className="px-6 py-7 text-[20px] font-medium">
                {payment.transactionId || "نامعتبر"}
              </td>
              <td className="px-6 py-7 text-[20px] font-medium">
                {formatNumber(payment.amount)}
              </td>
              <td className="px-6 py-7 text-[13px] font-medium">
                <span
                  className={`px-3 py-1 rounded-full text-sm ${statusColor[payment.status]}`}
                >
                  {payment.status == "confirmed" ? "فعال" : payment.status == "pending" ? "در انتظار" : "غیرفعال"}
                </span>
              </td>
              <td className="px-6 py-7  text-[16px] font-medium">
                رزرو
              </td>
              <td className="px-6 py-2  text-[16px] font-medium relative rounded-l-xl">
                {t("viewReceipt")}
              </td>
            </tr>
          ))}
        />
      </div>

      {/* Card view for mobile */}
      <div className="md:hidden grid grid-cols-1 gap-4 mt-4">
        {payments.data.map((payment) => (
          <Card key={payment.id} className="overflow-hidden border-border">
            <CardContent className="p-4">
              {/* Transaction date and status */}
              <div className="flex justify-between items-start mb-3">
                <span
                  className={`px-3 py-1 rounded-full text-sm ${statusColor[payment.status]}`}
                >
                  {payment.status}
                </span>
                <div className="">
                  <p className="text-sm text-gray-500">
                    {t("tableHeaders.date")}:
                  </p>
                  <p className="font-medium">{formatToPersianDate(payment)}</p>
                </div>
              </div>

              {/* Transaction details */}
              <div className="grid grid-cols-1 gap-3 ">
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">
                    {t("tableHeaders.trackingNumber")}:
                  </p>
                  <p className="font-medium">{payment.transactionId|| "نامعتبر"}</p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-gray-500">
                    {t("tableHeaders.amount")}:
                  </p>
                  <p className="font-medium">{formatNumber(payment.amount)}</p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-gray-500">
                    {t("tableHeaders.transactionType")}:
                  </p>
                  <p className="font-medium">رزرو</p>
                </div>
              </div>

              {/* View receipt button */}
              <div className="flex justify-end pt-3 border-t border-border mt-3">
                <button className="text-primary font-medium">
                  {t("viewReceipt")}
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </ContainerDashboard>
  );
}
