import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ErrorSVG from "../../dashboard/svg/ErrorSVG";
import { useTranslations } from "next-intl";

const ModalStep2 = ({
  title,
  desc,
  button,
  name,
  onConfirm,
}: {
  title: string;
  desc?: string;
  button: string;
  name: string;
  onConfirm: () => void;
}) => {
  const t = useTranslations("Overall");
  return (
    <Dialog>
      <DialogTrigger asChild>
        <h1>{name}</h1>
      </DialogTrigger>
      <DialogContent className="!p-0 !max-w-fit rounded-[32px] bg-background border-0">
        <DialogHeader className="!p-0">
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <div className="w-135 pb-[19px] ">
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
                <button className="w-[87px] text-center text-text text-[16px] cursor-pointer">
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
