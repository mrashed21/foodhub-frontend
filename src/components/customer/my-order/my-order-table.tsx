"use client";

import { useUpdateOrderStatus } from "@/api/customer-api/order.api";
import TableSkeleton from "@/components/custom/table-skeleton";
import { useState } from "react";

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

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import Link from "next/link";
import { toast } from "sonner";
import { formatDate } from "@/hook/date-format";

type OrderStatus = "placed" | "preparing" | "cancelled" | "ready" | "delivered";

interface OrderItem {
  id: string;
  price: number;
  quantity: number;
  menu: {
    id: string;
    name: string;
    image: string | null;
  };
}

interface Order {
  id: string;
  createdAt: string;
  status: OrderStatus;
  totalAmount: number;
  invoice: string;
  orderItems: OrderItem[];
  provider: {
    user: {
      providerName: string;
    };
  };
}

interface Props {
  orders?: Order[];
  isLoading?: boolean;
  serialNumber: (index: number) => number;
}

const statusStyle: Record<OrderStatus, string> = {
  placed: "bg-blue-100 text-blue-700",
  preparing: "bg-yellow-100 text-yellow-700",
  ready: "bg-purple-100 text-purple-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

const MyOrderTable = ({ orders, isLoading, serialNumber }: Props) => {
  const { mutate: updateOrderStatus, isPending } = useUpdateOrderStatus();

  const [open, setOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  if (isLoading) {
    return <TableSkeleton rows={10} columns={8} />;
  }

  if (!orders?.length) {
    return (
      <div className="py-10 text-center text-sm text-muted-foreground">
        No orders found
      </div>
    );
  }

  const handleCancelClick = (orderId: string) => {
    setSelectedOrderId(orderId);
    setOpen(true);
  };

  const confirmCancel = () => {
    if (!selectedOrderId) return;

    toast.loading("Cancelling order...", {
      id: "cancel-order",
    });

    updateOrderStatus(
      {
        id: selectedOrderId,
        status: "cancelled",
      },
      {
        onSuccess: () => {
          toast.success("Order cancelled successfully", {
            id: "cancel-order",
          });

          setOpen(false);
          setSelectedOrderId(null);
        },

        onError: (error: any) => {
          toast.error(
            error?.response?.data?.message || "Failed to cancel order",
            {
              id: "cancel-order",
            },
          );
        },
      },
    );
  };

  return (
    <>
      <div className="rounded-md border">
        <Table className="min-w-350 table-fixed">
          <TableHeader>
            <TableRow>
              <TableHead className="w-15 pl-5">S.N</TableHead>
              <TableHead>Order ID</TableHead>
              <TableHead>Restaurant</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-end pr-10">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {orders.map((order, index) => {
              const canCancel =
                order.status === "placed" || order.status === "preparing";

              return (
                <TableRow key={order.id}>
                  <TableCell className="pl-5">{serialNumber(index)}</TableCell>

                  <TableCell className="font-mono text-xs">
                    {order.invoice}
                  </TableCell>

                  <TableCell>{order.provider?.user?.providerName}</TableCell>

                  <TableCell>{order.orderItems.length}</TableCell>

                  <TableCell>
                    {formatDate(order.createdAt)}
                  </TableCell>

                  <TableCell>৳ {order.totalAmount}</TableCell>

                  <TableCell>
                    <Badge className={statusStyle[order.status]}>
                      {order.status.toUpperCase()}
                    </Badge>
                  </TableCell>

                  <TableCell className="flex gap-2 justify-end">
                    <Button asChild variant="outline">
                      <Link href={`/order-details/${order.id}`}>Details</Link>
                    </Button>

                    <Button
                      variant="destructive"
                      disabled={!canCancel || isPending}
                      onClick={() => handleCancelClick(order.id)}
                    >
                      Cancel
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Cancel Confirmation Modal */}
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel this order?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. Once cancelled, the order will not
              be processed further.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>No</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmCancel}
              className="bg-destructive text-white hover:bg-destructive/90"
              disabled={isPending}
            >
              Yes, Cancel Order
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default MyOrderTable;
