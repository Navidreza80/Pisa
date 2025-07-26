"use client";
import Link from "next/link";
import Line from "@/components/common/dashboard/line";
import ViewMoreSVG from "@/components/dashboard/svg/ViewMoreSVG";
import InfoSVG from "@/components/dashboard/svg/InfoSVG";
import { PieChart, Pie, Cell } from "recharts";
import { useTranslations } from "next-intl";

const ProfileCard = ({ data }) => {
  const t = useTranslations("Dashboard");
  return (
    <div className="w-full p-4 bg-background rounded-xl md:w-[calc(50%-15px)]">
      {/* Top: Edit + Status */}
      <div className="flex flex-col-reverse md:flex-row justify-between gap-4">
        <div className="flex gap-2 items-center rtl">
          <InfoSVG />
          <h2 className="text-lg font-semibold">{data.status.label}</h2>
        </div>
        <Link
          href="/dashboard/seller/reservations"
          className="flex gap-2 items-center"
        >
          <ViewMoreSVG />
          <h1 className="text-text-secondary">{t("edit")}</h1>
        </Link>
      </div>

      <Line />

      {/* Main Section: Pie Chart + Info */}
      <div className="flex flex-col md:flex-row justify-between items-center h-auto md:h-[150px] gap-6 mt-4">
        {/* Info Text */}
        <div className="w-full md:w-[60%] flex flex-col gap-2 text-center md:text-right">
          <span className="text-[28px] md:text-[36px] text-text font-bold">
            {data.status.completion}%
          </span>
          <p className="text-base md:text-lg text-text">{data.status.hint}</p>
          <p className="text-xs text-text-secondary">
            {t("lastUpdateIn")} {data.status.lastUpdated}
          </p>
        </div>

        {/* Pie Chart */}
        <div className="w-full md:w-[30%] flex justify-center">
          <PieChart width={120} height={120}>
            <Pie
              data={[
                { name: t("information"), value: data.status.completion },
                { name: t("remained"), value: 100 - data.status.completion },
              ]}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={60}
              paddingAngle={0}
              startAngle={90}
              endAngle={-270}
              dataKey="value"
              cornerRadius={0}
            >
              <Cell fill="#708df9" stroke="none" />
              <Cell fill="#F0F0F0" stroke="none" />
            </Pie>
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
