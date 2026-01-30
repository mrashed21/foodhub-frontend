"use client";

import CustomSelect, { SelectOption } from "@/components/custom/custom-select";
import { Input } from "@/components/ui/input";

interface Props {
  categories: SelectOption[];
  onSearch: (v: string) => void;
  onCategoryChange: (v?: string) => void;
  onPriceSortChange: (v?: "low_to_high" | "high_to_low") => void;
}

const priceOptions: SelectOption[] = [
  { label: "Price: Low to High", value: "low_to_high" },
  { label: "Price: High to Low", value: "high_to_low" },
];

const MealsFilters = ({
  categories,
  onSearch,
  onCategoryChange,
  onPriceSortChange,
}: Props) => {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {/* Search */}
      <Input
        placeholder="Search meals..."
        onChange={(e) => onSearch(e.target.value)}
      />

      {/* Category */}
      <CustomSelect<SelectOption>
        placeholder="Select category"
        options={categories}
        isClearable
        onChange={(opt) => {
          if (!opt || Array.isArray(opt)) {
            onCategoryChange(undefined);
            return;
          }
          onCategoryChange(opt.value as string);
        }}
      />

      {/* Price Sort */}
      <CustomSelect<SelectOption>
        placeholder="Sort by price"
        options={priceOptions}
        isClearable
        onChange={(opt) => {
          if (!opt || Array.isArray(opt)) {
            onPriceSortChange(undefined);
            return;
          }
          onPriceSortChange(opt.value as "low_to_high" | "high_to_low");
        }}
      />
    </div>
  );
};

export default MealsFilters;
