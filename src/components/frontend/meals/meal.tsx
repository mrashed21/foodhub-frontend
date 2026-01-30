"use client";

import { usePublicCategories } from "@/api/public-api/category.api";
import { SelectOption } from "@/components/custom/custom-select";
import MealsFilters from "@/components/frontend/meals/meals-filters";
import MealsGrid from "@/components/frontend/meals/meals-grid";

import { useState } from "react";

interface CategoryOption extends SelectOption {}

const Meals = () => {
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState<string | undefined>();
  const [priceSort, setPriceSort] = useState<
    "low_to_high" | "high_to_low" | undefined
  >();

  //! fetch categories
  const { data: categories, isLoading } = usePublicCategories();

  //! category options
  const categoryOptions: CategoryOption[] =
    categories?.data?.data?.map((item: any) => ({
      label: item.name,
      value: item.id,
    })) || [];

  return (
    <section>
      <div className="py-8 px-4 space-y-8">
        <MealsFilters
          categories={categoryOptions}
          onSearch={setSearch}
          onCategoryChange={setCategoryId}
          onPriceSortChange={setPriceSort}
        />

        <MealsGrid
          search={search}
          categoryId={categoryId}
          priceSort={priceSort}
        />
      </div>
    </section>
  );
};

export default Meals;
