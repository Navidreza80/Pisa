import Container from "@/components/common/container/container";
import InputText from "@/components/common/inputs/text-inputs";
import ArrowSVG from "@/components/common/svg/arrow";
import MapSVG from "@/components/common/svg/map";
import { Input } from "@/components/ui/input";
import { getHouseById } from "@/utils/service/house/get-by-id";

export default async function HouseDetail({
  params: { id },
}: {
  params: { id: string };
}) {
  const detail = await getHouseById(id);
  return (
    <Container>
      <div className="w-[85.5%] flex flex-wrap gap-y-8">
        <div className="w-full flex flex-col gap-3 sticky">
          <h1 className="text-[32px] text-text font-bold">{detail.title}</h1>
          <h3 className="text-text-secondary flex gap-2 justify-end">
            {detail.address}
            <MapSVG color="gray" />
          </h3>
        </div>
        <div className="w-full flex justify-between gap-8">
          <div className="w-[50%] flex flex-col gap-5">
            <h1 className="font-bold text-2xl text-text">
              چرا هتل همایون رو انتخاب کنیم؟
            </h1>
            <h3 className="text-[##323232] text-base">
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
              استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
              در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد
              نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد،
              کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان
              جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای
              طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان
              فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری
              موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد
              نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل
              دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
            </h3>
            <img src={detail.photos[1]} className="h-[253px] rounded-3xl" />
            <h1 className="font-bold text-2xl text-text">
              چرا هتل همایون رو انتخاب کنیم؟
            </h1>
            <h3 className="text-[##323232] text-base">
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
              استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
              در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد
              نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد،
              کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان
              جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای
              طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان
              فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری
              موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد
              نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل
              دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
            </h3>
            <div className="mt-10 flex flex-col gap-4">
              <h4 className="text-primary">امکانات هتل</h4>
              <div className="w-full flex flex-wrap justify-end gap-3">
                <span className="border-text-secondary rounded-full px-4 py-3 border text-text-secondary flex justify-start gap-3 ">
                  <p className="font-yekannum text-text">2 خواب</p>تعداد
                  اتاق{" "}
                </span>
                <span className="border-text-secondary rounded-full px-4 py-3 border text-text-secondary flex justify-start gap-3 ">
                  <p className="font-yekannum text-text">2 خواب</p>تعداد
                  اتاق{" "}
                </span>
                <span className="border-text-secondary rounded-full px-4 py-3 border text-text-secondary flex justify-start gap-3 ">
                  <p className="font-yekannum text-text">2 خواب</p>تعداد
                  اتاق{" "}
                </span>
              </div>
            </div>
            <div className="mt-10 flex flex-col gap-4">
              <h4 className="text-primary">امکانات هتل</h4>
              <div className="w-full flex flex-wrap justify-between gap-3">
                <div className="!w-[calc(50%-27px)] flex flex-col gap-y-3">
                  <p>تاریخ ورود</p> <InputText width="!w-full" />
                </div>
                <div className="!w-[calc(50%-27px)] flex flex-col gap-y-3">
                  <p>تاریخ ورود</p> <InputText width="!w-full" />
                </div>
                <div className="!w-[calc(50%-27px)] flex flex-col gap-y-3">
                  <p>تاریخ ورود</p> <InputText width="!w-full" />
                </div>
                <div className="!w-[calc(50%-27px)] flex flex-col gap-y-3">
                  <p>تاریخ ورود</p> <InputText width="!w-full" />
                </div>
              </div>
            </div>
            <div className="mt-6 flex gap-4 borde justify-between flex-wrap">
              <div className="flex gap-6">
                <p className="border-text-secondary border rounded-full w-12 h-12 flex justify-center items-center">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.5 14.5L14.5 9.5"
                      stroke="black"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    />
                    <path
                      d="M16.8463 14.6095L19.4558 12C21.5147 9.94112 21.5147 6.60302 19.4558 4.54415C17.397 2.48528 14.0589 2.48528 12 4.54415L9.39045 7.1537M14.6095 16.8463L12 19.4558C9.94113 21.5147 6.60303 21.5147 4.54416 19.4558C2.48528 17.3969 2.48528 14.0588 4.54416 12L7.1537 9.39045"
                      stroke="black"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    />
                  </svg>
                </p>
                <p className="w-12 h-12 bg-primary rounded-full flex justify-center items-center">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 4.5C5.50442 5.70104 3 8.94175 3 12.7511C3 13.9579 3.25134 15.1076 3.70591 16.1534M15 4.5C18.4956 5.70104 21 8.94175 21 12.7511C21 13.7736 20.8195 14.7552 20.4879 15.6674M16.5 20.3296C15.1762 21.074 13.6393 21.5 12 21.5C10.3607 21.5 8.82378 21.074 7.5 20.3296"
                      stroke="white"
                      stroke-width="1.5"
                    />
                    <path
                      d="M15 5C15 6.65685 13.6569 8 12 8C10.3431 8 9 6.65685 9 5C9 3.34315 10.3431 2 12 2C13.6569 2 15 3.34315 15 5Z"
                      stroke="white"
                      stroke-width="1.5"
                    />
                    <path
                      d="M5 22C6.65685 22 8 20.6569 8 19C8 17.3431 6.65685 16 5 16C3.34315 16 2 17.3431 2 19C2 20.6569 3.34315 22 5 22Z"
                      stroke="white"
                      stroke-width="1.5"
                    />
                    <path
                      d="M19 22C20.6569 22 22 20.6569 22 19C22 17.3431 20.6569 16 19 16C17.3431 16 16 17.3431 16 19C16 20.6569 17.3431 22 19 22Z"
                      stroke="white"
                      stroke-width="1.5"
                    />
                  </svg>
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <h1 className="text-text">قیمت</h1>
                <div className="flex flex-row-reverse gap-[5px]">
                  <h1 className="text-[20px] font-[700] my-auto font-yekannum">
                    1500000
                  </h1>
                  <p className="text-[12px] font-[700] my-auto text-text-secondary ">
                    تومان
                  </p>
                </div>
              </div>
              <button className="bg-primary w-full rounded-full mt-4 h-12 text-white">
                همین الان رزرو کن
              </button>
            </div>
            <div className="mt-14 flex flex-col gap-3">
              <h2 className="text-primary">نظرات کاربران</h2>
              <Input
                className="border-text-secondary h-[102px] px-4 py-6 placeholder:text-text-secondary items-start rounded-3xl"
                dir="rtl"
                placeholder="نظر خود را درباره این هتل بنویسید..."
              />
              <button className="bg-primary w-full rounded-full h-12 mt-1 text-white">
                ارسال نظر
              </button>
            </div>
            <div className="mt-10">
              <div className="flex justify-end gap-x-3">
                <div className="flex flex-col">
                  <h2 className="text-text">عباس بهبودی</h2>
                  <h3
                    className="text-text-secondary text-sm font-yekannum"
                    dir="rtl"
                  >
                    15 اردیبهشت 1404
                  </h3>
                  <p className="mt-3">
                    راضی نبودم ، چرت محض بود این هتل . 25 موقعیت پنالتی داشتیم
                    نگرفتن برامون واقعا این چه وضعشه
                  </p>
                  <div className="mt-[13px] flex gap-6 justify-end">
                    <span className="font-yekannum text-sm text-text-secondary flex gap-1"><ArrowSVG /> مشاهده 12 پاسخ </span>
                    <span className="text-sm text-primary">پاسخ دادن</span>
                  </div>
                </div>
                <div className="h-full">
                  <img
                    src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cmVhbCUyMHN0YXRlfGVufDB8fDB8fHww"
                    className="w-12 h-12 rounded-full"
                  />
                </div>
              </div>
            </div>
          </div>
          <img
            src={detail.photos[0]}
            className="w-[47%] rounded-t-3xl rounded-b-2xl h-[387px]"
          />
        </div>
      </div>
    </Container>
  );
}
