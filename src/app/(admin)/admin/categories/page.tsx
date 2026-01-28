import Category from "@/components/admin/category/category";

export const metadata = {
  title: "Categories",
};
const CategoriesPage = () => {
  return (
    <section className="flex-1">
      <Category />
    </section>
  );
};

export default CategoriesPage;
