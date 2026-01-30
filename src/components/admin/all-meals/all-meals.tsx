"use client";

import { usePublicCategories } from "@/api/public-api/category.api";
import { useMenus } from "@/api/public-api/menu.api";
import CustomSelect, { SelectOption } from "@/components/custom/custom-select";
import Header from "@/components/custom/header";
import { SearchField } from "@/components/custom/search-field";
import { useState } from "react";
import AllMealsTable from "./all-meals-table";
import useSerialNumber from "@/hook/use-serial";

//! Types
interface Option extends SelectOption {}

//! Price Options

const priceOptions: Option[] = [
  { label: "Low to High", value: "low_to_high" },
  { label: "High to Low", value: "high_to_low" },
];

const AllMeals = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<Option | null>(null);
  const [priceRange, setPriceRange] = useState<Option | null>(null);

  //! Fetch Categories

  const { data: categories } = usePublicCategories();

  const categoryOptions: Option[] =
    categories?.data?.data?.map((c: any) => ({
      label: c.name,
      value: c.id,
    })) || [];

    // *dynamic serial with page, limit
  const serialNumber = useSerialNumber(page, limit);

  //! Fetch Menus

  const { data, isLoading } = useMenus({
    page,
    limit,
    search,
    category: category?.value as string | undefined,
    priceRange: priceRange?.value as string | undefined,
  });

  const meals = data?.data?.data ?? [];

  return (
    <section className="flex-1 p-6 space-y-6">
      {/* Header */}
      <Header title="All Meals" description="Manage and search all meals" />

      {/* Filters */}
      <div className="flex flex-wrap gap-4 max-w-4xl">
        {/* Search */}
        <SearchField
          placeholder="Search meals..."
          onSearch={(v) => {
            setPage(1);
            setSearch(v);
          }}
        />

        {/* Category Filter */}
        <div className="w-64">
          <CustomSelect<Option>
            placeholder="Filter by category"
            options={categoryOptions}
            value={category}
            onChange={(v) => {
              setPage(1);
              setCategory(v as Option);
            }}
            isClearable
          />
        </div>

        {/* Price Filter */}
        <div className="w-52">
          <CustomSelect<Option>
            placeholder="Price order"
            options={priceOptions}
            value={priceRange}
            onChange={(v) => {
              setPage(1);
              setPriceRange(v as Option);
            }}
            isClearable
          />
        </div>
      </div>

      {/* Table */}
      <AllMealsTable data={meals} isLoading={isLoading} serialNumber={serialNumber} />
    </section>
  );
};

export default AllMeals;
