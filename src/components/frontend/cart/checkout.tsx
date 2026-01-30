"use client";

import { useCreateOrder } from "@/api/customer-api/order.api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { clearCart, getCart } from "@/lib/cart";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const Checkout = () => {
  const router = useRouter();
  const { mutateAsync, isPending } = useCreateOrder();

  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const placeOrder = async () => {
    if (!phone || !address) {
      toast.error("Phone and address are required");
      return;
    }

    const cart = getCart();

    if (!cart.length) {
      toast.error("Cart is empty");
      return;
    }

    const items = cart.map((item) => ({
      menuId: item.id,
      providerId: item.provider.id ,
      quantity: item.quantity,
      price: item.price
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
    <div className="max-w-md mx-auto py-10 space-y-5">
      <h2 className="text-2xl font-semibold">Checkout</h2>

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

      <Button className="w-full" disabled={isPending} onClick={placeOrder}>
        {isPending ? "Placing Order..." : "Confirm Order"}
      </Button>
    </div>
  );
};

export default Checkout;
