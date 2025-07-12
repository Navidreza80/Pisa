import Button from "../button";
import WarningSVG from "../svg/warning";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useTranslations } from "next-intl";

const WarningModal = ({ title, children, onConfirm }) => {
  const t = useTranslations("WarningModal");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div>{children}</div>
      </DialogTrigger>
      <DialogContent className="bg-background" >
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <div className="w-full flex justify-center flex-wrap gap-y-7">
          <WarningSVG />
          <h1 className="text-[24px] w-full font-bold text-text text-center">
            {title}
          </h1>
          <div className="flex gap-2">
            <Button className="!bg-transparent !text-text">
              {t("cancel")}
            </Button>
            <Button handleClick={onConfirm} className=" !w-auto">
              {t("agree")}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default WarningModal;
