"use client";

import DashboardHeader from "@/common/dashboard-header/dashboad-header";
import { SidebarProvider } from "@/components/ui/sidebar";
import VendorSidebar from "@/components/vendor/vendor-sidebar/vendor-sidebar";

const VendorLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden">
        <VendorSidebar />

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

export default VendorLayout;
