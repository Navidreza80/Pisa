import CanceledSVG from "@/components/common/svg/CanceledSVG";
import ConfirmedSVG from "@/components/common/svg/ConfirmedSVG";
import PendingSVG from "@/components/common/svg/pending-svg";
import { cn } from "@/lib/utils";

const Status = ({
  status,
}: {
  status: "pending" | "confirmed" | "canceled";
}) => {
  return (
    <span
      className={cn(
        "px-[2.5px] py-1 rounded-full text-[13px] font-medium bg-[#FF989A] flex gap-1 w-[89px] whitespace-nowrap items-center",
        status === "confirmed" && "bg-[#8CFF45]",
        status === "pending" && "bg-[#FAC100]"
      )}
    >
      {status == "pending" ? (
        <PendingSVG />
      ) : status == "confirmed" ? (
        <ConfirmedSVG />
      ) : (
        <CanceledSVG />
      )}
      {status == "pending"
        ? "در انتظار"
        : status == "confirmed"
          ? "تایید شده"
          : "لغو شده"}
    </span>
  );
};
export default Status;
