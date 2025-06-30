import Line from "@/components/common/dashboard/line";
import {
  LineChart,
  Line as ReLine,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ChartArea } from "lucide-react";

const ReservationChart = ({ data, title }) => (
  <div className="md:w-[calc(50%-15px)] w-full p-4 bg-background rounded-xl">
    <div className="flex gap-2 rtl">
      <div className="my-auto">
        <ChartArea />
      </div>
      <h2 className="text-lg font-semibold my-auto">{title}</h2>
    </div>

    <Line />

    <div className="flex flex-col flex-wrap gap-11">
      <ResponsiveContainer width="100%" height={150}>
        <LineChart data={data}>
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <XAxis dataKey="date" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <ReLine type="monotone" dataKey="count" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default ReservationChart;
