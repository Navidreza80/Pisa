import { useMutation } from "@tanstack/react-query";
import createFavorite from "../service/favorites/post";
import { toast } from "react-toastify";
import deleteFavorite from "../service/favorites/delete";

const useFavorite = (isFavorite, house_id, favorite_id, onSuccess) => {
  const { mutate: addFavorite } = useMutation({
    mutationKey: ["CREATE_FAVORITE"],
    mutationFn: () =>
      toast.promise(createFavorite(house_id), {
        pending: "درحال پردازش...",
        success: "ملک به لیست علاقه مندی افزوده شد",
        error: "خطا در افزودن ملک به علاقه مندی",
      }),
    onSuccess: () => {
      onSuccess();
    },
  });

  const { mutate: removeFavorite } = useMutation({
    mutationKey: ["DELETE_FAVORITE"],
    mutationFn: () =>
      toast.promise(deleteFavorite(favorite_id), {
        pending: "درحال پردازش...",
        success: "ملک از لیست علاقه مندی حذف شد",
        error: "خطا در حذف ملک از علاقه مندی",
      }),
    onSuccess: () => {
      onSuccess()
    },
  });

  const handleFavorite = () => {
    if(isFavorite){
        removeFavorite();
    } else if(!isFavorite){
        addFavorite()
    }
  }

  return {handleFavorite}
};
export default useFavorite;
