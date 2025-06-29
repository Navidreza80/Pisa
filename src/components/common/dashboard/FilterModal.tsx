import { useState } from "react";
import Button from "../button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Line from "@/components/common/dashboard/line";
import CloseBtn from "./CloseBtn";
import { useTranslations } from "next-intl";

const FilterModal = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations('FilterModal');
  
  const toggleIsOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <Dialog open={isOpen}>
      <DialogTrigger asChild>
        <div>
          <Button handleClick={toggleIsOpen} className="!w-auto h-12">
            {t('filtersButton')}
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="bg-background p-0 !h-auto w-[633px]" dir="rtl">
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <div className="w-full flex justify-center flex-wrap pb-[19px] px-[19px]">
          <header className="flex justify-between items-center w-full">
            <h1 className="text-2xl font-medium text-text">{t('filtersTitle')}</h1>
            <CloseBtn onClick={toggleIsOpen} />
          </header>
          <Line className="w-full" />
          <div className="w-full py-[19px]">
            {children}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FilterModal;