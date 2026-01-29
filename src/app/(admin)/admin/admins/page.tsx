import Admin from "@/components/admin/admin/admin";

export const metadata = {
  title: "Admins",
};
const AdminsPage = () => {
  return (
    <section className="flex-1 p-6">
      <Admin />
    </section>
  );
};

export default AdminsPage;
