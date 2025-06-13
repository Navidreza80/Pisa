"use client";
import InputSelect from "@/components/common/inputs/select-input";
import Line from "@/components/common/dashboard/line";
import TableDashboard from "@/components/common/dashboard/Table";
import Title from "@/components/common/dashboard/Title";
import { Card, CardContent } from "@/components/ui/card";
import { formatNumber } from "@/utils/helper/format-number";
import { useTranslations } from "next-intl";

const properties = [
  {
    id: 1,
    date: "12 مرداد - 1401 / 12:33",
    number: "123456789123456",
    price: 1250000,
    transaction: "شارژ کیف پول",
    status: "فعال",
  },
  {
    id: 2,
    date: "12 مرداد - 1401 / 12:33",
    number: "123456789123456",
    price: 1250000,
    transaction: "شارژ کیف پول",
    status: "فعال",
  },
  {
    id: 3,
    date: "12 مرداد - 1401 / 12:33",
    number: "123456789123456",
    price: 1250000,
    transaction: "شارژ کیف پول",
    status: "فعال",
  },
  {
    id: 4,
    date: "12 مرداد - 1401 / 12:33",
    number: "123456789123456",
    price: 1250000,
    transaction: "شارژ کیف پول",
    status: "فعال",
  },
  {
    id: 5,
    date: "12 مرداد - 1401 / 12:33",
    number: "123456789123456",
    price: 1250000,
    transaction: "شارژ کیف پول",
    status: "فعال",
  },
];

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

export default function SellerFinanceManagement() {
  const t = useTranslations("FinanceManagement");

  return (
    <div>
      <div className="flex flex-col md:flex-row-reverse justify-between gap-4 md:gap-0">
        <Title text={t("title")} />
        <div className="flex gap-[19px] flex-wrap justify-end">
          <InputSelect withLabel label={t("transactionType")} />
          <InputSelect withLabel label={t("paymentStatus")} />
        </div>
      </div>
      <Line />

      {/* Table view for desktop */}
      <div className="hidden md:block">
        <TableDashboard
          addTitle={t("property")}
          tableHeader={tableHeaderItems(t)}
          tableContent={properties.map((property) => (
            <tr key={property.id} className="rounded-xl">
              <td className="pl-6 py-7 rounded-r-xl text-[20px] font-medium">
                {property.date}
              </td>
              <td className="px-6 py-7 text-[20px] font-medium">
                {property.number}
              </td>
              <td className="px-6 py-7 text-[20px] font-medium">
                {formatNumber(property.price)}
              </td>
              <td className="px-6 py-7 text-[13px] font-medium">
                <span
                  className={`px-3 py-1 rounded-full text-sm ${statusColor[property.status]}`}
                >
                  {property.status}
                </span>
              </td>
              <td className="px-6 py-7  text-[16px] font-medium">
                {property.transaction}
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
        {properties.map((property) => (
          <Card key={property.id} className="overflow-hidden border-border">
            <CardContent className="p-4">
              {/* Transaction date and status */}
              <div className="flex justify-between items-start mb-3">
                <span
                  className={`px-3 py-1 rounded-full text-sm ${statusColor[property.status]}`}
                >
                  {property.status}
                </span>
                <div className="text-right">
                  <p className="text-sm text-gray-500">
                    {t("tableHeaders.date")}:
                  </p>
                  <p className="font-medium">{property.date}</p>
                </div>
              </div>

              {/* Transaction details */}
              <div className="grid grid-cols-1 gap-3 text-right">
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">
                    {t("tableHeaders.trackingNumber")}:
                  </p>
                  <p className="font-medium">{property.number}</p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-gray-500">
                    {t("tableHeaders.amount")}:
                  </p>
                  <p className="font-medium">{formatNumber(property.price)}</p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-gray-500">
                    {t("tableHeaders.transactionType")}:
                  </p>
                  <p className="font-medium">{property.transaction}</p>
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
    </div>
  );
}
