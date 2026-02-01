"use client";

import { usePublicProviders } from "@/api/public-api/provider.api";
import Container from "@/common/container/container";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

const TopProviders = () => {
  const { data, isLoading } = usePublicProviders();

  const providers = data?.data ?? [];

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
              {/* 🔹 Loading Skeleton */}
              {isLoading &&
                Array.from({ length: 6 }).map((_, i) => (
                  <CarouselItem
                    key={i}
                    className="basis-1/2 sm:basis-1/3 md:basis-1/4"
                  >
                    <div className="border rounded-lg p-4 text-center">
                      <Skeleton className="h-16 w-16 rounded-full mx-auto mb-3" />
                      <Skeleton className="h-4 w-3/4 mx-auto mb-2" />
                      <Skeleton className="h-3 w-1/2 mx-auto" />
                    </div>
                  </CarouselItem>
                ))}

              {/* 🔹 Provider Data */}
              {!isLoading &&
                providers.map((provider) => (
                  <CarouselItem
                    key={provider.id}
                    className="basis-1/2 sm:basis-1/3 md:basis-1/4"
                  >
                    <Link href={`/provider/${provider.id}`}>
                      {" "}
                      <div className="border rounded-lg p-4 text-center transition hover:shadow cursor-pointer">
                        {/* Avatar */}
                        <div className="h-16 w-16 mx-auto rounded-full bg-muted mb-3 flex items-center justify-center text-sm font-semibold">
                          {provider.user.name.charAt(0)}
                        </div>

                        {/* Info */}
                        <h3 className="font-medium text-sm">
                          {provider.user.name}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-1">
                          {provider._count.menus}+ meals
                        </p>
                      </div>{" "}
                    </Link>
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
