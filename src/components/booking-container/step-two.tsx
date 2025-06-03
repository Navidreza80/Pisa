import { formatNumber } from "@/utils/helper/format-number";
import { useAppDispatch } from "@/utils/hooks/react-redux/store/hook";
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

export default function BookingStepTwo() {
  const baseCLX = "text-5 text-center text-fade";
  const tableBaseCLX = "text-base font-semibold text-center";
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
      price: 1520000,
    },
  ];
  const dispatch = useAppDispatch();
  return (
    <div className="flex flex-col gap-y-[38px] mt-8">
      {/* Edit travelers */}
      <Body>
        <Header>
          <h1 className="flex gap-3 items-center">
            مشخصات مسافران <TravelersSVG color="black" />
          </h1>
          <h1 className="flex gap-3 items-center text-primary">
            ویرایش مسافران <Edit className="text-primary" />
          </h1>
        </Header>
        {/* Travelers */}
        <TableDashboard
          headerCLX="bg-transparent"
          pageInation={false}
          tableHeader={tableHeaderItems}
          tableContent={travelers.map((traveler) => (
            <tr key={traveler.id} className="text-right hover:bg-background/30">
              <td className={tableBaseCLX}>{traveler.age}</td>
              <td className={tableBaseCLX}>{traveler.name}</td>
              <td className={tableBaseCLX}>{traveler.gender}</td>
              <td className={tableBaseCLX}>{traveler.nationalNumber}</td>
              <td className={tableBaseCLX}>{traveler.birthDate}</td>
              <td className={tableBaseCLX}>{traveler.services}</td>
              <td className={tableBaseCLX}>{traveler.servicesPrice}</td>
              <td className={tableBaseCLX}>{formatNumber(traveler.price)} ت</td>
            </tr>
          ))}
        />
      </Body>

      {/* Extra costs */}
      <Body>
        <Header>
          <h1 className="flex gap-3 items-center">
            هزینه جانبی <CircleDollarSign className="text-text" />
          </h1>
        </Header>
        <div className="w-full justify-between flex px-4 py-5 leading-10">
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
          <h1 className="flex gap-3 items-center">
            <span className="text-primary text-base">
              (.اطلاعات بلیط و اطلاع رسانی بعدی به این آدرس ارسال می شود)
            </span>{" "}
            اطلاع رسانی سفر <MegaphoneIcon />
          </h1>
        </Header>
        <div className="w-full flex px-4 py-5 justify-end items-center gap-[25px]">
          <div className="flex items-center gap-1 flex-row-reverse">
            <Dot /> : ایمیل
            <span className="text-primary">
              navidrezaabbaszadeh89@gmail.com
            </span>
          </div>
          <span className="bg-border h-4 w-0.5" />
          <div className="flex items-center gap-1 flex-row-reverse">
            <Dot /> : شماره تماس
            <span className="text-primary">09229167194</span>
          </div>
        </div>
      </Body>

      {/* Discount code */}
      <Body>
        <Header>
          <h1 className="flex gap-3 items-center">
            کد تخفیف <MdDiscount />
          </h1>
        </Header>
        <div className="w-full flex px-4 py-5 justify-end items-center gap-[25px]">
          <Button className="bg-transparent !text-text border-2 border-primary text-base">
            اعمال کد تخفیف
          </Button>
          <InputText
            color="bg-border/30 border-border rounded-xl"
            label="کد تخفیف :"
            className="!rounded-full"
          />
        </div>
      </Body>

      {/* Submit reservation */}
      <div className="flex justify-between items-center border-2 border-dashed px-6 py-3 rounded-4xl">
        <div className="flex gap-2">
          {" "}
          <Button
            startContent={<ChevronLeft />}
            handleClick={() => dispatch(setBookingSteps(3))}
            className="bg-transparent !text-text border-2 border-primary text-base !w-auto"
          >
            پرداخت انلاین
          </Button>
          <Button
            endContent={<ChevronRight />}
            handleClick={() => dispatch(setBookingSteps(1))}
            className="bg-transparent !text-text border-2 border-primary text-base !w-auto"
          >
            مرحله قبل
          </Button>
        </div>

        <div className="flex gap-1 flex-row-reverse text-2xl">
          <h1 dir="rtl">قیمت هتل :</h1>
          <h3 dir="rtl" className="text-primary">
            {formatNumber(1500000)}ت
          </h3>
        </div>
      </div>
    </div>
  );
}
