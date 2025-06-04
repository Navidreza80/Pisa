import { HouseItemsInterface } from "@/types/house";
import { formatNumber } from "@/utils/helper/format-number";
import {
  useAppDispatch,
  useAppSelector,
} from "@/utils/hooks/react-redux/store/hook";
import { setBookingSteps } from "@/utils/hooks/react-redux/store/slices/booking-step";
import { getHouseById } from "@/utils/service/house/get-by-id";
import { CalendarCheck, ChevronLeft, ChevronUp, Map, Star } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Button from "../common/button";
import InputText from "../common/inputs/text-input-with-label";
import Line from "../dashboard/buyer/line";
import { TimePastSVG, TravelersSVG } from "../svg";
import { Skeleton } from "../ui/skeleton";
import Body from "./body";
import Header from "./header";
import formatToPersianDate from "@/utils/helper/format-date";
import { toast } from "react-toastify";

export default function BookingStepOne() {
  const searchParams = useSearchParams();
  const dateStart = searchParams.get("enterDate");
  const dateEnd = searchParams.get("exitDate");
  const router = useRouter();
  const { id }: { id: string } = useParams();
  if (!dateEnd && !dateStart) {
    toast.error("لطفا ابتدا تاریخ رزرو را انتخاب کنید");
    router.push(`/property-detail/${id}`);
  }
  // const { reservedDates } = useAppSelector((state) => state.bookingCreate);
  const inputs = [
    { label: "نام شما :", isSelect: false },
    { label: "نام خانوادگی :", isSelect: false },
    { label: "جنسیت شما :", isSelect: true },
    { label: "کد ملی :", isSelect: false },
    { label: "تاریخ تولد :", isSelect: false },
  ];
  const [showTravelers, setShowTravelers] = useState(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hotelDetail, setHotelDetail] = useState<HouseItemsInterface | null>(
    null
  );
  const dispatch = useAppDispatch();
  const hotelData = async () => {
    try {
      setIsLoading(true);
      const response: HouseItemsInterface = await getHouseById(id);
      setHotelDetail(response);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    hotelData();
  }, []);

  return (
    <div className="flex flex-col gap-y-4 md:gap-y-[38px] mt-4 md:mt-8">
      {/* Hotel detail section */}
      <Body>
        <div className="w-full flex flex-col md:flex-row-reverse md:justify-between p-2 rounded-2xl gap-4 md:gap-0">
          <div className="flex gap-4 flex-row-reverse">
            <div className="bg-fade w-[120px] md:w-[156px] rounded-[20px] h-full md:h-[110px]" />
            <div
              dir="rtl"
              className="flex flex-col justify-between md:gap-0 gap-y-3"
            >
              <span
                dir="rtl"
                className="w-[82px] h-[28px] rounded-[8px] bg-primary flex items-center justify-center gap-1 text-[13px] text-white"
              >
                <Star className="w-4 aspect-square text-white" />
                {isLoading ? (
                  <Skeleton className="h-4 w-8 bg-primary/30" />
                ) : (
                  <>{hotelDetail?.rate} ستاره</>
                )}
              </span>
              <h1 className="font-semibold text-lg md:text-2xl">
                {isLoading ? (
                  <Skeleton className="h-6 md:h-8 w-32 md:w-48 bg-fade/30" />
                ) : (
                  hotelDetail?.title
                )}
              </h1>
              <div className="flex gap-1 text-fade text-sm md:text-base">
                <Map className="text-fade" />
                <div className="w-full md:w-[319px] md:overflow-ellipsis md:overflow-hidden md:whitespace-nowrap whitespace-normal">
                  {isLoading ? (
                    <Skeleton className="h-4 md:h-5 w-40 md:w-64 bg-fade/30" />
                  ) : (
                    hotelDetail?.address
                  )}
                </div>
              </div>
            </div>
          </div>

          <span className="w-full h-[2px] md:h-[107px] md:w-auto border-2 border-border" />

          <div className="flex flex-col justify-evenly">
            <h3 className="flex gap-1 flex-row-reverse text-fade text-sm md:text-base">
              <CalendarCheck className="w-4 md:w-5" /> : تاریخ ورود{" "}
              <span dir="rtl" className="text-primary">
                {formatToPersianDate(dateStart)}
              </span>
            </h3>
            <h3 className="flex gap-1 flex-row-reverse text-fade text-sm md:text-base mt-2 md:mt-0">
              <CalendarCheck className="w-4 md:w-5" /> : تاریخ ورود{" "}
              <span dir="rtl" className="text-primary">
                {formatToPersianDate(dateEnd)}
              </span>
            </h3>
          </div>

          <span className="w-full h-[2px] md:h-[107px] md:w-auto border-2 border-border" />

          <div className="flex md:flex-col md:justify-evenly justify-between sm:flex-row items-center">
            <p dir="rtl" className="text-xl md:text-2xl text-primary">
              {formatNumber(Number(hotelDetail?.price))} ت
            </p>
            <Link href="/reserve">
              <Button className="bg-transparent !text-text border-2 border-primary text-sm md:text-base">
                تغییر هتل
              </Button>
            </Link>
          </div>
        </div>
      </Body>

      {/* Travelers detail */}
      <Body>
        <Header>
          <h1 className="flex gap-3 items-center text-sm md:text-base">
            مشخصات مسافران <TravelersSVG color="black" />
          </h1>
          <h1 className="flex gap-3 items-center text-primary text-sm md:text-base">
            انتخاب مسافران قبلی <TimePastSVG color="#586cff" />
          </h1>
        </Header>
        {/* Add traveler */}
        <div className="w-full flex flex-wrap md:gap-[10px] gap-5 px-2 md:px-4">
          <div className="w-full flex">
            <ChevronUp
              onClick={() => setShowTravelers((prev) => !prev)}
              className={`text-fade transition-all duration-300 cursor-pointer ${showTravelers ? "rotate-0" : "rotate-180"}`}
            />
          </div>

          {Array(3)
            .fill(null)
            .map((_, index) => {
              return (
                showTravelers && (
                  <div
                    key={index}
                    className="flex w-full md:gap-[10px] gap-5 py-3"
                  >
                    {inputs.map((item, index) => {
                      return (
                        <InputText
                          color="bg-border/30 border-border rounded-xl"
                          key={index}
                          label={item.label}
                          className="md:flex-grow w-full md:w-auto transition-all duration-300"
                        />
                      );
                    })}
                  </div>
                )
              );
            })}
          <Line className="w-full" />
          <Button className="bg-transparent !text-text border-2 border-primary text-sm md:text-base">
            افزودن مسافر
          </Button>
        </div>
      </Body>

      {/* Send to other */}
      <Body>
        <Header>
          <h2 className="flex gap-3 items-center text-sm md:text-base flex-wrap">
            <span className="text-primary">
              (ارسال بلیط به ایمیل و شماره همراه دیگر)
            </span>
            ارسال بلیط به دیگری <TravelersSVG color="black" />
          </h2>
        </Header>

        <div className="w-full flex-col md:flex-row justify-between flex px-2 md:px-4 py-3 md:py-5 gap-4 md:gap-0">
          <div className="w-full md:w-5/12 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-[22px] order-1 md:order-2">
            <InputText
              color="bg-border/30 border-border rounded-xl"
              label="ایمیل :"
              className="!rounded-full"
            />
            <InputText
              color="bg-border/30 border-border rounded-xl"
              label="شماره تلفن :"
            />
          </div>
          <Button className="bg-transparent !text-text border-2 border-primary text-sm md:text-base order-2 md:order-1">
            ثبت اطلاعات
          </Button>
        </div>
      </Body>

      {/* Continue */}
      <div className="flex flex-col md:flex-row justify-between items-center border-2 border-dashed px-3 md:px-6 py-3 rounded-2xl md:rounded-4xl gap-3 md:gap-0">
        <Button
          handleClick={() => dispatch(setBookingSteps(2))}
          startContent={<ChevronLeft />}
          className="bg-transparent !text-text border-2 border-primary text-sm md:text-base !w-auto"
        >
          تایید و ادامه فرایند
        </Button>
        <div className="flex gap-1 flex-row-reverse text-lg md:text-2xl">
          <h1 dir="rtl">قیمت بلیط :</h1>
          <h3 dir="rtl" className="text-primary">
            {formatNumber(Number(hotelDetail?.price))} ت
          </h3>
        </div>
      </div>
    </div>
  );
}
