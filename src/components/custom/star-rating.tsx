"use client";

import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

interface StarRatingProps {
  value: number;
  onChange: (value: number) => void;
  size?: number;
  disabled?: boolean;
}

const StarRating = ({
  value,
  onChange,
  size = 20,
  disabled = false,
}: StarRatingProps) => {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={disabled}
          onClick={() => onChange(star)}
          className="focus:outline-none"
        >
          <Star
            size={size}
            className={cn(
              "transition-colors",
              star <= value
                ? "fill-yellow-400 text-yellow-400"
                : "text-muted-foreground",
              !disabled && "hover:text-yellow-400",
            )}
          />
        </button>
      ))}
    </div>
  );
};

export default StarRating;
