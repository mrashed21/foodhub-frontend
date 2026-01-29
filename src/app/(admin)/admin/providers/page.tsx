import Provider from "@/components/admin/provider/provider";
export const metadata = {
  title: "Providers",
};
const ProvidersPage = () => {
  return (
    <section className="flex-1 p-6">
      <Provider />
    </section>
  );
};

export default ProvidersPage;
