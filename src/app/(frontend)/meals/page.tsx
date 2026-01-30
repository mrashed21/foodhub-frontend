import Container from "@/common/container/container";
import Meals from "@/components/frontend/meals/meal";

export const metadata = {
  title: "Meals",
};
const MealsPage = () => {
  return (
    <section>
      <Container>
        <div>
          <h1 className="text-3xl font-semibold">Browse Meals</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Discover meals from top restaurants
          </p>
        </div>
        <Meals />
      </Container>
    </section>
  );
};

export default MealsPage;
