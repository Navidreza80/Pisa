import Line from "@/components/common/dashboard/line";
import ChangeStep from "@/components/pages/sd-property-create/contents/ChangeStep";
import Stepper from "./Stepper";
import { DashboardBackSVG } from "@/components/svg";
import Link from "next/link";
import ContainerDashboard from "@/components/common/dashboard/ContainerDashboard";

export default function PropertyContainer({
  createHouse,
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ContainerDashboard>
      <div className="px-2 md:px-0">
        <header className="w-full flex flex-col md:flex-row justify-between items-end md:items-center text-base font-medium py-4 md:py-0">
          <div className="flex gap-1 md:gap-[5px] items-center order-2 md:order-1">
            <DashboardBackSVG />
            <Link
              href="/dashboard/seller/properties"
              className="text-[#0059FF] text-sm md:text-base font-medium"
            >
              لیست املاک من
            </Link>
          </div>
          <h1 className="text-lg md:text-base font-semibold order-1 md:order-2">
            ساخت اگهی ملک جدید
          </h1>
        </header>
        <Line className="w-full" />
        <Stepper />
        {children}
        <ChangeStep createHouse={createHouse} />
      </div>
    </ContainerDashboard>
  );
}
