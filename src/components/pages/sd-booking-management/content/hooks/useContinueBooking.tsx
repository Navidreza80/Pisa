import { continueBooking } from "@/utils/service/reserve/continue";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useContinueBooking = (refetch: () => void) => {
  const { mutate: handleContinue } = useMutation({
    mutationKey: ["CONTINUE_BOOKING"],
    mutationFn: (id: string) =>
      toast.promise(() => continueBooking(id), {
        success: "رزرو با موفقیت بازیابی شد",
        pending: "در حال بازیابی...",
      }),
    onSuccess: () => {
      refetch();
    },
  });
  return { handleContinue };
};
export default useContinueBooking;
