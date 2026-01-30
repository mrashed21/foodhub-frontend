"use client";

import Container from "@/common/container/container";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

/* ---------------------------------------------------
   Dummy testimonials (later API data replaceable)
--------------------------------------------------- */
const testimonials = [
  {
    quote: "Amazing food and super fast delivery!",
    name: "John Doe",
  },
  {
    quote: "Best food ordering experience I’ve had.",
    name: "Sarah Ahmed",
  },
  {
    quote: "Great variety and excellent service.",
    name: "Michael Lee",
  },
  {
    quote: "Loved the UI and the food quality!",
    name: "Ayesha Khan",
  },
];

const Testimonials = () => {
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
          {/* Section title */}
          <h2 className="text-2xl font-semibold mb-10 text-center">
            What Customers Say
          </h2>

          {/* Carousel */}
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[autoplay.current]}
            className="w-full"
          >
            <CarouselContent>
              {testimonials.map((item, i) => (
                <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/3">
                  <div className="bg-background p-6 rounded-lg shadow-sm h-full">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      “{item.quote}”
                    </p>
                    <p className="mt-4 font-medium text-sm">— {item.name}</p>
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
