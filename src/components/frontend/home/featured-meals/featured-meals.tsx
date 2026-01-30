import Container from "@/common/container/container";
import { Button } from "@/components/ui/button";

const FeaturedMeals = () => {
  return (
    <section className="bg-muted/30 py-16">
      <Container>
        <div className="px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-semibold">Featured Meals</h2>
            <Button variant="ghost">View All</Button>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 ">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="border rounded-lg overflow-hidden bg-background "
              >
                <div className="h-40 bg-muted" />

                <div className="p-4 space-y-1">
                  <h3 className="font-semibold">Meal Name</h3>
                  <p className="text-sm text-muted-foreground">
                    Restaurant Name
                  </p>
                  <p className="font-medium">৳250</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default FeaturedMeals;
