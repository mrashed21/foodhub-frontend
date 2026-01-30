import { Skeleton } from "@/components/ui/skeleton";

const MealCardSkeleton = () => {
  return (
    <div className="rounded-xl border bg-background overflow-hidden">
      <Skeleton className="h-40 w-full" />

      <div className="p-4 space-y-3">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-5/6" />
        <div className="flex justify-between pt-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-8 w-20" />
        </div>
      </div>
    </div>
  );
};

export default MealCardSkeleton;
