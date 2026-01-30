"use client";

import { MenuInterface } from "@/api/public-api/menu.api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const CART_KEY = "foodhub_cart";

const getCart = (): MenuInterface[] => {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
};

const setCart = (items: MenuInterface[]) => {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("cart-updated"));
};

const MealCard = ({ meal }: { meal: MenuInterface }) => {
  const [inCart, setInCart] = useState(false);

  useEffect(() => {
    const cart = getCart();
    setInCart(cart.some((item) => item.id === meal.id));
  }, [meal.id]);

  const handleAddToCart = () => {
    const cart = getCart();
    if (cart.some((item) => item.id === meal.id)) return;

    setCart([...cart, meal]);
    setInCart(true);
    toast.success("Added to cart 🛒");
  };

  const handleRemoveFromCart = () => {
    const cart = getCart().filter((item) => item.id !== meal.id);
    setCart(cart);
    setInCart(false);
    toast.info("Removed from cart");
  };

  return (
    <div className="rounded-xl border bg-background overflow-hidden hover:shadow transition">
      <div className="h-40 bg-muted" />

      <div className="p-4 space-y-3">
        <h3 className="font-semibold line-clamp-1">{meal.name}</h3>

        <div className="flex flex-wrap gap-1">
          {meal.category?.name && (
            <Badge variant="outline" className="text-primary border-primary/40">
              {meal.category.name}
            </Badge>
          )}

          {meal.cuisine.slice(0, 2).map((c) => (
            <Badge key={c} variant="secondary">
              {c}
            </Badge>
          ))}
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {meal.description}
        </p>

        <div className="flex items-center justify-between pt-2">
          <span className="font-semibold">৳{meal.price}</span>

          <div className="flex gap-2">
            <Link href={`/meals/${meal.id}`}>
              <Button size="sm" variant="outline">
                View
              </Button>
            </Link>

            {inCart ? (
              <Button
                size="sm"
                variant="destructive"
                onClick={handleRemoveFromCart}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            ) : (
              <Button size="sm" onClick={handleAddToCart}>
                <ShoppingCart className="h-4 w-4 mr-1" />
                Add
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealCard;
