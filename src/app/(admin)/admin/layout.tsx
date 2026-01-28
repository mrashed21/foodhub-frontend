import AdminSidebar from "@/components/admin/admin-sidebar/admin-sidebar";

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="flex">
      <AdminSidebar />
      <main className="flex-1 p-6 bg-muted/30">{children}</main>
    </section>
  );
};

export default AdminLayout;
