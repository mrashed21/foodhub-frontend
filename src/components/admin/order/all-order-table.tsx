"use client";

import TableSkeleton from "@/components/custom/table-skeleton";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/hook/date-format";
import Link from "next/link";

type OrderStatus = "placed" | "preparing" | "ready" | "delivered" | "cancelled";

interface Order {
  id: string;
  invoice: string;
  status: OrderStatus;
  totalAmount: number;
  createdAt: string;
  provider: {
    id: string;
    user: {
      id: string;
      name: string;
      email: string;
      providerName?: string;
    };
  };
  user: {
    id: string;
    name: string;
    email: string;
  };
  orderItems: {
    id: string;
    quantity: number;
    price: number;
  }[];
}

interface Props {
  orders?: Order[];
  isLoading?: boolean;
  serialNumber: (index: number) => number;
}

const AdminOrdersTable = ({ orders, isLoading, serialNumber }: Props) => {
  if (isLoading) {
    return <TableSkeleton rows={8} columns={9} />;
  }

  if (!orders?.length) {
    return (
      <Card className="p-12 text-center text-sm text-muted-foreground">
        No orders found
      </Card>
    );
  }

  return (
    <div className="rounded-md border">
      <Table className="min-w-350 table-fixed">
        <TableHeader>
          <TableRow>
            <TableHead className="w-15 pl-5">S.N</TableHead>
            <TableHead>Invoice</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Provider</TableHead>
            <TableHead className="w-15">Items</TableHead>
            <TableHead className="w-20">Date</TableHead>
            <TableHead className="w-20">Total</TableHead>
            <TableHead className="w-25">Status</TableHead>
            <TableHead className="w-25">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {orders.map((order, index) => (
            <TableRow key={order.id}>
              {/* Serial */}
              <TableCell className="pl-5">{serialNumber(index)}</TableCell>

              {/* Invoice */}
              <TableCell>{order.invoice}</TableCell>

              {/* Customer */}
              <TableCell>
                <div className="text-sm font-medium">{order.user.name}</div>
                <div className="text-xs text-muted-foreground">
                  {order.user.email}
                </div>
              </TableCell>

              {/* Provider */}
              <TableCell>
                <div className="text-sm font-medium">
                  {order.provider.user.providerName || order.provider.user.name}
                </div>
                <div className="text-xs text-muted-foreground">
                  {order.provider.user.email}
                </div>
              </TableCell>

              {/* Items */}
              <TableCell className="w-15">{order.orderItems.length}</TableCell>

              {/* Date */}
              <TableCell className="w-20">
                {formatDate(order.createdAt)}
              </TableCell>

              {/* Total */}
              <TableCell className="w-20">৳{order.totalAmount}</TableCell>

              {/* Status */}
              <TableCell className="capitalize w-25">{order.status}</TableCell>

              {/* Action */}
              <TableCell className="w-25 pr-5">
                <Button asChild variant="outline">
                  <Link href={`/order-details/${order.id}`}>Details</Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminOrdersTable;
