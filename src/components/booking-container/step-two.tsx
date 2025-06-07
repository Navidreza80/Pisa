import { formatNumber } from "@/utils/helper/format-number";
import {
  useAppDispatch,
  useAppSelector,
} from "@/utils/hooks/react-redux/store/hook";
import { setBookingSteps } from "@/utils/hooks/react-redux/store/slices/booking-step";
import {
  ChevronLeft,
  ChevronRight,
  CircleDollarSign,
  Dot,
  Edit,
  MegaphoneIcon,
} from "lucide-react";
import { MdDiscount } from "react-icons/md";
import Button from "../common/button";
import InputText from "../common/inputs/text-input-with-label";
import TableDashboard from "../dashboard/table";
import { TravelersSVG } from "../svg";
import Body from "./body";
import Header from "./header";
import formatToPersianDate from "@/utils/helper/format-date";
import { getAgeGroup } from "@/utils/helper/age-identifier";
import { bookHotel } from "@/utils/service/reserve/post";

// Card component for mobile view
const TravelerCard = ({ traveler }) => {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-border mb-3">
      <div className="flex justify-between items-center mb-2">
        <span className="text-primary font-semibold">{traveler.price}</span>
        <span className="bg-primary/10 text-primary px-2 py-1 rounded-lg text-xs">
          {traveler.age}
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-fade text-xs">نام و نام خانوادگی:</span>
          <span className="font-medium text-sm">{traveler.name}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-fade text-xs">جنسیت:</span>
          <span className="font-medium text-sm">{traveler.gender}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-fade text-xs">کدملی / شماره یا پاسپورت:</span>
          <span className="font-medium text-sm">{traveler.nationalNumber}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-fade text-xs">تاریخ تولد:</span>
          <span className="font-medium text-sm">{traveler.birthDate}</span>
        </div>

        {traveler.services !== "-" && (
          <div className="flex justify-between">
            <span className="text-fade text-xs">خدمات:</span>
            <span className="font-medium text-sm">{traveler.services}</span>
          </div>
        )}

        {traveler.servicesPrice !== "-" && (
          <div className="flex justify-between">
            <span className="text-fade text-xs">مبلغ خدمات:</span>
            <span className="font-medium text-sm">
              {traveler.servicesPrice}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default function BookingStepTwo() {
  const baseCLX = "text-xs md:text-5 text-center text-fade";
  const tableBaseCLX = "text-xs md:text-base font-semibold text-center";
  const tableHeaderItems = [
    { text: "بازه سنی", clx: `rounded-r-xl ${baseCLX}` },
    { text: "نام و نام خانوادگی", clx: baseCLX },
    { text: "جنسیت", clx: baseCLX },
    { text: "کدملی / شماره یا پاسپورت", clx: baseCLX },
    { text: "تاریخ تولد", clx: baseCLX },
    { text: "خدمات", clx: baseCLX },
    { text: "مبلغ خدمات", clx: baseCLX },
    { text: "قیمت", clx: `rounded-l-xl ${baseCLX}` },
  ];
  const travelers = [
    {
      id: 1,
      age: "بزرگسال",
      name: "نویدرضا عباس زاده",
      gender: "مرد",
      nationalNumber: "09229167194",
      birthDate: "1350 / 5 / 12",
      services: "-",
      servicesPrice: "-",
      price: "1.520.000 ت",
    },
  ];
  const dispatch = useAppDispatch();
  const booking = useAppSelector((state) => state.bookingCreate);
  const handleClick = async () => {
    await bookHotel(booking);
  };
  return (
    <div className="flex flex-col gap-y-4 md:gap-y-[38px] mt-4 md:mt-8">
      {/* Edit travelers */}
      <Body>
        <Header>
          <h1 className="flex gap-2 md:gap-3 items-center text-sm md:text-base">
            مشخصات مسافران <TravelersSVG color="black" />
          </h1>
          <h1 className="flex gap-2 md:gap-3 items-center text-primary text-sm md:text-base">
            ویرایش مسافران <Edit className="text-primary w-4 md:w-5" />
          </h1>
        </Header>
        {/* Travelers - Mobile Cards */}
        <div className="md:hidden px-2 py-3">
          {travelers.map((traveler) => (
            <TravelerCard key={traveler.id} traveler={traveler} />
          ))}
        </div>
        {/* Travelers - Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <TableDashboard
            headerCLX="bg-transparent"
            pageInation={false}
            tableHeader={tableHeaderItems}
            tableContent={booking.traveler_details.map((traveler) => (
              <tr
                key={traveler.id}
                className="text-right hover:bg-background/30"
              >
                <td className={tableBaseCLX}>
                  {getAgeGroup(traveler.birthDate)}
                </td>
                <td className={tableBaseCLX}>
                  {traveler.firstName + " " + traveler.lastName}
                </td>
                <td className={tableBaseCLX}>{traveler.gender}</td>
                <td className={tableBaseCLX}>{traveler.nationalId}</td>
                <td className={tableBaseCLX}>
                  {formatToPersianDate(traveler.birthDate)}
                </td>
                <td className={tableBaseCLX}>-</td>
                <td className={tableBaseCLX}>-</td>
                <td className={tableBaseCLX}>{formatNumber(1500000)}</td>
              </tr>
            ))}
          />
        </div>
      </Body>

      {/* Rest of the component remains unchanged */}
      {/* Extra costs */}
      <Body>
        <Header>
          <h1 className="flex gap-2 md:gap-3 items-center text-sm md:text-base">
            هزینه جانبی <CircleDollarSign className="text-text w-4 md:w-5" />
          </h1>
        </Header>
        <div className="w-full justify-between flex px-2 md:px-4 py-3 md:py-5 leading-7 md:leading-10 text-sm md:text-base">
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده
          از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و
          سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای
          متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه
          درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با
          نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص{" "}
        </div>
      </Body>

      {/* Notifications */}
      <Body>
        <Header>
          <h1 className="flex gap-2 md:gap-3 items-center flex-wrap text-sm md:text-base">
            <span className="text-primary text-xs md:text-base">
              (.اطلاعات بلیط و اطلاع رسانی بعدی به این آدرس ارسال می شود)
            </span>{" "}
            اطلاع رسانی سفر <MegaphoneIcon className="w-4 md:w-5" />
          </h1>
        </Header>
        <div className="w-full flex flex-col md:flex-row px-2 md:px-4 py-3 md:py-5 md:justify-end items-start md:items-center gap-2 md:gap-[25px]">
          <div className="flex items-center gap-1 flex-row-reverse text-sm md:text-base">
            <Dot className="w-4 md:w-5" /> : ایمیل
            <span className="text-primary break-all">
              {booking.sharedEmail}
            </span>
          </div>
          <span className="hidden md:block bg-border h-4 w-0.5" />
          <div className="flex items-center gap-1 flex-row-reverse text-sm md:text-base">
            <Dot className="w-4 md:w-5" /> : شماره تماس
            <span className="text-primary">{booking.sharedMobile}</span>
          </div>
        </div>
      </Body>

      {/* Discount code */}
      <Body>
        <Header>
          <h1 className="flex gap-2 md:gap-3 items-center text-sm md:text-base">
            کد تخفیف <MdDiscount className="w-4 md:w-5" />
          </h1>
        </Header>
        <div className="w-full flex flex-col-reverse md:flex-row px-2 md:px-4 py-3 md:py-5 md:justify-end items-center gap-3 md:gap-[25px]">
          <Button className="bg-transparent !text-text border-2 border-primary text-sm md:text-base w-full md:w-auto">
            اعمال کد تخفیف
          </Button>
          <InputText
            color="bg-border/30 border-border rounded-xl"
            label="کد تخفیف :"
            className="!rounded-full w-full md:w-auto"
          />
        </div>
      </Body>

      {/* Submit reservation */}
      <div className="flex flex-col md:flex-row justify-between items-center border-2 border-dashed px-3 md:px-6 py-3 rounded-2xl md:rounded-4xl gap-3 md:gap-0">
        <div className="flex gap-2 w-full md:w-auto">
          <Button
            startContent={<ChevronLeft />}
            handleClick={() => {
              handleClick();
              dispatch(setBookingSteps(3));
            }}
            className="bg-transparent !text-text border-2 border-primary text-sm md:text-base !w-full md:!w-auto"
          >
            پرداخت انلاین
          </Button>
          <Button
            endContent={<ChevronRight />}
            handleClick={() => dispatch(setBookingSteps(1))}
            className="bg-transparent !text-text border-2 border-primary text-sm md:text-base !w-full md:!w-auto"
          >
            مرحله قبل
          </Button>
        </div>

        <div className="flex gap-1 flex-row-reverse text-lg md:text-2xl">
          <h1 dir="rtl">قیمت هتل :</h1>
          <h3 dir="rtl" className="text-primary">
            {formatNumber(1500000)}ت
          </h3>
        </div>
      </div>
    </div>
  );
}
