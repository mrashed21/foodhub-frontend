"use client";

import TableSkeleton from "@/components/custom/table-skeleton";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface CategoryTableProps {
  categoryData: any[];
  isLoading: boolean;
  serialNumber: (index: number) => number;
}

const CategoryTable = ({
  categoryData = [],
  isLoading,
  serialNumber,
}: CategoryTableProps) => {
  if (isLoading) {
    return <TableSkeleton columns={6} rows={5} />;
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[60px]">#</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created By</TableHead>
            <TableHead>Created At</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {categoryData?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-6">
                No categories found
              </TableCell>
            </TableRow>
          ) : (
            categoryData?.map((category, index) => (
              <TableRow key={category.id}>
                <TableCell>{serialNumber(index)}</TableCell>

                <TableCell className="font-medium">{category.name}</TableCell>

                <TableCell className="text-muted-foreground">
                  {category.slug}
                </TableCell>

                <TableCell>
                  {category.isActive ? (
                    <Badge>Active</Badge>
                  ) : (
                    <Badge variant="destructive">Inactive</Badge>
                  )}
                </TableCell>

                <TableCell>{category.user?.name}</TableCell>

                <TableCell>
                  {new Date(category.createdAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CategoryTable;
