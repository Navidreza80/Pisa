import CanclePopover from "@/components/dashboard/svg/CanclePopover";
import CheckPopover from "@/components/dashboard/svg/CheckPopover";
import DeletePopover from "@/components/dashboard/svg/DeletePopover";
import DetailPopover from "@/components/dashboard/svg/DetailPopover";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { MoreHorizontal } from "lucide-react";

export const BookingCard = ({ booking, t, onActionClick }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-border mb-4 overflow-hidden">
      <div className="flex gap-3 p-3 border-b border-border">
        <div className="bg-text-secondary/30 w-20 h-16 rounded-[12px]" />
        <div className="flex-1">
          <h3 className="font-medium text-base">{booking.hotel}</h3>
          <p className="text-sm text-text-secondary">{booking.date}</p>
          <span
            className={cn(
              "inline-block mt-1 px-2 py-0.5 rounded-full text-white text-xs font-medium",
              booking.status === t("status.approved") && "bg-lime-400",
              booking.status === t("status.pending") && "bg-orange-400"
            )}
          >
            {booking.status}
          </span>
        </div>
      </div>

      <div className="p-3 flex justify-between items-center">
        <div className="text-sm font-medium">
          <span className="text-text-secondary">
            {t("tableHeaders.price")}:{" "}
          </span>
          <span className="text-primary">{booking.total}</span>
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <button className="p-1 rounded-full hover:bg-border/50">
              <MoreHorizontal className="h-5 w-5" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="text-right w-32 p-2 bg-background px-1 border-border shadow-sm shadow-border">
            <div className="space-y-2">
              <div
                className="w-full flex justify-end gap-2 cursor-pointer hover:bg-border rounded px-1"
                onClick={() => onActionClick("approve", booking.id)}
              >
                <h1>{t("actions.approve")}</h1>
                <div className="my-auto">
                  <CheckPopover />
                </div>
              </div>
              <div
                className="w-full flex justify-end gap-2 cursor-pointer hover:bg-border rounded px-1"
                onClick={() => onActionClick("cancel", booking.id)}
              >
                <h1>{t("actions.cancel")}</h1>
                <div className="my-auto">
                  <CanclePopover />
                </div>
              </div>
              <div
                className="w-full flex justify-end gap-2 cursor-pointer hover:bg-border rounded px-1"
                onClick={() => onActionClick("details", booking.id)}
              >
                <h1>{t("actions.details")}</h1>
                <div className="my-auto">
                  <DetailPopover />
                </div>
              </div>
              <div
                className="w-full flex justify-end gap-2 cursor-pointer hover:bg-border text-red-600 rounded px-1"
                onClick={() => onActionClick("delete", booking.id)}
              >
                <h1>{t("actions.delete")}</h1>
                <div className="my-auto">
                  <DeletePopover />
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
