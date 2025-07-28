export default function BlogCardSkeleton() {
  return (
    <div className="w-[390px] bg-text-surface border border-border rounded-[40px] p-6 flex flex-col justify-between">
      <div className="flex flex-col gap-4 animate-pulse">
        {/* Title */}
        <div className="h-6 w-2/4 bg-border rounded-md" />

        {/* Caption lines */}
        <div className="space-y-2">
          <div className="h-4 w-3/4 bg-border rounded-md" />
        </div>

        {/* Time and Date */}
        <div className="flex justify-between items-center text-xs mt-2">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 bg-border rounded-full animate-pulse" />
            <div className="h-3 w-16 bg-border rounded-md animate-pulse" />
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 bg-border rounded-full animate-pulse" />
            <div className="h-3 w-20 bg-border rounded-md animate-pulse" />
          </div>
        </div>

        {/* Button */}
        <div className="mt-6 h-10 w-full bg-border rounded-xl animate-pulse" />
      </div>
    </div>
  );
}
