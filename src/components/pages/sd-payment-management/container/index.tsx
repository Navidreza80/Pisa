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
import Status from "../../sd-booking-management/content/Status";
import { useRouter, useSearchParams } from "next/navigation";

export const tableHeaderItems = (t) => [
  { text: t("tableHeaders.date"), clx: "rounded-r-xl" },
  { text: t("tableHeaders.trackingNumber"), clx: null },
  { text: t("tableHeaders.amount"), clx: null },
  { text: t("tableHeaders.paymentStatus"), clx: null },
  { text: t("tableHeaders.transactionType"), clx: null },
  { text: t("tableHeaders.empty"), clx: "rounded-l-xl" },
];

export default function SellerFinanceManagement({ payments, totalCount }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations("FinanceManagement");
  const page = searchParams.get("page");
  const handleSetParam = (key: string, value: string | number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <ContainerDashboard>
      <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-0">
        <Title text={t("title")} />
        <div className="flex gap-[19px] flex-wrap">
          <InputSelect className="flex-1" withLabel label={t("transactionType")} />
          <InputSelect className="flex-1" withLabel label={t("paymentStatus")} />
        </div>
      </div>
      <Line />

      {/* Table view for desktop */}
      <TableDashboard
        currentPage={Number(page) || 1}
        totalCount={totalCount}
        pageSize={5}
        onPageChange={(page) => handleSetParam("page", page.toString())}
        card={
          <div className="md:hidden grid grid-cols-1 gap-4 mt-4">
            {payments.map((payment) => (
              <Card
                key={payment.id}
                className="overflow-hidden border shadow-none border-border rounded-2xl"
              >
                <CardContent className="p-4 space-y-4">
                  {/* Transaction status and date */}
                  <div className="flex justify-between items-center">
                    <Status status={payment.status} />
                    <div className="text-right space-y-0.5">
                      <p className="text-xs text-muted-foreground">
                        {t("tableHeaders.date")}:
                      </p>
                      <p className="text-sm font-medium">
                        {formatToPersianDate(payment)}
                      </p>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-border" />

                  {/* Transaction details */}
                  <div className="grid grid-cols-1 gap-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        {t("tableHeaders.trackingNumber")}:
                      </span>
                      <span className="text-sm font-medium text-right max-w-[60%] truncate">
                        {payment.transactionId || "نامعتبر"}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        {t("tableHeaders.amount")}:
                      </span>
                      <span className="text-sm font-medium">
                        {formatNumber(payment.amount)}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        {t("tableHeaders.transactionType")}:
                      </span>
                      <span className="text-sm font-medium">رزرو</span>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-border" />

                  {/* View receipt button */}
                  <div className="flex pt-1">
                    <button className="text-primary text-sm font-medium">
                      {t("viewReceipt")}
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        }
        addTitle={t("property")}
        tableHeader={tableHeaderItems(t)}
        tableContent={payments.map((payment) => (
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
              <Status status={payment.status} />
            </td>
            <td className="px-6 py-7  text-[16px] font-medium">رزرو</td>
            <td className="px-6 py-2  text-[16px] font-medium relative rounded-l-xl cursor-pointer">
              {t("viewReceipt")}
            </td>
          </tr>
        ))}
      />
    </ContainerDashboard>
  );
}
