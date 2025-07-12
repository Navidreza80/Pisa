import { formatNumber } from "@/utils/helper/format-number";
import Link from "next/link";
import Button from "../../../common/button";
import { useTranslations } from "next-intl";

export const PriceSection = ({ price }: { price?: string }) => {
  const t = useTranslations("BookingProcess");
  return (
    <div className="flex md:flex-col md:justify-evenly justify-between sm:flex-row items-center">
      <p className="text-xl md:text-2xl text-primary">
        {formatNumber(Number(price))} ت
      </p>
      <Link href="/reserve">
        <Button className="bg-transparent !text-text border-2 border-primary text-sm md:text-base">
         {t("changeHotel")}
        </Button>
      </Link>
    </div>
  );
};
