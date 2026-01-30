"use client";
import {
  CategoryInterface,
  useCategoriesAdmin,
} from "@/api/admin-api/category/category.api";
import Header from "@/components/custom/header";
import { SearchField } from "@/components/custom/search-field";
import { Button } from "@/components/ui/button";
import useSerialNumber from "@/hook/use-serial";
import { useState } from "react";
import CategoryCreate from "./category-create";
import CategoryTable from "./category-table";
import CategoryUpdate from "./category-update";

const Category = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [editData, setEditData] = useState<CategoryInterface | null>(null);

  // ! category get api
  const { data, isLoading, error } = useCategoriesAdmin({
    page,
    limit,
    search,
  });
  // *dynamic serial with page, limit
  const serialNumber = useSerialNumber(page, limit);

  const handleEdit = (category: CategoryInterface) => {
    setEditData(category);
    setIsUpdateModalOpen(true);
  };
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
          <Button onClick={() => setIsCreateModalOpen(true)}>
            Create Category
          </Button>
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
        handleEdit={handleEdit}
      />

      {/* //? Create Modal  */}
      <CategoryCreate
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
      />

      {/* //? Update Modal  */}
      <CategoryUpdate
        open={isUpdateModalOpen}
        onOpenChange={setIsUpdateModalOpen}
        editData={editData}
      />
    </section>
  );
};

export default Category;
