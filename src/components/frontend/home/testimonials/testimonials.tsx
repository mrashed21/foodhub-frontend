"use client";

import { useReviewForHome } from "@/api/customer-api/review.api";
import Container from "@/common/container/container";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import Autoplay from "embla-carousel-autoplay";
import { Star } from "lucide-react";
import { useRef } from "react";

const Testimonials = () => {
  const { data, isLoading } = useReviewForHome();

  const autoplay = useRef(
    Autoplay({
      delay: 3500,
      stopOnInteraction: true,
    }),
  );

  return (
    <section className="py-16 bg-muted/30">
      <Container>
        <div className="px-4">
          <h2 className="text-2xl font-semibold mb-10 text-center">
            What Customers Say
          </h2>

          <Carousel
            opts={{ align: "start", loop: true }}
            plugins={[autoplay.current]}
            className="w-full"
          >
            <CarouselContent>
              {/* 🔄 Loading Skeleton */}
              {isLoading &&
                Array.from({ length: 3 }).map((_, i) => (
                  <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/3">
                    <div className="bg-background p-6 rounded-lg shadow-sm h-full space-y-4">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-5/6" />
                      <div className="flex items-center gap-2 mt-4">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-4 w-16" />
                      </div>
                    </div>
                  </CarouselItem>
                ))}

              {/* ✅ Real Reviews */}
              {!isLoading &&
                data?.data?.map((review: any) => (
                  <CarouselItem
                    key={review.id}
                    className="md:basis-1/2 lg:basis-1/3"
                  >
                    <div className="bg-background p-6 rounded-lg shadow-sm h-full flex flex-col justify-between">
                      {/* Comment */}
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        “{review.comment}”
                      </p>

                      {/* User + Rating */}
                      <div className="mt-5 flex items-center justify-between">
                        <p className="font-medium text-sm">
                          — {review.user?.name}
                        </p>

                        <div className="flex items-center gap-1">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <Star
                              key={i}
                              className="w-4 h-4 fill-yellow-400 text-yellow-400"
                            />
                          ))}
                        </div>
                      </div>
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

export default Testimonials;
