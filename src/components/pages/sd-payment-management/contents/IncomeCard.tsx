import React from "react";
import Line from "@/components/common/dashboard/line";
import WalletSVG from "@/components/dashboard/svg/WalletSVG";
import { formatNumber } from "@/utils/helper/format-number";

const IncomeCard = ({ data, title }) => (
  <div className="md:w-[calc(50%-15px)] w-full p-4 bg-background rounded-xl">
    <div className="flex gap-2 rtl">
      <div className="my-auto">
        <WalletSVG />
      </div>
      <h2 className="text-lg font-semibold my-auto">{title}</h2>
    </div>

    <Line />

    <div className="flex flex-col flex-wrap gap-11">
      <div className="flex justify-between">
        <div className="flex gap-4 justify-center text-lg rounded-xl text-background w-55 py-2 font-bold bg-primary">
          <p>تومان</p>
          <p>{formatNumber(data.currentMonthIncome.value)}</p>
        </div>
        <div className="flex gap-2">
          <p className="text-text text-xl my-auto">درآمد ماه جاری</p>
          <span className="rounded-full w-4 h-4 bg-primary my-auto" />
        </div>
      </div>

      <div className="flex justify-between">
        <div className="flex gap-4 justify-center text-lg rounded-xl w-55 py-2 font-bold bg-border/50">
          <p>تومان</p>
          <p>{formatNumber(data.totalIncome.value)}</p>
        </div>
        <div className="flex gap-2">
          <p className="text-text text-xl my-auto">درآمد کل</p>
          <span className="rounded-full w-4 h-4 bg-border/50 my-auto" />
        </div>
      </div>
    </div>
  </div>
);

export default IncomeCard;
