import Line from "@/components/common/dashboard/line";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { getNotificationSetting } from "@/utils/service/notifications/NotificationSetting";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useState } from "react";
import LoadingCustomized from "../loading";
import CloseBtn from "./CloseBtn";
import GetNotificationTextByType from "@/utils/helper/GetNotificationTextByType";
import { ToggleNotificationSetting } from "@/utils/service/notifications/ChangeNotificationSetting";
import { toast } from "react-toastify";

const NotificationSettingModal = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("notificationSettings");

  const {
    data: notificationSettings,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["NOTIFICATION_SETTINGS"],
    queryFn: getNotificationSetting,
  });

  const { mutate: ToggleSetting } = useMutation({
    mutationKey: ["TOGGLE_SETTING"],
    mutationFn: (payload: { id: string; on: boolean }) =>
      toast.promise(() => ToggleNotificationSetting(payload), {
        pending: "در حال تغییر تنظیمات...",
        success: "تنظیمات با موفقیت تغییر کرد.",
        error: "خطا در تغییر تنظیمات.",
      }),
    onSuccess: () => {
      refetch();
    },
  });

  return (
    <Dialog open={isOpen}>
      <DialogTrigger asChild>
        <div onClick={() => setIsOpen(true)}>{children}</div>
      </DialogTrigger>
      <DialogContent className="w-[564px] h-[361px] p-0 bg-background flex flex-col">
        <DialogHeader className="hidden">
          <DialogTitle className="hidden"></DialogTitle>
        </DialogHeader>
        {isLoading && <LoadingCustomized title="درحال پردازش تنظیمات..." />}
        {notificationSettings && (
          <>
            <div className="px-[19px] pt-[26px] w-full flex justify-between items-center flex-row">
              <h1 className="text-2xl">{t("title")}</h1>
              <CloseBtn onClick={() => setIsOpen(false)} />
            </div>
            <Line className="w-full !my-0" />
            <div className="flex px-[19px] pt-[19px] gap-y-[19px] flex-col">
              {notificationSettings.map((notification) => (
                <div
                  key={notification.notificationType}
                  className="w-full text-xl flex justify-between items-center"
                >
                  <span>
                    {GetNotificationTextByType(notification.notificationType)}
                  </span>
                  <Switch
                    defaultChecked={notification.criteria.on}
                    onCheckedChange={(val) =>
                      ToggleSetting({ id: notification.id, on: val })
                    }
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default NotificationSettingModal;
