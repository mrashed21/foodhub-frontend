"use client";
import { useCategories } from "@/api/admin-api/category/category.api";
import Header from "@/components/custom/header";
import { SearchField } from "@/components/custom/search-field";
import useSerialNumber from "@/hook/use-serial";
import { useState } from "react";
import CategoryTable from "./category-table";

const Category = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  // ! category get api
  const { data, isLoading, error } = useCategories({
    page,
    limit,
    search,
  });
  // *dynamic serial with page, limit
  const serialNumber = useSerialNumber(page, limit);

  console.log(data);
  return (
    <section className="space-y-6 w-full">
      {/* //? Header  */}
      <div className="w-full max-w-full overflow-hidden">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mt-5">
          {/* //? Header */}
          <Header
            title={"Categories"}
            description={"Manage and search all categories"}
          />
        </div>
      </div>

      {/* //? Search  */}
      <div className="w-full max-w-sm overflow-hidden">
        <SearchField
          placeholder="Search categories..."
          onSearch={(v) => {
            setPage(1);
            setSearch(v);
          }}
        />
      </div>

      {/* //? Table  */}
      <CategoryTable
        categoryData={data?.data?.data}
        isLoading={isLoading}
        serialNumber={serialNumber}
      />
    </section>
  );
};

export default Category;
