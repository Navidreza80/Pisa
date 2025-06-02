import Link from "next/link";
import Line from "../../buyer/line";
import ViewMoreSVG from "../../svg/ViewMoreSVG";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { formatNumber } from "@/utils/helper/format-number";
import WalletSVG from "../../svg/WalletSVG";
import InfoSVG from "../../svg/InfoSVG";

const TagDashboard = ({ data }) => {
  return (
    <>
      <div className="w-full flex justify-between h-[255px]">
        {data.map((card, index) => (
          <div
            key={index}
            className="w-[calc(50%-15px)] p-4 bg-background rounded-xl"
          >
            {card.type === "profile" && (
              <>
                <div className="flex justify-between">
                  <Link
                    href="/dashboard/seller/reservations"
                    className="flex gap-4"
                  >
                    <div className="my-auto">
                      <ViewMoreSVG />
                    </div>
                    <h1 className="my-auto text-text-secondary">ویرایش</h1>
                  </Link>
                  <div className="flex gap-2 rtl">
                    <div className="my-auto">
                      <InfoSVG />
                    </div>

                    <h2 className="text-lg font-semibold my-auto">
                      {card.data.status.label}
                    </h2>
                  </div>
                </div>
                <Line />
                <div className="flex justify-between h-[150px]">
                  <div className="w-[30%] my-auto">
                    <PieChart width={120} height={120}>
                      <Pie
                        data={[
                          {
                            name: "اطلاعات",
                            value: card.data.status.completion,
                          },
                          {
                            name: "باقی‌مانده",
                            value: 100 - card.data.status.completion,
                          },
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
                    <span className="text-[36px] text-text font-bold h-10">
                      {card.data.status.completion}%
                    </span>

                    <p className="text-lg text-text">
                      {card.data.status.hint}
                    </p>

                    <p className="text-xs text-text-secondary">
                      آخرین تغییرات در {card.data.status.lastUpdated}
                    </p>
                  </div>
                </div>
              </>
            )}

            {card.type === "income" && (
              <>
                <div className="flex gap-2 rtl">
                  <div className="my-auto">
                    <WalletSVG />
                  </div>
                  <h2 className="text-lg font-semibold my-auto">
                    {card.title}
                  </h2>
                </div>
                <Line />

                <div className="flex flex-col flex-wrap gap-11">
                  <div className="flex justify-between">
                    <div className="flex gap-4 justify-center text-lg rounded-xl text-background w-55 py-2 font-bold bg-primary">
                      <p>تومان</p>
                      <p>{formatNumber(card.data.currentMonthIncome.value)}</p>
                    </div>
                    <div className="flex gap-2">
                      <p className="text-text text-xl my-auto">
                        درآمد ماه جاری
                      </p>
                      <span className="rounded-full w-4 h-4 bg-primary my-auto" />
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <div className="flex gap-4 justify-center text-lg rounded-xl w-55 py-2 font-bold bg-border/50">
                      <p>تومان</p>
                      <p>{formatNumber(card.data.totalIncome.value)}</p>
                    </div>
                    <div className="flex gap-2">
                      <p className="text-text text-xl my-auto">درآمد کل</p>
                      <span className="rounded-full w-4 h-4 bg-border/50 my-auto" />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default TagDashboard;
