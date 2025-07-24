"use client";
import { SaveSVG } from "@/components/svg";
import postWishlist from "@/utils/service/whishlist/post";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const SaveProperty = ({ houseId }: { houseId: string }) => {
  const { mutate: handleSave } = useMutation({
    mutationKey: ["SAVE_PROPERTY"],
    mutationFn: () =>
      toast.promise(postWishlist({ houseId: houseId }), {
        pending: "درحال ذخیره...",
        success: "خانه با موفقیت به لیست ذخیره اضافه شد",
        error: "خطا در ذخیره سازی.",
      }),
  });
  return (
    <p
      onClick={() => handleSave()}
      className="border-text-secondary border rounded-full w-12 h-12 flex justify-center items-center"
    >
      <SaveSVG />
    </p>
  );
};
export default SaveProperty;
