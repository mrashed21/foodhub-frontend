"use client";

import { useMenus } from "@/api/public-api/menu.api";
import MealCardSkeleton from "@/components/custom/meal-card-skeleton";
import MealCard from "./meal-card";

interface Props {
  search?: string;
  categoryId?: string;
  priceSort?: "low_to_high" | "high_to_low";
}

const MealsGrid = ({ search, categoryId, priceSort }: Props) => {
  const { data, isLoading } = useMenus({
    search,
    category: categoryId,
    priceRange: priceSort,
  });

  const meals = data?.data?.data ?? [];

  if (isLoading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <MealCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!meals.length) {
    return <p className="text-muted-foreground text-center">No meals found</p>;
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {meals.map((meal) => (
        <MealCard key={meal.id} meal={meal} />
      ))}
    </div>
  );
};

export default MealsGrid;
