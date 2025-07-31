"use client";
import Line from "@/components/common/dashboard/line";
import ViewMoreSVG from "@/components/dashboard/svg/ViewMoreSVG";
import { getProfileHint } from "@/utils/helper/profile-hint";
import { timeAgo } from "@/utils/helper/time-identifier";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Cell, Pie, PieChart } from "recharts";

const ProfileCard = ({ completed, lastUpdated }) => {
  const t = useTranslations("Dashboard");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <div className="w-full p-4 bg-background rounded-xl">
      {/* Top: Edit + Status */}
      <div className="flex flex-col-reverse md:flex-row justify-between gap-4">
        <div className="flex gap-2 items-center rtl">
          <h2 className="text-lg font-semibold">{t("profileStatus")}</h2>
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
            {completed}%
          </span>
          <p className="text-base md:text-lg text-text">
            {getProfileHint(completed)}
          </p>
          <p className="text-xs text-text-secondary">
            {t("lastUpdateIn")} {timeAgo(lastUpdated)}
          </p>
        </div>

        {/* Pie Chart */}
        <div className="w-full md:w-[30%] flex justify-center">
          {isClient && (
            <PieChart width={120} height={120}>
              <Pie
                data={[
                  { name: t("information"), value: completed },
                  { name: t("remained"), value: 100 - completed },
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
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
