import Customer from "@/components/admin/customer/customer";
export const metadata = {
  title: "Customers",
};
const CustomersPage = () => {
  return (
    <section className="flex-1 p-6">
      <Customer />
    </section>
  );
};

export default CustomersPage;
