import VendorSidebar from "@/components/vendor/vendor-sidebar/vendor-sidebar";

const VendorLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="flex">
      <VendorSidebar />

      <main className="flex-1 p-6 bg-muted/30">{children}</main>
    </section>
  );
};

export default VendorLayout;
