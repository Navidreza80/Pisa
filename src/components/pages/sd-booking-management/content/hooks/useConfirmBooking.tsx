import { confirmBooking } from "@/utils/service/reserve/confirm";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useConfirmBooking = ({
  refetch,
}: {
  refetch: () => void | Promise<unknown>;
}) => {
  const { mutate: handleConfirm } = useMutation({
    mutationKey: ["CONFIRM_BOOKING"],
    mutationFn: (id: string) =>
      toast.promise(() => confirmBooking(id), {
        success: "رزرو با موفقیت تایید شد",
        pending: "در حال تایید...",
      }),
    onSuccess: () => {
      refetch();
    },
  });
  return { handleConfirm };
};
export default useConfirmBooking;
