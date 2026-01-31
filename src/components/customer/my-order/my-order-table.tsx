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

import { useCreateReview } from "@/api/customer-api/review.api";
import StarRating from "@/components/custom/star-rating";
import { formatDate } from "@/hook/date-format";
import Link from "next/link";
import { toast } from "sonner";

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
  const { mutate: createReview, isPending: reviewLoading } = useCreateReview();

  const [openCancel, setOpenCancel] = useState(false);
  const [openReview, setOpenReview] = useState(false);

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

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

  /* ---------------- Cancel Order ---------------- */
  const handleCancelClick = (order: Order) => {
    setSelectedOrder(order);
    setOpenCancel(true);
  };

  const confirmCancel = () => {
    if (!selectedOrder) return;

    toast.loading("Cancelling order...", { id: "cancel" });

    updateOrderStatus(
      { id: selectedOrder.id, status: "cancelled" },
      {
        onSuccess: () => {
          toast.success("Order cancelled successfully", {
            id: "cancel",
          });
          setOpenCancel(false);
          setSelectedOrder(null);
        },
        onError: (error: any) => {
          toast.error(
            error?.response?.data?.message || "Failed to cancel order",
            { id: "cancel" },
          );
        },
      },
    );
  };

  /* ---------------- Review ---------------- */
  const handleOpenReview = (order: Order) => {
    setSelectedOrder(order);
    setOpenReview(true);
  };

  const handleSubmitReview = () => {
    if (!selectedOrder) return;

    // ⚠️ minimal change: first menuId used
    const menuId = selectedOrder.orderItems[0]?.menu.id;

    if (!menuId) {
      toast.error("Menu not found for this order");
      return;
    }

    toast.loading("Submitting review...", { id: "review" });

    createReview(
      {
        orderId: selectedOrder.id,
        menuId,
        rating,
        comment,
      },
      {
        onSuccess: () => {
          toast.success("Review submitted successfully", {
            id: "review",
          });
          setOpenReview(false);
          setRating(5);
          setComment("");
          setSelectedOrder(null);
        },
        onError: (error: any) => {
          toast.error(
            error?.response?.data?.message || "Failed to submit review",
            { id: "review" },
          );
        },
      },
    );
  };

  return (
    <>
      {/* ---------------- TABLE ---------------- */}
      <div className="rounded-md border">
        <Table className="min-w-175 border-separate border-spacing-y-1">
          <TableHeader>
            <TableRow className="bg-muted/40">
              <TableHead className="w-12 pl-4 text-xs font-medium text-muted-foreground">
                #
              </TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground">
                Order ID
              </TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground">
                Restaurant
              </TableHead>
              <TableHead className="w-14 text-center text-xs font-medium text-muted-foreground">
                Items
              </TableHead>
              <TableHead className="w-28 text-xs font-medium text-muted-foreground">
                Date
              </TableHead>
              <TableHead className="w-28 text-right text-xs font-medium text-muted-foreground">
                Total
              </TableHead>
              <TableHead className="w-24 text-xs font-medium text-muted-foreground">
                Status
              </TableHead>
              <TableHead className="w-40 text-right pr-4 text-xs font-medium text-muted-foreground">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {orders.map((order, index) => {
              const canCancel =
                order.status === "placed" || order.status === "preparing";

              const canReview = order.status === "delivered";

              return (
                <TableRow
                  key={order.id}
                  className="bg-background hover:bg-muted/30"
                >
                  {/* S.N */}
                  <TableCell className="pl-4 text-sm text-muted-foreground">
                    {serialNumber(index)}
                  </TableCell>

                  {/* Order ID */}
                  <TableCell className="font-mono text-xs">
                    {order.invoice}
                  </TableCell>

                  {/* Restaurant */}
                  <TableCell className="text-sm">
                    {order.provider?.user?.providerName}
                  </TableCell>

                  {/* Items */}
                  <TableCell className="text-center text-sm">
                    {order.orderItems.length}
                  </TableCell>

                  {/* Date */}
                  <TableCell className="text-sm text-muted-foreground">
                    {formatDate(order.createdAt)}
                  </TableCell>

                  {/* Total */}
                  <TableCell className="text-right text-sm font-medium">
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
                  <TableCell className="pr-4 text-right">
                    <div className="inline-flex items-center gap-1">
                      {/* Details */}
                      <Button asChild size="sm" variant="outline">
                        <Link href={`/order-details/${order.id}`}>Details</Link>
                      </Button>

                      {/* Review */}
                      {canReview && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleOpenReview(order)}
                        >
                          Review
                        </Button>
                      )}

                      {/* Cancel */}
                      <Button
                        size="sm"
                        variant="destructive"
                        disabled={!canCancel || isPending}
                        onClick={() => handleCancelClick(order)}
                        className="px-2"
                      >
                        Cancel
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* ---------------- CANCEL MODAL ---------------- */}
      <AlertDialog open={openCancel} onOpenChange={setOpenCancel}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel this order?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>No</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmCancel}
              className="bg-destructive text-white"
              disabled={isPending}
            >
              Yes, Cancel Order
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* ---------------- REVIEW MODAL ---------------- */}
      <AlertDialog open={openReview} onOpenChange={setOpenReview}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Write a Review</AlertDialogTitle>
            <AlertDialogDescription>
              Share your experience
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="space-y-4 py-3">
            {/* ⭐ Star Rating */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Rating</label>

              <StarRating
                value={rating}
                onChange={setRating}
                disabled={reviewLoading}
              />
            </div>

            {/* 💬 Comment */}
            <textarea
              className="w-full rounded-md border p-2 text-sm"
              placeholder="Write your review (optional)"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              disabled={reviewLoading}
            />
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={reviewLoading}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleSubmitReview}
              disabled={reviewLoading}
            >
              Submit Review
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default MyOrderTable;
