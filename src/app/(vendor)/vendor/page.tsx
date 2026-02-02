import ProviderStats from "@/components/vendor/stats/provider-stats";
export const metadata = {
  title: "Dashboard",
};
const VendorHome = () => {
  return (
    <section>
      <ProviderStats />
    </section>
  );
};

export default VendorHome;
