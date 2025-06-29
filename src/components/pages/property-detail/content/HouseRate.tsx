import StarDisplay from "@/components/common/StarDisplay";

export default function HouseRate({ rate }: { rate: number }) {
  return (
    <section className="space-y-2 text-right">
      <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200">
        امتیاز هتل
      </h3>
      <div className="flex items-center gap-2">
        <StarDisplay rating={Number(rate)} size={24} />
        <span className="text-sm text-gray-500">
          ({rate > 0 ? rate : "بدون امتیاز"})
        </span>
      </div>
    </section>
  );
}
