import Line from "@/components/dashboard/buyer/line";
import ChangeStep from "@/components/dashboard/seller/add-property-container/change-step";
import Stepper from "@/components/dashboard/seller/add-property-container/stepper";
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
            لیست املاک من
          </h3>
        </div>
        <h1>ساخت اگهی ملک جدید</h1>
      </header>
      <Line className="w-full" />
      <Stepper />
      {children}
      <ChangeStep />
    </div>
  );
}
