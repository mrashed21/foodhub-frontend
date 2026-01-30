"use client";

import { Skeleton } from "@/components/ui/skeleton";

const CartPageSkeleton = () => {
  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 rounded-xl border bg-background overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-5 gap-4 px-4 py-3 border-b">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
        </div>

        {/* Rows */}
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="grid grid-cols-5 gap-4 items-center px-4 py-4 border-b"
          >
            {/* Meal */}
            <div className="flex items-center gap-3 col-span-1">
              <Skeleton className="h-12 w-12 rounded-md" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-32" />
              </div>
            </div>

            {/* Category */}
            <Skeleton className="h-4 w-20" />

            {/* Quantity */}
            <Skeleton className="h-9 w-24 rounded-md" />

            {/* Price */}
            <Skeleton className="h-4 w-16" />

            {/* Action */}
            <Skeleton className="h-8 w-8 rounded-md justify-self-end" />
          </div>
        ))}
      </div>

      <div className="rounded-xl border bg-background p-6 space-y-4 h-fit">
        <Skeleton className="h-6 w-40" />

        <div className="space-y-3">
          <div className="flex justify-between">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-16" />
          </div>

          <div className="flex justify-between">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-16" />
          </div>

          <Skeleton className="h-px w-full" />

          <div className="flex justify-between">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-20" />
          </div>
        </div>

        <Skeleton className="h-12 w-full rounded-lg mt-4" />
        <Skeleton className="h-4 w-32 mx-auto" />
      </div>
    </div>
  );
};

export default CartPageSkeleton;
