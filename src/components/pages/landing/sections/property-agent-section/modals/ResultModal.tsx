"use client";

import HouseCard from "@/components/common/house/house-card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { HouseItemsInterface } from "@/types/house";
import { ClipLoader } from "react-spinners";

interface IProps {
  recommendation: HouseItemsInterface;
  reason: string;
  children: React.ReactNode;
  isPending: boolean;
}

const ResultModal: React.FC<IProps> = ({
  recommendation,
  reason,
  isPending,
  children,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent  className="max-w-[448px] px-6 py-6">
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <div>
          {reason && (
            <p className="font-semibold text-center pb-2 text-text">{reason}</p>
          )}
          {recommendation && <HouseCard item={recommendation} />}
        </div>
        {isPending && (
          <div className="flex flex-col gap-1 items-center mx-auto">
            درحال بارگذاری <ClipLoader />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ResultModal;
