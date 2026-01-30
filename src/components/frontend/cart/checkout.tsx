"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const Checkout = () => {
  const placeOrder = () => {
    localStorage.removeItem("foodhub_cart");
    toast.success("Order placed successfully (Cash on Delivery)");
  };

  return (
    <div className="max-w-md mx-auto space-y-4">
      <h2 className="text-2xl font-semibold">Checkout</h2>

      <Input placeholder="Delivery address" />
      <Input placeholder="Phone number" />

      <Button className="w-full" onClick={placeOrder}>
        Confirm Order
      </Button>
    </div>
  );
};

export default Checkout;
