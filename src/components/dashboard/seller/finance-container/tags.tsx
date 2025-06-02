"use client";

import { usePathname } from "next/navigation";
import Tag from "./tag";

const FinancialTags = () => {
  const items = [
    { text: "درآمد ماه قبل", price: 1200000 },
    { text: "درآمد ماه جاری", price: 1200000 },
    { text: "درآمد کل", price: 1300000 },
    { text: "موجودی قابل برداشت", price: 1400000 },
  ];
  const pathname = usePathname();
  return (
    pathname.includes("/seller/finance") && (
      <div className="w-full flex flex-wrap justify-between gap-4 md:gap-5">
        {items.map((item, index) => {
          return <Tag key={index} item={item} />;
        })}
      </div>
    )
  );
};
export default FinancialTags;
