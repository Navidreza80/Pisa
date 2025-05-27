import { formatNumber } from "@/utils/helper/format-number";
import Line from "../../buyer/line";
import { PinSVG } from "@/components/svg";

const Tag = ({ item }) => {
  return (
    <div className="w-[calc(25%-15px)] px-[19px] h-[130px] rounded-xl bg-background flex flex-row-reverse flex-wrap">
      <div className=" h-[60px] flex items-center flex-row-reverse gap-x-2.5">
        <div className="bg-border rounded-b-xl w-[50px] h-full flex justify-center items-center">
          <PinSVG />
        </div>
        <p className="font-medium">{item.text}</p>
      </div>
      <Line className="!mb-0 w-full" />
      <div
        dir="rtl"
        className="font-medium text-center w-full py-[13px] text-[20px]"
      >
        {formatNumber(item.price)} تومان
      </div>
    </div>
  );
};
export default Tag;
