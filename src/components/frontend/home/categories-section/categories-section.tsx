"use client";

import Container from "@/common/container/container";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const categories = [
  { name: "Burgers", icon: "🍔" },
  { name: "Pizza", icon: "🍕" },
  { name: "Rice", icon: "🍚" },
  { name: "Drinks", icon: "🥤" },
  { name: "Desserts", icon: "🍰" },
  { name: "Fast Food", icon: "🍟" },
  { name: "Healthy", icon: "🥗" },
];

const CategoriesSection = () => {
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
              {categories.map((category, i) => (
                <CarouselItem
                  key={i}
                  className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6"
                >
                  <div className="border rounded-lg p-4 text-center cursor-pointer transition hover:shadow">
                    <div className="text-3xl mb-2">{category.icon}</div>
                    <p className="font-medium text-sm">{category.name}</p>
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
