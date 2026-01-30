import Container from "@/common/container/container";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="bg-linear-to-r from-primary/10 to-primary/5 py-20">
      <Container>
        <div className="px-4 text-center mx-auto max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Order Your Favorite Meals
          </h1>

          <p className="mt-4 text-muted-foreground text-lg">
            Fresh, delicious meals from trusted restaurants near you
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <Link href="/meals">
              {" "}
              <Button size="lg">Browse Meals</Button>
            </Link>
            <Link href={"/auth/register"}>
              <Button size="lg" variant="outline">
                Become a Provider
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HeroSection;
