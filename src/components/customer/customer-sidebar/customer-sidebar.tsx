"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  useSidebar,
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
  const { state, setOpen } = useSidebar();

  const isCollapsed = state === "collapsed";
  return (
    <Sidebar collapsible="icon" className="transition-all duration-300">
      {/* HEADER */}
      <SidebarHeader className="px-1 py-3 font-semibold text-lg flex justify-center">
        {isCollapsed ? (
          <span className="w-10 h-10 flex items-center justify-center rounded-full bg-accent-foreground text-white">
            MA
          </span>
        ) : (
          <span>My Accounts</span>
        )}
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
