"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { useTranslations } from "next-intl";

type User = {
  profilePicture: string;
  name: string;
  role: string;
};

type Props = {
  user: User;
  open: boolean;
  onClose: () => void;
};

export default function UserModal({ user, open, onClose }: Props) {
  const t = useTranslations("userModal");

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-[90%] max-w-sm rounded-2xl  font-vazir">
        <DialogHeader>
          <DialogTitle className="text-lg text-gray-800 ">
            {t("title")}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center space-y-4">
          <Image
            src={user.profilePicture}
            alt={t("profilePictureAlt")}
            width={100}
            height={100}
            className="rounded-full border shadow-md w-[100px] aspect-square"
          />

          <div className="text-center space-y-1">
            <p className="text-base font-semibold text-gray-700">{user.name}</p>
            <p className="text-sm text-gray-500">{user.role}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
