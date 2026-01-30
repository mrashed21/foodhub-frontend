"use client";

import { ShoppingCart, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { MenuInterface, useMenuById } from "@/api/public-api/menu.api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import MealDetailsSkeleton from "@/components/custom/meal-detail-sdkeleton";
import {
  addToCart,
  CART_UPDATED_EVENT,
  isInCart,
  removeFromCart,
} from "@/lib/cart";

const MealDetails = ({ id }: { id: string }) => {
  const { data, isLoading } = useMenuById(id);
  const meal: MenuInterface | undefined = data?.data;

  const [inCart, setInCart] = useState(false);

  const syncCartState = () => {
    if (!meal) return;
    setInCart(isInCart(meal.id));
  };

  useEffect(() => {
    syncCartState();

    const handler = () => syncCartState();
    window.addEventListener(CART_UPDATED_EVENT, handler);

    return () => {
      window.removeEventListener(CART_UPDATED_EVENT, handler);
    };
  }, [meal?.id]);

  if (isLoading) {
    return <MealDetailsSkeleton />;
  }

  if (!meal) {
    return <p className="text-center py-10">Meal not found</p>;
  }

  const handleAdd = () => {
    addToCart(meal);
    toast.success("Added to cart 🛒");
  };

  const handleRemove = () => {
    removeFromCart(meal.id);
    toast.info("Removed from cart");
  };

  return (
    <div className="grid md:grid-cols-2 gap-10">
      <div className="h-80 rounded-xl bg-muted" />

      <div className="space-y-5">
        <h1 className="text-3xl font-semibold">{meal.name}</h1>

        <div className="flex flex-wrap gap-2">
          {meal.category?.name && (
            <Badge variant="outline">{meal.category.name}</Badge>
          )}

          {meal.cuisine.map((c) => (
            <Badge key={c} variant="secondary">
              {c}
            </Badge>
          ))}
        </div>

        <p className="text-muted-foreground">{meal.description}</p>

        <p className="text-2xl font-bold">৳{meal.price}</p>

        {inCart ? (
          <Button variant="destructive" onClick={handleRemove}>
            <Trash2 className="mr-2 h-4 w-4" />
            Remove from cart
          </Button>
        ) : (
          <Button onClick={handleAdd}>
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to cart
          </Button>
        )}
      </div>
    </div>
  );
};

export default MealDetails;
