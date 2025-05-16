"use client";

import HouseCard from "@/components/common/house/house-card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function ResultModal({ recommendation, reason, children }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent dir="rtl" className="max-w-[448px] px-6 py-6">
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <div>
          {reason && <p className="font-semibold text-center pb-2 text-text">{reason}</p>}
          {recommendation && <HouseCard item={recommendation} />}
        </div>
      </DialogContent>
    </Dialog>
  );
}
