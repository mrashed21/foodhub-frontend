"use client";

import DashboardHeader from "@/common/dashboard-header/dashboad-header";
import CustomerSidebar from "@/components/customer/customer-sidebar/customer-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

const CustomerLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden">
        <CustomerSidebar />

        <div className="flex flex-1 flex-col overflow-hidden">
          <DashboardHeader />
          <main className="flex-1 overflow-y-auto p-6 bg-muted/30">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default CustomerLayout;
