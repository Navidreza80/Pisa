import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import Line from "./buyer/line";
import CloseBtn from "./close-btn";

const NotificationSettingModal = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const switchInputs = [
    { text: "نوتیفیکیشن رزرو" },
    { text: "نوتیفیکیشن پرداخت" },
    { text: "نوتیفیکیشن تخفیف" },
    { text: "نوتیفیکیشن سیستمی" },
  ];
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="w-[564px] h-[361px] p-0 bg-background flex flex-col">
        <DialogHeader className="hidden">
          <DialogTitle className="hidden"></DialogTitle>
        </DialogHeader>
        <div className="px-[19px] pt-[26px] w-full flex justify-between items-center flex-row-reverse">
          <h1 className="text-2xl">تنظیمات نوتیفیکیشن</h1>
          <CloseBtn />
        </div>
        <Line className="w-full !my-0" />
        <div className="flex px-[19px] pt-[19px] gap-y-[19px] flex-col">
          {switchInputs.map((item, index) => {
            return (
              <div
                key={index}
                className="w-full text-xl flex justify-between items-center"
              >
                <Switch className="bg-fade" />
                {item.text}
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default NotificationSettingModal;
