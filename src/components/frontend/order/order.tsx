"use client";

import { useOrdersDetails } from "@/api/customer-api/order.api";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import Container from "@/common/container/container";
import OrderSkeleton from "@/components/custom/order-skeleton";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const statusColor: Record<string, string> = {
  placed: "bg-blue-500/10 text-blue-600",
  preparing: "bg-yellow-500/10 text-yellow-600",
  delivered: "bg-green-500/10 text-green-600",
  cancelled: "bg-red-500/10 text-red-600",
};

const Order = ({ id }: { id: string }) => {
  const { data, isLoading } = useOrdersDetails(id);
  const order = data?.data;

  if (isLoading) return <OrderSkeleton />;
  if (!order) return null;

  return (
    <section className="px-4">
      <Container className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Order Details
            </h1>
            <p className="text-sm text-muted-foreground">
              Invoice: {order.invoice}
            </p>
          </div>

          <Badge className={`capitalize ${statusColor[order.status]}`}>
            {order.status}
          </Badge>
        </div>

        {/* Customer & Provider */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Customer Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1 text-sm">
              <p>
                <span className="text-muted-foreground capitalize">Name:</span>{" "}
                {order.user.name}
              </p>
              <p>
                <span className="text-muted-foreground">Email:</span>{" "}
                {order.user.email}
              </p>
              <p>
                <span className="text-muted-foreground">Phone:</span>{" "}
                {order.phone}
              </p>
              <p>
                <span className="text-muted-foreground capitalize">
                  Address:
                </span>{" "}
                {order.address}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Restaurant Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1 text-sm">
              <p>
                <span className="text-muted-foreground capitalize">Name:</span>{" "}
                {order.provider.user.providerName}
              </p>
              <p>
                <span className="text-muted-foreground capitalize">Owner:</span>{" "}
                {order.provider.user.name}
              </p>
              <p>
                <span className="text-muted-foreground">Phone:</span>{" "}
                {order.provider.user.phone}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Items Table */}
        <Card>
          <CardHeader>
            <CardTitle>Order Items</CardTitle>
          </CardHeader>

          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead className="text-center">Qty</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {order.orderItems.map((item: any) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="font-medium capitalize">
                        {item.menu.name}
                      </div>
                      <div className="text-xs text-muted-foreground capitalize">
                        {item.menu.description}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      {item.quantity}
                    </TableCell>
                    <TableCell className="text-right">৳{item.price}</TableCell>
                    <TableCell className="text-right">
                      ৳{item.quantity * item.price}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Total */}
        <div className="flex justify-end">
          <Card className="w-full max-w-sm">
            <CardContent className="pt-6 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Total Items</span>
                <span>{order.orderItems.length}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-semibold">
                <span>Total Amount</span>
                <span>৳{order.totalAmount}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    </section>
  );
};

export default Order;
