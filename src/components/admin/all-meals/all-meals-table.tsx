"use client";

import { MenuInterface } from "@/api/public-api/menu.api";
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

interface AllMealsTableProps {
  data: MenuInterface[];
  isLoading: boolean;
  serialNumber: (index: number) => number;
}

const AllMealsTable = ({
  data,
  isLoading,
  serialNumber,
}: AllMealsTableProps) => {
  if (isLoading) {
    return <TableSkeleton rows={10} columns={10} />;
  }

  if (!data.length) {
    return (
      <div className="text-center py-10 text-muted-foreground">
        No meals found
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto rounded-md border">
      <Table className="min-w-150 table-fixed">
        <TableHeader>
          <TableRow>
            <TableHead className="w-15 pl-5">S.N</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Cuisine</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((menu, index) => (
            <TableRow key={menu.id}>
              <TableCell className="pl-5">{serialNumber(index)}</TableCell>

              <TableCell className="pl-5">{menu.name}</TableCell>

              <TableCell>{menu.category?.name ?? "—"}</TableCell>

              <TableCell>৳{menu.price}</TableCell>

              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {menu.cuisine.map((c) => (
                    <Badge key={c} variant="secondary">
                      {c}
                    </Badge>
                  ))}
                </div>
              </TableCell>

              <TableCell>
                {menu.isAvailable ? (
                  <Badge className="bg-green-100 text-green-700">
                    Available
                  </Badge>
                ) : (
                  <Badge variant="destructive">Unavailable</Badge>
                )}
              </TableCell>

              <TableCell>
                {new Date(menu.createdAt).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AllMealsTable;
