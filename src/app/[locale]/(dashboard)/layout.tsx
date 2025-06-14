// Next
import type { Metadata } from "next";

// CSS
import BuyerSideBar from "@/components/common/dashboard/BuyerSideBar";
import HeaderDashboard from "@/components/common/dashboard/HeaderDashboard";
import Tags from "@/components/pages/sd-payment-management/contents/Tags";
import "../globals.css";

// metadata
export const metadata: Metadata = {
  title: "Pizza - Dashboard",
  description: "Seek what you've been reserved and overall status.",
};

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex bg-border min-h-[100vh] justify-between gap-[19px] p-[19px]">
      <div className="flex flex-col flex-wrap gap-[19px] w-[100%]">
        <HeaderDashboard />
        <Tags />
        <div>{children}</div>
      </div>
      <BuyerSideBar />
    </div>
  );
}
