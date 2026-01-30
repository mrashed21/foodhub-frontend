"use client";

import Container from "@/common/container/container";
import { Search, ShoppingCart, Smile } from "lucide-react";

const steps = [
  {
    step: "01",
    title: "Browse Meals",
    description: "Explore delicious meals from trusted restaurants near you.",
    icon: Search,
  },
  {
    step: "02",
    title: "Place Order",
    description: "Choose your favorite food and order in just a few clicks.",
    icon: ShoppingCart,
  },
  {
    step: "03",
    title: "Enjoy Food",
    description: "Get your meal delivered fresh and fast at your doorstep.",
    icon: Smile,
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-muted/30">
      <Container>
        <div className="px-4">
          {/* Section header */}
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl font-semibold">How FoodHub Works</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Ordering food has never been this easy
            </p>
          </div>

          {/* Steps */}
          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.step}
                  className="group relative rounded-xl border bg-background p-6 text-center transition hover:shadow-md"
                >
                  {/* Step number */}
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                    {item.step}
                  </span>

                  {/* Icon */}
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary transition group-hover:scale-110">
                    <Icon className="h-6 w-6" />
                  </div>

                  {/* Content */}
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HowItWorks;
