"use client";

import { useCreateOrder } from "@/api/customer-api/order.api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { clearCart, getCart } from "@/lib/cart";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "sonner";

const Checkout = () => {
  const router = useRouter();
  const { mutateAsync, isPending } = useCreateOrder();

  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const cart = getCart();

  const subtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cart]);

  const placeOrder = async () => {
    if (!phone || !address) {
      toast.error("Phone and address are required");
      return;
    }

    if (!cart.length) {
      toast.error("Cart is empty");
      return;
    }

    const items = cart.map((item) => ({
      menuId: item.id,
      providerId: item.provider.id,
      quantity: item.quantity,
      price: item.price,
    }));

    try {
      await mutateAsync({
        phone,
        address,
        items,
      });

      clearCart();
      toast.success("Order placed successfully (Cash on Delivery)");
      // router.replace("/user/orders");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to place order");
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-10 space-y-8">
      <h2 className="text-3xl font-bold">Checkout</h2>

      {/* ===== Delivery Details ===== */}
      <div className="border rounded-xl p-6 space-y-4">
        <h3 className="text-lg font-semibold">Delivery Information</h3>

        <Input
          placeholder="Delivery address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <Input
          placeholder="Phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <p className="text-sm text-muted-foreground">
          Payment method: <strong>Cash on Delivery</strong>
        </p>
      </div>

      {/* ===== Order Summary ===== */}
      <div className="border rounded-xl p-6 space-y-4">
        <h3 className="text-lg font-semibold">Order Summary</h3>

        {cart.length === 0 ? (
          <p className="text-sm text-muted-foreground">Your cart is empty</p>
        ) : (
          <div className="space-y-3">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-muted-foreground">Qty: {item.quantity}</p>
                </div>

                <span className="font-medium">
                  ৳{item.price * item.quantity}
                </span>
              </div>
            ))}

            <div className="border-t pt-3 flex justify-between font-semibold">
              <span>Subtotal</span>
              <span>৳{subtotal}</span>
            </div>
          </div>
        )}
      </div>

      {/* ===== Action ===== */}
      <Button
        className="w-full h-12 text-base"
        disabled={isPending || cart.length === 0}
        onClick={placeOrder}
      >
        {isPending ? "Placing Order..." : "Confirm Order"}
      </Button>
    </div>
  );
};

export default Checkout;
