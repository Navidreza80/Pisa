import { cancelBooking } from "@/utils/service/reserve/cancel";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useCancelBooking = ({
  refetch,
}: {
  refetch: () => void | Promise<unknown>;
}) => {
  const { mutate: handleCancel } = useMutation({
    mutationKey: ["CANCEL_BOOKING"],
    mutationFn: (id: string) =>
      toast.promise(() => cancelBooking(id), {
        success: "رزرو با موفقیت لفو شد",
        pending: "در حال لفو کردن...",
      }),
    onSuccess: () => {
      refetch();
    },
  });

  return { handleCancel };
};
export default useCancelBooking;
