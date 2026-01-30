"use client";

import { MenuInterface } from "@/api/provider-api/menu/menu.api";
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
import { Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface MenuTableProps {
  menuData?: MenuInterface[];
  isLoading: boolean;
  serialNumber: (index: number) => number;
  handleEdit: (menu: MenuInterface) => void;
}

const MenuTable = ({
  menuData,
  isLoading,
  serialNumber,
  handleEdit,
}: MenuTableProps) => {
  if (isLoading) {
    return <TableSkeleton columns={10} rows={10} />;
  }

  if (!menuData?.length) {
    return (
      <div className="text-center py-10 text-muted-foreground">
        No menus found
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto rounded-md border">
      <Table className="min-w-100 table-fixed">
        <TableHeader>
          <TableRow>
            <TableHead className="w-12 pl-5">S.N</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Cuisine</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="text-end pr-10">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {menuData.map((menu, index) => (
            <TableRow key={menu.id}>
              {/* Serial */}
              <TableCell className="pl-5">{serialNumber(index)}</TableCell>

              {/* Name */}
              <TableCell className="font-medium">{menu.name}</TableCell>

              {/* Category */}
              <TableCell>{menu.category?.name ?? "—"}</TableCell>

              {/* Price */}
              <TableCell>৳{menu.price}</TableCell>

              {/* Cuisine */}
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {menu.cuisine.map((item) => (
                    <Badge key={item} variant="secondary">
                      {item}
                    </Badge>
                  ))}
                </div>
              </TableCell>

              {/* Status */}
              <TableCell>
                {menu.isAvailable ? (
                  <Badge className="bg-green-100 text-green-700">
                    Available
                  </Badge>
                ) : (
                  <Badge variant="destructive">Unavailable</Badge>
                )}
              </TableCell>

              {/* Created */}
              <TableCell>
                {new Date(menu.createdAt).toLocaleDateString()}
              </TableCell>

              {/* Actions */}
              <TableCell className="flex gap-2 justify-end">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => handleEdit(menu)}
                >
                  <Edit className="h-4 w-4" />
                </Button>

                <Button
                  size="icon"
                  variant="destructive"
                  onClick={() => toast.info("Delete handler will be added")}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MenuTable;
