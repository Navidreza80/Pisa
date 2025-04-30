import postFavorite from "@/utils/service/favourites/post";
import { Heart } from "lucide-react";
import WarningSVG from "../svg/warning";
import Button from "../button/button";
import { toast } from "react-toastify";
import deleteFavorite from "@/utils/service/favourites/delete";
// shadcn dialog imports
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export default function Favorite({
  userId,
  id,
  setIsOpen,
  isOpen,
}: {
  userId: string | number | undefined;
  id: string | number;
  setIsOpen: (value: boolean) => void;
  isOpen: boolean;
}) {
  return (
    <>
      <Heart
        onClick={async () => {
          const res = await postFavorite(userId, id);
          if ((res as { message?: string }).message) {
            setIsOpen(true);
          } else {
            toast.success("به لیست مورد علاقه اضافه شد");
          }
        }}
        className="text-text-secondary hover:text-text duration-300 transition-all cursor-pointer"
      />
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-[500px]" dir="rtl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold mb-2 mt-3 text-center">
              این ایتم قبلا به لیست اضافه شده است!
            </DialogTitle>
            <DialogDescription className="text-text-secondary text-center">
              مایل به حذف آن هستید؟
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center text-center">
            <WarningSVG color="#FF5555" size={100} />
            <div className="flex gap-3 w-full justify-center mt-2">
              <Button
                handleClick={() => setIsOpen(false)}
                className="min-w-[100px]"
              >
                خیر
              </Button>
              <Button
                className="min-w-[100px] bg-red-500 hover:bg-red-600"
                handleClick={async () => {
                  toast.promise(deleteFavorite(userId, id), {
                    pending: "در حال پردازش",
                    success: "از لیست مورد علاقه حذف شد",
                    error: "خطا!",
                  });
                  setIsOpen(false);
                }}
              >
                بله
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
