"use client";

import { useReviewForUser } from "@/api/customer-api/review.api";
import { Skeleton } from "@/components/ui/skeleton";
import { Star } from "lucide-react";

const Review = () => {
  const { data, isLoading } = useReviewForUser();

  const reviews = data?.data || [];

  return (
    <section className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold">My Reviews</h2>
        <p className="text-sm text-muted-foreground">
          Reviews you have submitted
        </p>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="rounded-lg border bg-background p-5 space-y-3"
            >
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-24" />
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && reviews.length === 0 && (
        <div className="text-center py-12 border rounded-lg bg-muted/20">
          <p className="text-sm text-muted-foreground">
            You haven’t submitted any reviews yet.
          </p>
        </div>
      )}

      {/* Reviews List */}
      {!isLoading && reviews.length > 0 && (
        <div className="space-y-4">
          {reviews.map((review: any) => (
            <div
              key={review.id}
              className="rounded-lg border bg-background p-5 hover:shadow-sm transition"
            >
              {/* Menu Name */}
              <h3 className="font-medium text-sm mb-1">{review.menu?.name}</h3>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-2">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              {/* Comment */}
              <p className="text-sm text-muted-foreground leading-relaxed">
                {review.comment}
              </p>

              {/* Date */}
              <p className="text-xs text-muted-foreground mt-3">
                {new Date(review.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Review;
