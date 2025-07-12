import { useState } from "react";
import Button from "../common/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import Line from "../common/dashboard/line";
import CloseBtn from "./close-btn";
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
      <DialogContent className="bg-background p-0 !h-auto w-[633px]" >
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <div className="w-full flex justify-center flex-wrap pb-[19px] px-[19px]">
          <header className="flex justify-between items-center w-full">
            <h1 className="text-2xl font-medium text-text">{t('filtersTitle')}</h1>
            <CloseBtn onClick={toggleIsOpen} />
          </header>
          <Line className="w-full" />
          <div className="flex flex-wrap justify-between gap-5 py-[19px]">
            {children}
          </div>
          <footer className="w-full flex justify-center">
            <Button className="!w-auto">
              {t('applyFilters')}
            </Button>
          </footer>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FilterModal;