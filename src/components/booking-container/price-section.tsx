import { formatNumber } from "@/utils/helper/format-number";
import Link from "next/link";
import Button from "../common/button";

export const PriceSection = ({ price }: { price?: number }) => (
  <div className="flex md:flex-col md:justify-evenly justify-between sm:flex-row items-center">
    <p dir="rtl" className="text-xl md:text-2xl text-primary">
      {formatNumber(Number(price))} ت
    </p>
    <Link href="/reserve">
      <Button className="bg-transparent !text-text border-2 border-primary text-sm md:text-base">
        تغییر هتل
      </Button>
    </Link>
  </div>
);
