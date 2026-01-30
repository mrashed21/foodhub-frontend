"use client";

import { MenuInterface } from "@/api/public-api/menu.api";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";

const CART_KEY = "foodhub_cart";

const CartPage = () => {
  const [items, setItems] = useState<MenuInterface[]>([]);

  useEffect(() => {
    setItems(JSON.parse(localStorage.getItem(CART_KEY) || "[]"));
  }, []);

  const remove = (id: string) => {
    const updated = items.filter((i) => i.id !== id);
    localStorage.setItem(CART_KEY, JSON.stringify(updated));
    setItems(updated);
  };

  const total = items.reduce((sum, i) => sum + i.price, 0);

  if (!items.length)
    return <p className="text-center text-muted-foreground">Cart is empty</p>;

  return (
    <div className="space-y-6">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex justify-between items-center border p-4 rounded"
        >
          <div>
            <h3 className="font-medium">{item.name}</h3>
            <p className="text-sm text-muted-foreground">৳{item.price}</p>
          </div>

          <Button
            size="icon"
            variant="destructive"
            onClick={() => remove(item.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}

      <div className="flex justify-between items-center pt-4 border-t">
        <p className="text-lg font-semibold">Total: ৳{total}</p>

        <Link href="/checkout">
          <Button>Place Order</Button>
        </Link>
      </div>
    </div>
  );
};

export default CartPage;
