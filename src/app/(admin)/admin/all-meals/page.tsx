import AllMeals from "@/components/admin/all-meals/all-meals";

export const metadata = {
  title: "All Meals",
};
const AllMealsPage = () => {
  return (
    <section className="flex-1 ">
      <AllMeals />
    </section>
  );
};

export default AllMealsPage;
