"use client";

import { useUpdateOrderStatus } from "@/api/customer-api/order.api";
import TableSkeleton from "@/components/custom/table-skeleton";
import { useState } from "react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

type OrderStatus = "placed" | "preparing" | "ready" | "delivered" | "cancelled";

interface Order {
  id: string;
  createdAt: string;
  status: OrderStatus;
  totalAmount: number;
  invoice: string;
  orderItems: {
    id: string;
    quantity: number;
    price: number;
  }[];
  user: {
    name: string;
    email: string;
  };
}

interface Props {
  orders?: Order[];
  isLoading?: boolean;
  serialNumber: (index: number) => number;
}

/* Provider allowed transitions */
const providerStatusFlow: Record<OrderStatus, OrderStatus[]> = {
  placed: ["preparing"],
  preparing: ["ready"],
  ready: ["delivered"],
  delivered: [],
  cancelled: [],
};

const statusStyle: Record<OrderStatus, string> = {
  placed: "bg-blue-50 text-blue-700 border-blue-200",
  preparing: "bg-yellow-50 text-yellow-700 border-yellow-200",
  ready: "bg-purple-50 text-purple-700 border-purple-200",
  delivered: "bg-green-50 text-green-700 border-green-200",
  cancelled: "bg-red-50 text-red-700 border-red-200",
};

const ProviderOrderTable = ({ orders, isLoading, serialNumber }: Props) => {
  const { mutate: updateOrderStatus } = useUpdateOrderStatus();
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  if (isLoading) {
    return <TableSkeleton rows={8} columns={7} />;
  }

  if (!orders?.length) {
    return (
      <div className="py-16 text-center text-sm text-muted-foreground">
        No orders found
      </div>
    );
  }

  const handleStatusChange = (orderId: string, status: OrderStatus) => {
    setUpdatingId(orderId);

    toast.loading("Updating status…", { id: "order-status" });

    updateOrderStatus(
      { id: orderId, status },
      {
        onSuccess: () => {
          toast.success("Order updated", { id: "order-status" });
          setUpdatingId(null);
        },
        onError: (error: any) => {
          toast.error(error?.response?.data?.message || "Failed to update", {
            id: "order-status",
          });
          setUpdatingId(null);
        },
      },
    );
  };

  return (
    <div className="rounded-md border">
      <Table>
        {/* Header */}
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="pl-6 w-14">S.N</TableHead>
            <TableHead>Invoice</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead className="text-center">Items</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right pr-6">Action</TableHead>
          </TableRow>
        </TableHeader>

        {/* Body */}
        <TableBody>
          {orders.map((order, index) => {
            const allowedNextStatuses = providerStatusFlow[order.status];

            const locked =
              order.status === "cancelled" || order.status === "delivered";

            return (
              <TableRow key={order.id} className="hover:bg-muted/40 transition">
                <TableCell className="pl-6">{serialNumber(index)}</TableCell>

                <TableCell className="font-mono text-xs">
                  {order.invoice}
                </TableCell>

                <TableCell>
                  <div className="text-sm font-medium">{order.user.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {order.user.email}
                  </div>
                </TableCell>

                <TableCell className="text-center">
                  {order.orderItems.length}
                </TableCell>

                <TableCell>
                  {new Date(order.createdAt).toLocaleDateString()}
                </TableCell>

                <TableCell className="text-right font-medium">
                  ৳ {order.totalAmount}
                </TableCell>

                {/* Status */}
                <TableCell>
                  <Badge
                    variant="outline"
                    className={statusStyle[order.status]}
                  >
                    {order.status.toUpperCase()}
                  </Badge>
                </TableCell>

                {/* Action */}
                <TableCell className="pr-6 text-right">
                  <div className="flex justify-end gap-3">
                    <Select
                      disabled={locked || updatingId === order.id}
                      onValueChange={(v) =>
                        handleStatusChange(order.id, v as OrderStatus)
                      }
                    >
                      <SelectTrigger className="h-8 w-36 text-xs">
                        <SelectValue placeholder="Update" />
                      </SelectTrigger>
                      <SelectContent>
                        {allowedNextStatuses.map((s) => (
                          <SelectItem key={s} value={s}>
                            {s.toUpperCase()}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Button asChild variant="outline">
                      <Link href={`/order-details/${order.id}`}>Details</Link>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProviderOrderTable;
