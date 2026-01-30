"use client";

import Container from "@/common/container/container";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const providers = [
  { name: "Burger House", meals: 25 },
  { name: "Pizza Point", meals: 18 },
  { name: "Rice Bowl", meals: 30 },
  { name: "Drink Station", meals: 12 },
  { name: "Healthy Hub", meals: 20 },
];

const TopProviders = () => {
  return (
    <section className="py-16">
      <Container>
        <div className="px-4">
          {/* Section title */}
          <h2 className="text-2xl font-semibold mb-8">Top Restaurants</h2>

          {/* Carousel */}
          <Carousel
            opts={{
              align: "start",
              dragFree: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {providers.map((provider, i) => (
                <CarouselItem
                  key={i}
                  className="basis-1/2 sm:basis-1/3 md:basis-1/4"
                >
                  <div className="border rounded-lg p-4 text-center transition hover:shadow cursor-pointer">
                    {/* Avatar / Logo */}
                    <div className="h-16 w-16 mx-auto rounded-full bg-muted mb-3" />

                    {/* Provider info */}
                    <h3 className="font-medium text-sm">{provider.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {provider.meals}+ meals
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

export default TopProviders;
