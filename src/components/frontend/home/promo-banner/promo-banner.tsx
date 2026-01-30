import Container from "@/common/container/container";
import { Button } from "@/components/ui/button";

const PromoBanner = () => {
  return (
    <section className="py-16 bg-primary text-primary-foreground">
      <Container>
        <div className="px-4 text-center">
          <h2 className="text-3xl font-bold">Own a Restaurant?</h2>
          <p className="mt-3">Join FoodHub and grow your business</p>

          <Button variant="secondary" className="mt-6">
            Become a Provider
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default PromoBanner;
