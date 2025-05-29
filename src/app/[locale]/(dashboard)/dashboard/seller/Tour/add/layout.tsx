import Line from "@/components/dashboard/buyer/line";
import ChangeStep from "@/components/dashboard/seller/tour-container/add/change-step";
import Stepper from "@/components/dashboard/seller/tour-container/add/stepper";
import { DashboardBackSVG } from "@/components/svg";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <header className="w-full flex justify-between text-base font-medium">
        <div className="flex gap-[5px] items-center">
          <DashboardBackSVG />
          <h3 className="text-[#0059FF] text-base font-medium">
            لیست تورهای من
          </h3>
        </div>
        <h1>ساخت تور جدید</h1>
      </header>
      <Line className="w-full" />
      <Stepper />
      {children}
      <ChangeStep />
    </div>
  );
}
