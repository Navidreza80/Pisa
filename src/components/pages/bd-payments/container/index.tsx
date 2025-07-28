"use client";
import ContainerDashboard from "@/components/common/dashboard/ContainerDashboard";
import Line from "@/components/common/dashboard/line";
import TableDashboard from "@/components/common/dashboard/Table";
import Title from "@/components/common/dashboard/Title";
import InputSelect from "@/components/common/inputs/select-input";
import {
  DashboardBuyerPaymentsStatus,
  DashboardBuyerPaymentsType,
} from "@/utils/constant/folder";
import formatToPersianDate from "@/utils/helper/format-date";
import { formatNumber } from "@/utils/helper/format-number";
import { useTranslations } from "next-intl";
import { useState } from "react";
import Status from "../../sd-booking-management/content/Status";
import { useRouter, useSearchParams } from "next/navigation";

const tableHeaderItems = [
  { text: "date", clx: "rtl:rounded-r-xl ltr:rounded-l-xl" },
  { text: "trackingCode", clx: null },
  { text: "amount", clx: null },
  { text: "paymentStatus", clx: null },
  { text: "transactionType", clx: null },
  { text: "empty", clx: "rtl:rounded-l-xl ltr:rounded-r-xl" },
];

export default function BuyerPayments({ paymentList, totalCount }) {
  const router = useRouter();

  const searchParams = useSearchParams();
  const page = searchParams.get("page");

  const handleSetParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    router.push(`?${params.toString()}`);
  };

  const t = useTranslations("TransactionList");
  const [typeFilter, setTypeFilter] = useState(t("filters.all"));
  const [statusFilter, setStatusFilter] = useState(t("filters.all"));

  return (
    <ContainerDashboard>
      <div className="flex items-center justify-between flex-wrap gap-4">
        <Title text={t("title")} />
        <div className="flex gap-[19px] flex-wrap">
          <InputSelect
            withLabel
            label={t("filters.transactionType")}
            value={typeFilter}
            items={DashboardBuyerPaymentsType}
            onChange={(val) => setTypeFilter(val)}
          />
          <InputSelect
            withLabel
            label={t("filters.paymentStatus")}
            value={statusFilter}
            items={DashboardBuyerPaymentsStatus}
            onChange={(val) => setStatusFilter(val)}
          />
        </div>
      </div>

      <Line />
      <TableDashboard
        currentPage={Number(page) || 1}
        totalCount={totalCount}
        pageSize={5}
        onPageChange={(page) => handleSetParam("page", page.toString())}
        card={
          <div className="md:hidden grid grid-cols-1 gap-4 mt-4">
            {paymentList.payments.map((item) => (
              <div
                key={item.id}
                className="bg-surface rounded-2xl border border-border p-4 space-y-4"
              >
                {/* Date */}
                <div className="flex items-start justify-between">
                  <h2 className="text-base font-bold text-text">{item.date}</h2>
                </div>

                <div className="space-y-3">
                  {/* Status */}
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">
                      {t("statusLabel")}:
                    </span>
                    <Status status={item.status} />
                  </div>

                  {/* Price */}
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">
                      {t("priceLabel")}:
                    </span>
                    <span className="font-medium text-text">
                      {formatNumber(item.amount)}
                    </span>
                  </div>

                  {/* Tracking Code */}
                  <div className="text-sm space-y-1">
                    <span className="text-text-secondary block">
                      {t("trackingCodeLabel")}:
                    </span>
                    <p className="font-medium text-text">123456789</p>
                  </div>

                  {/* View Receipt Link */}
                  <div className="flex">
                    <span className="text-primary underline text-sm cursor-pointer">
                      مشاهده رسید
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        }
        tableHeader={tableHeaderItems.map((item) => ({
          ...item,
          text: t(`tableHeaders.${item.text}`),
        }))}
        tableContent={paymentList.payments.map((tx) => (
          <tr
            key={tx.id}
            className="bg-background hover:bg-background/30 rounded-xl overflow-hidden"
          >
            <td className="p-2 text-[18px] font-medium rounded-r-xl">
              {formatToPersianDate(tx.createdAt)}
            </td>
            <td className="p-2 text-[18px] font-medium">123456789</td>
            <td className="p-2 text-[18px] font-medium">
              {formatNumber(Number(tx.amount))} {t("currency")}
            </td>
            <td className="p-2 text-[13px] font-medium">
              <Status status={tx.status} />
            </td>
            <td className="p-2 text-[18px] font-medium">رزرو</td>
            <td className="p-2 text-[13px] font-medium text-primary cursor-pointer hover:underline rounded-l-xl">
              {t("viewReceipt")}
            </td>
          </tr>
        ))}
      />
    </ContainerDashboard>
  );
}
