import StarDisplay from "@/components/common/StarDisplay";
import { useTranslations } from "next-intl";

export default function HouseRate({ rate }: { rate: number }) {
  const t = useTranslations("SingleHouse")
  return (
    <section className="space-y-2 ">
      <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200">
{t("hotelRate")}
      </h3>
      <div className="flex items-center gap-2">
        <StarDisplay rating={Number(rate)} size={24} />
        <span className="text-sm text-gray-500">
          ({rate > 0 ? rate : t("withoutRate")})
        </span>
      </div>
    </section>
  );
}
