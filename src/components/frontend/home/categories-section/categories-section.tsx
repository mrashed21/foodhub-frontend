"use client";

import { usePublicCategories } from "@/api/public-api/category.api";
import Container from "@/common/container/container";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";

const CategorySkeleton = () => (
  <div className="border rounded-lg p-4 text-center animate-pulse">
    <div className="h-16 w-16 mx-auto rounded bg-muted mb-3" />
    <div className="h-3 w-20 mx-auto rounded bg-muted" />
  </div>
);

const CategoriesSection = () => {
  const { data, isLoading } = usePublicCategories();

  const categories = data?.data?.data ?? [];

  return (
    <section className="py-16">
      <Container>
        <div className="px-4">
          {/* Section title */}
          <h2 className="text-2xl font-semibold mb-8 text-center">
            Browse by Category
          </h2>

          {/* Carousel */}
          <Carousel
            opts={{
              align: "start",
              dragFree: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {/* Loading skeleton */}
              {isLoading &&
                Array.from({ length: 8 }).map((_, i) => (
                  <CarouselItem
                    key={i}
                    className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6"
                  >
                    <CategorySkeleton />
                  </CarouselItem>
                ))}

              {/* Data */}
              {!isLoading &&
                categories.map((category: any) => (
                  <CarouselItem
                    key={category.id}
                    className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6"
                  >
                    <div className="border rounded-lg p-4 text-center cursor-pointer transition hover:shadow">
                      {/* Image */}
                      <div className="relative w-full aspect-square mb-3">
                        <Image
                          src={
                            category.categoryImage ||
                            "https://i.ibb.co.com/N8PpMRr/Chat-GPT-Image-Feb-1-2026-01-49-03-AM-1.png"
                          }
                          alt={category.name}
                          fill
                          className="object-contain"
                        />
                      </div>

                      <p className="font-medium text-sm truncate">
                        {category.name}
                      </p>
                    </div>
                  </CarouselItem>
                ))}
            </CarouselContent>
          </Carousel>
        </div>
      </Container>
    </section>
  );
};

export default CategoriesSection;
