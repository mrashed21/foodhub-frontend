"use client";

import { Skeleton } from "@/components/ui/skeleton";

const MealDetailsSkeleton = () => {
  return (
    <div className="grid md:grid-cols-2 gap-10">
      {/* Image Skeleton */}
      <Skeleton className="h-80 w-full rounded-xl" />

      {/* Content Skeleton */}
      <div className="space-y-5">
        {/* Title */}
        <Skeleton className="h-8 w-3/4" />

        {/* Badges */}
        <div className="flex gap-2">
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>

        {/* Price */}
        <Skeleton className="h-7 w-32" />

        {/* Button */}
        <Skeleton className="h-11 w-44 rounded-lg" />
      </div>
    </div>
  );
};

export default MealDetailsSkeleton;
