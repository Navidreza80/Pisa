import React from "react";
import Link from "next/link";
import Line from "../../buyer/line";
import ViewMoreSVG from "../../svg/ViewMoreSVG";
import InfoSVG from "../../svg/InfoSVG";
import { PieChart, Pie, Cell } from "recharts";

const ProfileCard = ({ data }) => (
  <div className="w-[calc(50%-15px)] p-4 bg-background rounded-xl">
    <div className="flex justify-between">
      <Link href="/dashboard/seller/reservations" className="flex gap-4">
        <div className="my-auto">
          <ViewMoreSVG />
        </div>
        <h1 className="my-auto text-text-secondary">ویرایش</h1>
      </Link>
      <div className="flex gap-2 rtl">
        <div className="my-auto">
          <InfoSVG />
        </div>
        <h2 className="text-lg font-semibold my-auto">{data.status.label}</h2>
      </div>
    </div>

    <Line />

    <div className="flex justify-between h-[150px]">
      <div className="w-[30%] my-auto">
        <PieChart width={120} height={120}>
          <Pie
            data={[
              { name: "اطلاعات", value: data.status.completion },
              { name: "باقی‌مانده", value: 100 - data.status.completion },
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

      <div className="w-[60%] h-full flex flex-col flex-wrap justify-between">
        <span className="text-[36px] text-text font-bold h-10">{data.status.completion}%</span>
        <p className="text-lg text-text">{data.status.hint}</p>
        <p className="text-xs text-text-secondary">آخرین تغییرات در {data.status.lastUpdated}</p>
      </div>
    </div>
  </div>
);

export default ProfileCard;
