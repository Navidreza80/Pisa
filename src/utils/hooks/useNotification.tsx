import { useMutation } from "@tanstack/react-query";
import { sendRealTimeNotif } from "../service/notifications/SendNotif";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const useNotification = ({ title, message, type }) => {
  const router = useRouter();
  const { mutate: sendNotification } = useMutation({
    mutationKey: ["SEND_NOTIFICATION"],
    mutationFn: () => sendRealTimeNotif({ title, message, type }),
    onSuccess: () =>
      setTimeout(() => {
        toast.success(
          <div className="flex flex-col gap-2 items-start font-yekan">
            <p>شما یک پیام جدید دارید!!</p>
            <button
              className="text-primary text-sm"
              onClick={() => {
                router.push("/dashboard/buyer/notifications");
                toast.dismiss();
              }}
            >
              مشاهده اعلان‌ها
            </button>
          </div>,
          { autoClose: 5000 }
        );
      }, 3000),
  });

  return { sendNotification };
};
export default useNotification;
