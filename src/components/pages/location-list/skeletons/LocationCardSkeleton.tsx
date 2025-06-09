import { Skeleton } from "@/components/ui/skeleton";

export function LocationCardSkeleton() {
  return (
    <div className="flex-1 bg-surface border-[1px] border-border rounded-[40px] lg:min-w-[389px] md:min-w-[389px] min-w-[350px] w-[calc(33.3%-22px)]">
      <Skeleton className="w-full h-[153px] rounded-t-[24px] rounded-b-[16px] bg-border" />
      <div className="p-4 flex flex-row-reverse justify-between items-center text-center">
        <Skeleton className="h-6 w-[100px] bg-border" />
        <Skeleton className="h-6 w-[150px] bg-border" />
      </div>
    </div>
  );
}
