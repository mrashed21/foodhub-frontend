import AdminStats from "@/components/admin/stats/admin-stats";
export const metadata = {
  title: "Dashboard",
};
const AdminPage = () => {
  return (
    <section>
      <AdminStats />
    </section>
  );
};

export default AdminPage;
