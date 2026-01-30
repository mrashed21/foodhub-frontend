import Container from "@/common/container/container";
import MealDetails from "@/components/frontend/meals/meal-details";

interface Props {
  params: {
    id: string;
  };
}

const MealDetailsPage = async ({ params }: Props) => {
  const { id } = await params;
  console.log("PAGE PARAMS 👉", id);

  return (
    <section className="py-10">
      <Container>
        <MealDetails id={id} />
      </Container>
    </section>
  );
};

export default MealDetailsPage;
