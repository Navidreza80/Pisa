import BathroomSVG from "@/components/common/svg/bathroom";
import BedSVG from "@/components/common/svg/bed";
import CarSVG from "@/components/common/svg/car";
import Close from "@/components/common/svg/close";
import Share from "@/components/common/svg/share";
import Star from "@/components/common/svg/star";
import Line from "@/components/dashboard/buyer/line";
import Image from "next/image";

export default async function Dashboard() {
  return (
    <div className="w-full md:w-[918px] pb-[19px] bg-background rounded-xl">
      <header className="pb-[3.7px] pt-[24px] px-[19px] flex flex-col-reverse md:flex-row justify-between items-center gap-4 md:gap-0">
        <button className="w-full md:w-[119px] h-12 rounded-[64px] border border-[#FF4242] text-[#FF4242] font-semibold flex items-center justify-center gap-2">
          بستن <Close />
        </button>
        <h1 className="text-text text-[24px] md:text-[32px] font-extrabold text-center md:text-right">
          هتل همایون فر کیش ایران
        </h1>
      </header>
      <Line />
      <div className="p-[19px] font-medium text-[15px] text-text-secondary leading-7 flex flex-col md:flex-row justify-between gap-6 md:gap-0">
        <div className="flex flex-col w-full md:w-[452px]">
          <p>
            آپارتمانی دنج و آرام در قلب شهر، جایی که زندگی روزمره راحت و سبک‌تر
            است. فضایی مدرن با طراحی منحصربه‌فرد، یادآور خانه‌های دنج و دل‌نشین.
            محلی برای لحظه‌های خوش، آرامش و شروعی نو در زندگی روزمره‌تان.
            آپارتمانی دنج و آرام در قلب شهر، جایی که زندگی روزمره راحت و سبک‌تر
            است. فضایی مدرن با طراحی منحصربه‌فرد، یادآور خانه‌های دنج و دل‌نشین.
            محلی برای لحظه‌های خوش، آرامش و شروعی نو در زندگی روزمره‌تان.
            آپارتمانی دنج و آرام در قلب شهر، جایی که زندگی روزمره راحت و سبک‌تر
            است. فضایی مدرن با طراحی منحصربه‌فرد، یادآور خانه‌های دنج و دل‌نشین.
            محلی برای لحظه‌های خوش، آرامش و شروعی نو در زندگی روزمره‌تان. محلی
            برای لحظه‌های خوش، آرامش و شروعی نو در زندگی روزمره‌تان. محلی برای
            لحظه‌های خوش، آرامش و شروعی نو در زندگی روزمره‌تان.
          </p>
          <div dir="rtl" className="flex gap-2.5 mt-5 items-center">
            <span className="text-fade font-medium">برچسب ها :</span>
            <span className="rounded-xl border border-primary flex items-center justify-center w-[117px] h-[36px]">
              آپارتمان
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-[19px] w-full md:w-auto" dir="rtl">
          <div
            // src={null}
            // alt="house image"
            // width={500}
            // height={500}
            className="w-full md:w-[410px] h-[250px] md:h-[325px] bg-gray-200 rounded-lg relative"
          >
            <span className="absolute top-[15px] right-[15px] h-10 py-1 px-3 bg-primary rounded-[10px] text-white flex gap-1.5 items-center">
              <Star />5 ستاره
            </span>
            <span className="absolute top-[15px] left-[15px] w-10 aspect-square justify-center bg-primary rounded-[10px] text-white flex gap-1.5 items-center">
              <Share />
            </span>
          </div>
          <div className="flex flex-wrap overflow-hidden text-ellipsis whitespace-nowrap w-full md:w-[410px]">
            <p className="text-fade ">آدرس : </p>ساری خیابان معلم خیابان دانش
          </div>
          <div className="flex flex-wrap gap-3 items-center">
            <span className="text-text-secondary flex gap-2.5">
              <BedSVG /> 4 خوابه
            </span>
            <p className="h-4 border border-border hidden md:block"></p>
            <span className="text-text-secondary flex gap-2.5">
              <CarSVG /> 1 خوابه
            </span>
            <p className="h-4 border border-border hidden md:block"></p>
            <span className="text-text-secondary flex gap-2.5">
              <BathroomSVG /> 2 حمام
            </span>
            <p className="h-4 border border-border hidden md:block"></p>
          </div>
        </div>
      </div>
      <footer className="flex flex-col-reverse md:flex-row justify-between px-[19px] gap-4 md:gap-0">
        <div className="flex gap-[19px] w-full md:w-auto">
          <button className="px-[19px] py-[12px] rounded-xl bg-primary text-white flex-1 md:flex-auto">
            رزرو ها
          </button>
          <button className="px-[19px] py-[12px] rounded-xl bg-primary text-white flex-1 md:flex-auto">
            رزرو ها
          </button>
        </div>
        <div className="bg-[#D9D9D9] w-full md:w-[410px] h-[44px] rounded-xl px-[20px] flex items-center justify-center">
          <div className="w-full flex justify-between">
            <p className="text-[#555555]"> 1,200,00 ت</p>
            <p className="text-[#555555]">: قیمت خرید</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
