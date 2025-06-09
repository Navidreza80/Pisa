import BathroomSVG from "@/components/common/svg/bathroom";
import BedSVG from "@/components/common/svg/bed";
import CarSVG from "@/components/common/svg/car";
import Share from "@/components/common/svg/share";
import Star from "@/components/common/svg/star";
import Line from "@/components/common/dashboard/line";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CloseBtn from "@/components/common/dashboard/CloseBtn";
import { useTranslations } from "next-intl";

const ReserveDetail = () => {
  const t = useTranslations('ReserveDetail');

  return (
    <Dialog>
      <DialogTrigger asChild>
        <h1>{t('details')}</h1>
      </DialogTrigger>
      <DialogContent className="!p-0 !max-w-fit">
        <DialogHeader className="!p-0">
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <div className="w-[918px] pb-[19px] bg-background rounded-xl">
          <header className="pb-[3.7px] pt-[24px] px-[19px] flex justify-between items-center">
            <CloseBtn />
            <h1 className="text-text text-[32px] font-extrabold">
              {t('hotelName')}
            </h1>
          </header>
          <Line />
          <div className="p-[19px] font-medium text-[15px] text-text-secondary leading-7 flex justify-between">
            <div className="flex flex-col w-[452px]">
              <p>{t('description')}</p>
              <div dir="rtl" className="flex gap-2.5 mt-5 items-center">
                <span className="text-fade font-medium">{t('tags')}:</span>
                <span className="rounded-xl border border-primary flex items-center justify-center w-[117px] h-[36px]">
                  {t('apartment')}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-[19px]" dir="rtl">
              <div className="w-[410px] h-[325px] bg-gray-200 rounded-lg relative">
                <span className="absolute top-[15px] right-[15px] h-10 py-1 px-3 bg-primary rounded-[10px] text-white flex gap-1.5 items-center">
                  <Star />{t('starRating', { stars: 5 })}
                </span>
                <span className="absolute top-[15px] left-[15px] w-10 aspect-square justify-center bg-primary rounded-[10px] text-white flex gap-1.5 items-center">
                  <Share />
                </span>
              </div>
              <div className="flex flex-wrap overflow-hidden text-ellipsis whitespace-nowrap w-[410px]">
                <p className="text-fade">{t('address')}: </p>
                {t('hotelAddress')}
              </div>
              <div className="flex gap-3 items-center">
                <span className="text-text-secondary flex gap-2.5">
                  <BedSVG /> {t('bedrooms', { count: 4 })}
                </span>
                <p className="h-4 border border-border"></p>
                <span className="text-text-secondary flex gap-2.5">
                  <CarSVG /> {t('parking', { count: 1 })}
                </span>
                <p className="h-4 border border-border"></p>
                <span className="text-text-secondary flex gap-2.5">
                  <BathroomSVG /> {t('bathrooms', { count: 2 })}
                </span>
                <p className="h-4 border border-border"></p>
              </div>
            </div>
          </div>
          <footer className="flex justify-between px-[19px]">
            <div className="flex gap-[19px]">
              <button className="px-[19px] py-[12px] rounded-xl bg-primary text-white">
                {t('reservations')}
              </button>
              <button className="px-[19px] py-[12px] rounded-xl bg-primary text-white">
                {t('reservations')}
              </button>
            </div>
            <div className="bg-[#D9D9D9] w-[410px] h-[44px] rounded-xl px-[20px] flex items-center justify-center">
              <div className="w-full flex justify-between">
                <p className="text-[#555555]">1,200,00 {t('currency')}</p>
                <p className="text-[#555555]">: {t('purchasePrice')}</p>
              </div>
            </div>
          </footer>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default ReserveDetail;
