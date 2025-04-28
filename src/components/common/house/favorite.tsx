import postFavorite from "@/utils/service/favourites/post";
import { Modal } from "antd";
import { Heart } from "lucide-react";
import WarningSVG from "../svg/warning";
import Button from "../button/button";
import { toast } from "react-toastify";
import deleteFavorite from "@/utils/service/favourites/delete";

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
      <Modal
        open={isOpen}
        width={500}
        styles={{
          body: {
            maxHeight: "500px",
            overflow: "auto",
            padding: "16px",
          },
        }}
        footer={null}
        onCancel={() => setIsOpen(false)}
      >
        <div className="flex flex-col items-center text-center py-4">
          <WarningSVG color="#FF5555" size={48} />
          <h1 className="text-xl font-bold mb-2 mt-3">
            این ایتم قبلا به لیست اضافه شده است!
          </h1>
          <h2 className="text-text-secondary mb-6">مایل به حذف آن هستید؟</h2>
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
      </Modal>
    </>
  );
}
