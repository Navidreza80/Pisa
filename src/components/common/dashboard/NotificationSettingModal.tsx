import Line from "@/components/common/dashboard/line";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import CloseBtn from "./CloseBtn";
import { getTranslations } from "next-intl/server";

const NotificationSettingModal = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const t = await getTranslations("notificationSettings");

  const switchInputs = [
    { text: t("reservationNotification") },
    { text: t("paymentNotification") },
    { text: t("discountNotification") },
    { text: t("systemNotification") },
  ];

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="w-[564px] h-[361px] p-0 bg-background flex flex-col">
        <DialogHeader className="hidden">
          <DialogTitle className="hidden"></DialogTitle>
        </DialogHeader>
        <div className="px-[19px] pt-[26px] w-full flex justify-between items-center flex-row-reverse">
          <h1 className="text-2xl">{t("title")}</h1>
          <CloseBtn />
        </div>
        <Line className="w-full !my-0" />
        <div className="flex px-[19px] pt-[19px] gap-y-[19px] flex-col">
          {switchInputs.map((item, index) => (
            <div
              key={index}
              className="w-full text-xl flex justify-between items-center"
            >
              <Switch className="bg-fade" />
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NotificationSettingModal;