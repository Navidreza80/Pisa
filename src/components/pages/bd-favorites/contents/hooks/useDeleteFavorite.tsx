import deleteFavorite from "@/utils/service/favorites/delete";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useDeleteFavorite = (refetch: () => void) => {
  const { mutate: handleDelete } = useMutation({
    mutationKey: ["DELETE_FAVORITE"],
    mutationFn: (id: string) =>
      toast.promise(() => deleteFavorite(id), {
        success: "علاقه مندی با موفقیت حذف شد",
        pending: "در حال حذف...",
      }),
    onSuccess: () => {
      refetch();
    },
  });

  return { handleDelete };
};
export default useDeleteFavorite;
