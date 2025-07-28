import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ErrorSVG from "../../dashboard/svg/ErrorSVG";
import { useTranslations } from "next-intl";
import { useState } from "react";

const ModalStep2 = ({
  title,
  desc,
  button,
  trigger,
  onConfirm,
}: {
  title: string;
  desc?: string;
  button: string;
  trigger: React.ReactNode;
  onConfirm: () => void;
}) => {
  const t = useTranslations("Overall");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div>{trigger}</div>
      </DialogTrigger>
      <DialogContent className="!p-0 rounded-[32px] bg-background border-0">
        <DialogHeader className="!p-0">
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <div className="md:w-135 pb-[19px] ">
          <div className="p-[19px] font-medium text-[15px] text-text-secondary leading-7 flex justify-between">
            <div className="flex flex-col m-auto gap-[55px]">
              <div className="mx-auto">
                <ErrorSVG />
              </div>
              <div>
                <h1 className="text-xl font-bold text-text text-center">
                  {title}
                </h1>
                {desc && (
                  <h1 className="text-[16px] font-[400] text-text text-center mt-3">
                    {desc}
                  </h1>
                )}
              </div>
              <div className="flex justify-center">
                <button
                  onClick={onConfirm}
                  className="bg-primary py-[9px] px-[26px] rounded-[12px] text-white text-[16px] cursor-pointer"
                >
                  {button}
                </button>
                <button onClick={() => setIsOpen(false)} className="w-[87px] text-center text-text text-[16px] cursor-pointer">
                  {t("cancel")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default ModalStep2;
