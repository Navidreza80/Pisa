import { deleteReservation } from "@/utils/service/reserve/delete";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useDeleteBooking = (refetch: () => void) => {
  const { mutate: handleDelete } = useMutation({
    mutationKey: ["DELETE_BOOKING"],
    mutationFn: (id: string) =>
      toast.promise(() => deleteReservation(id), {
        success: "رزرو با موفقیت حذف شد",
        pending: "در حال حذف کردن",
      }),
    onSuccess: () => {
      refetch();
    },
  });

  return { handleDelete };
};
export default useDeleteBooking;
