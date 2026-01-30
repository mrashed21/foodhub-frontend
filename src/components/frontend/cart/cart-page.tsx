"use client";

import CartPageSkeleton from "@/components/custom/cart-page-skeleton";
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
  addToCart,
  CART_UPDATED_EVENT,
  CartItem,
  decreaseFromCart,
  getCart,
  removeFromCart,
} from "@/lib/cart";
import { Minus, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const CartPage = () => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  const loadCart = () => {
    setItems(getCart());
    setLoading(false);
  };

  useEffect(() => {
    loadCart();

    const handler = () => loadCart();
    window.addEventListener(CART_UPDATED_EVENT, handler);

    return () => {
      window.removeEventListener(CART_UPDATED_EVENT, handler);
    };
  }, []);

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const deliveryFee = items.length ? 40 : 0;
  const total = subtotal + deliveryFee;

  if (loading) {
    return <CartPageSkeleton />;
  }

  if (!items.length) {
    return (
      <div className="text-center py-20 space-y-3">
        <p className="text-xl font-medium">Your cart is empty 🛒</p>
        <p className="text-muted-foreground">
          Browse meals and add something delicious
        </p>
        <Link href="/meals">
          <Button className="mt-4">Browse Meals</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-4">
        <div className="rounded-xl border bg-background overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Meal</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-center">Quantity</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id} className="hover:bg-muted/40">
                  {/* Meal */}
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-md bg-muted" />
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-xs text-muted-foreground line-clamp-1">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  {/* Category */}
                  <TableCell>{item.category?.name ?? "—"}</TableCell>

                  {/* Quantity */}
                  <TableCell className="text-center">
                    <div className="inline-flex items-center gap-2 border rounded-md px-2 py-1">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => decreaseFromCart(item.id)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>

                      <span className="w-6 text-center font-medium">
                        {item.quantity}
                      </span>

                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => addToCart(item)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>

                  {/* Price */}
                  <TableCell className="text-right font-medium">
                    ৳{item.price * item.quantity}
                  </TableCell>

                  {/* Remove */}
                  <TableCell className="text-right">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-red-500 hover:text-red-600"
                      onClick={() => {
                        removeFromCart(item.id);
                        toast.info("Removed from cart");
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* ================= Summary ================= */}
      <div className="rounded-xl border bg-background p-6 space-y-4 h-fit">
        <h3 className="text-lg font-semibold">Order Summary</h3>

        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span>৳{subtotal}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Delivery Fee</span>
          <span>৳{deliveryFee}</span>
        </div>

        <div className="border-t pt-3 flex justify-between font-semibold">
          <span>Total</span>
          <span>৳{total}</span>
        </div>

        <Link href="/checkout">
          <Button size="lg" className="w-full mt-2">
            Proceed to Checkout
          </Button>
        </Link>

        <Link
          href="/meals"
          className="block text-center text-sm text-muted-foreground hover:text-primary"
        >
          Continue shopping
        </Link>
      </div>
    </div>
  );
};

export default CartPage;
