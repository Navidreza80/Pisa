import BathroomSVG from "@/components/common/svg/bathroom";
import BedSVG from "@/components/common/svg/bed";
import CarSVG from "@/components/common/svg/car";
import Share from "@/components/common/svg/share";
import Star from "@/components/common/svg/star";
import Line from "@/components/dashboard/buyer/line";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CloseBtn from "../close-btn";

const ReserveDetail = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <h1>جزئیات</h1>
      </DialogTrigger>
      <DialogContent className="!p-0 !max-w-fit">
        <DialogHeader className="!p-0">
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <div className="w-[918px] pb-[19px] bg-background rounded-xl">
          <header className="pb-[3.7px] pt-[24px] px-[19px] flex justify-between items-center">
            <CloseBtn />
            <h1 className="text-text text-[32px] font-extrabold ">
              هتل همایون فر کیش ایران
            </h1>
          </header>
          <Line />
          <div className="p-[19px] font-medium text-[15px] text-text-secondary leading-7 flex justify-between">
            <div className="flex flex-col w-[452px]">
              <p>
                آپارتمانی دنج و آرام در قلب شهر، جایی که زندگی روزمره راحت و
                سبک‌تر است. فضایی مدرن با طراحی منحصربه‌فرد، یادآور خانه‌های دنج
                و دل‌نشین. محلی برای لحظه‌های خوش، آرامش و شروعی نو در زندگی
                روزمره‌تان. آپارتمانی دنج و آرام در قلب شهر، جایی که زندگی
                روزمره راحت و سبک‌تر است. فضایی مدرن با طراحی منحصربه‌فرد،
                یادآور خانه‌های دنج و دل‌نشین. محلی برای لحظه‌های خوش، آرامش و
                شروعی نو در زندگی روزمره‌تان. آپارتمانی دنج و آرام در قلب شهر،
                جایی که زندگی روزمره راحت و سبک‌تر است. فضایی مدرن با طراحی
                منحصربه‌فرد، یادآور خانه‌های دنج و دل‌نشین. محلی برای لحظه‌های
                خوش، آرامش و شروعی نو در زندگی روزمره‌تان. محلی برای لحظه‌های
                خوش، آرامش و شروعی نو در زندگی روزمره‌تان. محلی برای لحظه‌های
                خوش، آرامش و شروعی نو در زندگی روزمره‌تان.
              </p>
              <div dir="rtl" className="flex gap-2.5 mt-5 items-center">
                <span className="text-fade font-medium">برچسب ها :</span>
                <span className="rounded-xl border border-primary flex items-center justify-center w-[117px] h-[36px]">
                  آپارتمان
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-[19px]" dir="rtl">
              <div
                // src={null}
                // alt="house image"
                // width={500}
                // height={500}
                className="w-[410px] h-[325px] bg-gray-200 rounded-lg relative"
              >
                <span className="absolute top-[15px] right-[15px] h-10 py-1 px-3 bg-primary rounded-[10px] text-white flex gap-1.5 items-center">
                  <Star />5 ستاره
                </span>
                <span className="absolute top-[15px] left-[15px] w-10 aspect-square justify-center bg-primary rounded-[10px] text-white flex gap-1.5 items-center">
                  <Share />
                </span>
              </div>
              <div className="flex flex-wrap overflow-hidden text-ellipsis whitespace-nowrap w-[410px]">
                <p className="text-fade ">آدرس : </p>ساری خیابان معلم خیابان
                دانش
              </div>
              <div className="flex gap-3 items-center">
                <span className="text-text-secondary flex gap-2.5">
                  <BedSVG /> 4 خوابه
                </span>
                <p className="h-4 border border-border"></p>
                <span className="text-text-secondary flex gap-2.5">
                  <CarSVG /> 1 خوابه
                </span>
                <p className="h-4 border border-border"></p>
                <span className="text-text-secondary flex gap-2.5">
                  <BathroomSVG /> 2 حمام
                </span>
                <p className="h-4 border border-border"></p>
              </div>
            </div>
          </div>
          <footer className="flex justify-between px-[19px]">
            <div className="flex gap-[19px]">
              <button className="px-[19px] py-[12px] rounded-xl bg-primary text-white">
                رزرو ها
              </button>
              <button className="px-[19px] py-[12px] rounded-xl bg-primary text-white">
                رزرو ها
              </button>
            </div>
            <div className="bg-[#D9D9D9] w-[410px] h-[44px] rounded-xl px-[20px] flex items-center justify-center">
              <div className="w-full flex justify-between">
                <p className="text-[#555555]"> 1,200,00 ت</p>
                <p className="text-[#555555]">: قیمت خرید</p>
              </div>
            </div>
          </footer>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default ReserveDetail;
