"use client";

import {
  CategoryInterface,
  useDeleteCategory,
} from "@/api/admin-api/category/category.api";
import ConfirmDialog from "@/components/custom/confirm-dialog";
import TableSkeleton from "@/components/custom/table-skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { toast } from "sonner";

interface CategoryTableProps {
  categoryData: CategoryInterface[];
  isLoading: boolean;
  serialNumber: (index: number) => number;
  handleEdit: (category: CategoryInterface) => void;
}

const CategoryTable = ({
  categoryData = [],
  isLoading,
  serialNumber,
  handleEdit,
}: CategoryTableProps) => {
  const { mutateAsync: deleteCategory, isPending } = useDeleteCategory();

  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  if (isLoading) {
    return <TableSkeleton columns={6} rows={5} />;
  }

  const handleConfirmDelete = async () => {
    if (!selectedId) return;

    try {
      await deleteCategory(selectedId);
      toast.success("Category deleted successfully");
      setOpen(false);
      setSelectedId(null);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to delete category",
      );
    }
  };

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60px]">#</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created By</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead className="text-end pr-10">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {categoryData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6">
                  No categories found
                </TableCell>
              </TableRow>
            ) : (
              categoryData.map((category, index) => (
                <TableRow key={category.id}>
                  <TableCell>{serialNumber(index)}</TableCell>
                  <TableCell className="font-medium capitalize">
                    {category.name}
                  </TableCell>

                  <TableCell>
                    {category.isActive ? (
                      <Badge>Active</Badge>
                    ) : (
                      <Badge variant="destructive">Inactive</Badge>
                    )}
                  </TableCell>

                  <TableCell>{category?.user?.name}</TableCell>

                  <TableCell>
                    {new Date(category.createdAt).toLocaleDateString()}
                  </TableCell>

                  <TableCell className="flex gap-2 justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(category)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedId(category.id);
                        setOpen(true);
                      }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* 🔥 Confirmation Modal */}
      <ConfirmDialog
        open={open}
        onOpenChange={setOpen}
        title="Delete Category?"
        description="This category will be permanently deleted."
        confirmText="Delete"
        loading={isPending}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
};

export default CategoryTable;
