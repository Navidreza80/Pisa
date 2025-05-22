import React from "react";
import BuyerSideBarItems from "./buyerSideBarItems";
import DashboardSVG from "../svg/DashboardSVG";
import InfoSVG from "../svg/InfoSVG";
import NotifSVG from "../svg/NotifSVG";
import PaymentSVG from "../svg/PaymentSVG";
import FavoriteSVG from "../svg/FavoriteSVG";
import ReserveSVG from "../svg/ReserveSVG";
import SignoutSVG from "../svg/SignoutSVG";
import MoneySVG from "../svg/MoneySVG";

function BuyerSideBar() {
  return (
    <div className="h-[calc(100vh-32px)] sticky top-[19px] rounded-[12px] bg-background p-4 flex flex-col flex-wrap justify-between">
      <div className="mt-2">
        <div className="flex justify-between">
          <div className="my-auto">
            <SignoutSVG />
          </div>
          <h2 className="text-text text-4xl font-bold font-yekan">Piza</h2>
        </div>

        <div dir="rtl" className="flex flex-col gap-4 mt-13">
          <BuyerSideBarItems
            name="داشبورد"
            icon={<DashboardSVG />}
            href="/dashboard/buyer"
          />
          <BuyerSideBarItems
            name="اطلاعات کاربری"
            icon={<InfoSVG />}
            href="/dashboard/buyer/information"
          />
          <BuyerSideBarItems
            name="مدیریت رزروها"
            icon={<ReserveSVG />}
            href="/dashboard/buyer/reservations"
          />
          <BuyerSideBarItems
            name="علاقه‌مندی‌ها"
            icon={<FavoriteSVG />}
            href="/dashboard/buyer/favorites"
          />
          <BuyerSideBarItems
            name="پرداخت‌ها"
            icon={<PaymentSVG />}
            href="/dashboard/buyer/payments"
          />
          <BuyerSideBarItems
            name="اعلان‌ها"
            icon={<NotifSVG />}
            href="/dashboard/buyer/notifications"
          />
        </div>
      </div>
      <div className="mt-6 py-3 px-5 border-[2px] border-text-secondary border-dashed rounded-[18px] flex justify-end gap-2">
        <div className="flex flex-col flex-wrap justify-between">
          <p className="text-[20px] text-text ">کیف پول</p>
          <p className="text-text-secondary text-[14px] ">عدم موجودی</p>
        </div>
        <div className="my-auto">
        <MoneySVG />
        </div>
      </div>
    </div>
  );
}

export default BuyerSideBar;
