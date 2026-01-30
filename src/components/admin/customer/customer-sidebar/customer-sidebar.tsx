"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
} from "@/components/ui/sidebar";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

import { cn } from "@/lib/utils";
import { customerSidebarMenu } from "./customer-sidebar-data";

const isRouteActive = (pathname: string, url: string) =>
  pathname === url || pathname.startsWith(url + "/");

const CustomerSidebar = () => {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" className="transition-all duration-300">
      {/* HEADER */}
      <SidebarHeader className="px-1 py-3 font-semibold text-lg lg:flex justify-center hidden ">
        <span>My Account</span>
      </SidebarHeader>

      {/* CONTENT */}
      <SidebarContent className="px-1">
        <nav className="space-y-1">
          {customerSidebarMenu.map((item, index) => {
            const Icon = item.icon;
            const active = isRouteActive(pathname, item.url);

            return (
              <TooltipProvider key={index} delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href={item.url}
                      className={cn(
                        "flex items-center gap-3 rounded-md px-3 py-2 hover:bg-accent",
                        active && "bg-accent font-medium",
                      )}
                    >
                      <Icon className="h-5 w-5 shrink-0" />
                      <span>{item.title}</span>
                    </Link>
                  </TooltipTrigger>

                  <TooltipContent side="right">{item.title}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            );
          })}
        </nav>
      </SidebarContent>
    </Sidebar>
  );
};

export default CustomerSidebar;
