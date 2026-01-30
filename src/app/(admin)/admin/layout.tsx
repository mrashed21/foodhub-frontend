"use client";

import AdminHeader from "@/components/admin/admin-sidebar/admin-header";
import AdminSidebar from "@/components/admin/admin-sidebar/admin-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden">
        <AdminSidebar />

        <div className="flex flex-1 flex-col overflow-hidden">
          <AdminHeader />

          <main className="flex-1 overflow-y-auto p-6 bg-muted/30">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
