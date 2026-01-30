"use client";

import { useUpdateOrderStatus } from "@/api/customer-api/order.api";
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
import Link from "next/link";

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
  const {
    mutate: updateOrderStatus,
    isPending,
    variables,
  } = useUpdateOrderStatus();

  if (isLoading) {
    return <TableSkeleton rows={10} columns={10} />;
  }

  if (!orders?.length) {
    return (
      <div className="py-10 text-center text-sm text-muted-foreground">
        No orders found
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table className=" min-w-350 table-fixed">
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
                  {new Date(order.createdAt).toLocaleDateString()}
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
                  <Button variant="destructive"> Cancel</Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default MyOrderTable;
