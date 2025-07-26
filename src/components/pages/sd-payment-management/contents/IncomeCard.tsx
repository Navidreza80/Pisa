import React from "react";
import Line from "@/components/common/dashboard/line";
import WalletSVG from "@/components/dashboard/svg/WalletSVG";
import { formatNumber } from "@/utils/helper/format-number";
import { useTranslations } from "next-intl";

const IncomeCard = ({ data, title }) => {
  const t = useTranslations("Dashboard");
  return (
    <div className="w-full md:w-[calc(50%-15px)] p-4 bg-background rounded-xl">
      {/* Header: Icon + Title */}
      <div className="flex gap-2 items-center rtl">
        <WalletSVG />
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>

      <Line />

      {/* Income Data */}
      <div className="flex flex-col gap-6 mt-4">
        {/* Current Month Income */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex gap-2 items-center mt-2 sm:mt-0">
            <span className="rounded-full w-4 h-4 bg-primary" />
            <p className="text-text text-lg sm:text-xl">{t("currentIncome")}</p>
          </div>
          <div className="flex gap-2 justify-center text-lg rounded-xl text-background w-full sm:w-auto px-4 py-2 font-bold bg-primary">
            <p>{formatNumber(data.currentMonthIncome.value)}</p>
            <p>{t("tooman")}</p>
          </div>
        </div>

        {/* Total Income */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex gap-2 items-center mt-2 sm:mt-0">
            <span className="rounded-full w-4 h-4 bg-border/50" />
            <p className="text-text text-lg sm:text-xl">{t("totalIncome")}</p>
          </div>
          <div className="flex gap-2 justify-center text-lg rounded-xl w-full sm:w-auto px-4 py-2 font-bold bg-border/50">
            <p>{formatNumber(data.totalIncome.value)}</p>
            <p>{t("tooman")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncomeCard;
