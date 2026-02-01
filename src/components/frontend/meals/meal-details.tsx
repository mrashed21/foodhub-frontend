"use client";

import { ShoppingCart, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { MenuInterface, useMenuById } from "@/api/public-api/menu.api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import Container from "@/common/container/container";
import MealDetailsSkeleton from "@/components/custom/meal-detail-sdkeleton";
import {
  addToCart,
  CART_UPDATED_EVENT,
  isInCart,
  removeFromCart,
} from "@/lib/cart";
import Image from "next/image";
import Link from "next/link";

const MealDetails = ({ id }: { id: string }) => {
  const { data, isLoading } = useMenuById(id);
  const meal: MenuInterface | undefined = data?.data;

  console.log(meal);
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
    <Container>
      <div className="grid md:grid-cols-2 gap-10">
        {/* Image */}
        <div className="relative h-80 w-full bg-muted">
          <Image
            src={
              meal.image ||
              "https://i.ibb.co.com/N8PpMRr/Chat-GPT-Image-Feb-1-2026-01-49-03-AM-1.png"
            }
            alt={meal.name}
            fill
            className="object-cover rounded"
            priority={true}
          />
        </div>

        {/* Details */}
        <div className="space-y-5">
          <h1 className="text-3xl font-semibold">{meal.name}</h1>

          {/* Category & Cuisine */}
          <div className="flex flex-wrap gap-2">
            {meal.category?.name && (
              <Badge variant="outline">{meal.category.name}</Badge>
            )}

            {meal.cuisine?.map((c) => (
              <Badge key={c} variant="secondary">
                {c}
              </Badge>
            ))}
          </div>

          {/* Description */}
          <p className="text-muted-foreground">{meal.description}</p>

          {/* Price */}
          <p className="text-2xl font-bold">৳{meal.price}</p>

          {/* Cart Action */}
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

          {/* Provider Info */}
          {meal.provider?.user && (
            <div className="mt-6 rounded-xl border bg-muted/40 p-4">
              <Link href={`/providers/${meal.provider?.id}`}>
                <p className="text-sm text-muted-foreground mb-1">
                  Provided by
                </p>
                <h3 className="text-lg font-medium">
                  {meal.provider.user.providerName}
                </h3>
                <p className="text-sm text-muted-foreground">
                  Owner: {meal.provider.user.name}
                </p>
              </Link>
            </div>
          )}

          {/* Reviews */}
          {meal.reviews && meal.reviews.length > 0 && (
            <div className="mt-8 space-y-4">
              <h3 className="text-lg font-semibold">
                Reviews ({meal.reviews.length})
              </h3>

              <div className="space-y-4">
                {meal.reviews.map((review) => (
                  <div
                    key={review.id}
                    className="rounded-xl border p-4 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-sm">{review.user.name}</p>
                      <span className="text-sm font-semibold">
                        ⭐ {review.rating}/5
                      </span>
                    </div>

                    <p className="text-sm text-muted-foreground">
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default MealDetails;
