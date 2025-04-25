// Next built in components imports
import Image from "next/image";
// SVGs
import QuoteSVG from "@/components/common/svg/quote";
import Reload from "@/components/common/svg/reload";
import ToLeft from "@/components/common/svg/to-left";
import ToRight from "@/components/common/svg/to-right";

export default async function Comment() {
  return (
    <div className="mx-auto w-[656px] h-[230px] bg-white rounded-[24px] p-[24px] flex flex-col flex-wrap gap-[9px]">
      <div className="flex justify-end">
        <QuoteSVG />
      </div>
      <p dir="rtl" className="text-right text-[16px] font-[600]">
        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده
        از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و
        سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای
        متنوع با هدف بهبود ابزارهای کاربردی می باشد ...{" "}
      </p>
      <div className="flex justify-between">
        <div className="flex w-[140px] justify-between">
          <Reload />

          <ToLeft />

          <ToRight />
        </div>
        <div className="flex gap-x-[8px]">
          <div className="flex flex-col flex-wrap">
            <p className="font-[600] text-right text-[16px] text-[#232323]">
              پارسا آقایی
            </p>
            <p
              dir="rtl"
              className="font-[500] text-right text-[14px] font-yekannum text-[#5F5F5F]"
            >
              12 مرداد 1403
            </p>
          </div>
          <Image
            src={
              "https://static.vecteezy.com/system/resources/previews/026/625/600/non_2x/person-icon-symbol-design-illustration-vector.jpg"
            }
            alt="profile"
            width={48}
            height={48}
            className="rounded-[100px] border-black border-[1px]"
          />
        </div>
      </div>
    </div>
  );
}
