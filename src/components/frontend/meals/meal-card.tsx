"use client";

import { MenuInterface } from "@/api/public-api/menu.api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import {
  addToCart,
  CART_UPDATED_EVENT,
  isInCart,
  removeFromCart,
} from "@/lib/cart";
import Image from "next/image";

const MealCard = ({ meal }: { meal: MenuInterface }) => {
  const [inCart, setInCart] = useState(false);

  useEffect(() => {
    setInCart(isInCart(meal.id));

    const sync = () => setInCart(isInCart(meal.id));
    window.addEventListener(CART_UPDATED_EVENT, sync);

    return () => {
      window.removeEventListener(CART_UPDATED_EVENT, sync);
    };
  }, [meal.id]);

  const handleAdd = () => {
    addToCart(meal);
    toast.success("Added to cart 🛒");
  };

  const handleRemove = () => {
    removeFromCart(meal.id);
    toast.info("Removed from cart");
  };

  return (
    <div className="rounded-xl border bg-background overflow-hidden hover:shadow transition">
      {/* Image */}
      <div className="relative h-40 w-full bg-muted">
        <Image
          src={
            meal.image ||
            "https://i.ibb.co.com/N8PpMRr/Chat-GPT-Image-Feb-1-2026-01-49-03-AM-1.png"
          }
          alt={meal.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
          priority={false}
        />
      </div>

      <div className="p-4 space-y-3">
        <h3 className="font-semibold line-clamp-1">{meal.name}</h3>

        {/* Badges */}
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
              <Button size="sm" variant="destructive" onClick={handleRemove}>
                <Trash2 className="h-4 w-4" />
              </Button>
            ) : (
              <Button size="sm" onClick={handleAdd}>
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
