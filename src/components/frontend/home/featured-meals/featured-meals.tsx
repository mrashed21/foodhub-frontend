"use client";

import { useMenus } from "@/api/public-api/menu.api";
import Container from "@/common/container/container";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const FeaturedMeals = () => {
  const { data, isLoading } = useMenus();

  const meals = data?.data?.data ?? [];

  return (
    <section className="bg-muted/30 py-16">
      <Container>
        <div className="px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-semibold">Featured Meals</h2>
            <Link href="/meals">
              <Button variant="ghost">View All</Button>
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {meals.slice(0, 8).map((meal) => (
              <Link
                key={meal.id}
                href={`/meals/${meal.id}`}
                className="border rounded-lg overflow-hidden bg-background hover:shadow-md transition block"
              >
                {/* Image */}
                <div className="relative h-40 bg-muted">
                  <Image
                    src={
                      meal.image ||
                      "https://i.ibb.co.com/N8PpMRr/Chat-GPT-Image-Feb-1-2026-01-49-03-AM-1.png"
                    }
                    alt={meal.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Content */}
                <div className="p-4 space-y-1">
                  <h3 className="font-semibold line-clamp-1">{meal.name}</h3>

                  <p className="text-sm text-muted-foreground line-clamp-1">
                    {meal.provider?.user?.providerName}
                  </p>

                  <p className="font-medium">৳{meal.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default FeaturedMeals;
