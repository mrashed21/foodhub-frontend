"use client";

import { ChevronDown } from "lucide-react";
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
import { vendorSidebarMenu } from "./vendor-sidebar-data";

const isRouteActive = (pathname: string, item: any) => {
  if (item.url) {
    return pathname === item.url || pathname.startsWith(item.url + "/");
  }

  if (item.items?.length) {
    return item.items.some(
      (sub: any) => pathname === sub.url || pathname.startsWith(sub.url + "/"),
    );
  }

  return false;
};

const VendorSidebar = () => {
  const pathname = usePathname();
  const { state, setOpen } = useSidebar();

  const isCollapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon" className="transition-all duration-300">
      <SidebarHeader className="px-1 py-3 font-semibold text-lg flex justify-center">
        {isCollapsed ? (
          <span className="w-10 h-10 flex items-center justify-center rounded-full bg-accent-foreground text-white">
            VP
          </span>
        ) : (
          <span>Vendor Panel</span>
        )}
      </SidebarHeader>

      <SidebarContent className="px-1">
        <nav className="space-y-1">
          {vendorSidebarMenu.map((item, index) => {
            const Icon = item.icon;
            const active = isRouteActive(pathname, item);

            /* //! NESTED (Orders) */
            if (item.items?.length) {
              return (
                <TooltipProvider key={index} delayDuration={0}>
                  <Tooltip open={isCollapsed ? undefined : false}>
                    <details
                      open={!isCollapsed && active}
                      className="group/details"
                    >
                      <TooltipTrigger asChild>
                        <summary
                          onClick={(e) => {
                            if (isCollapsed) {
                              e.preventDefault();
                              setOpen(true);
                            }
                          }}
                          className={cn(
                            "flex cursor-pointer items-center justify-between rounded-md px-3 py-2 hover:bg-accent",
                            active && "bg-accent font-medium",
                          )}
                        >
                          <div className="flex items-center gap-3">
                            <Icon className="h-5 w-5 shrink-0" />
                            {!isCollapsed && <span>{item.title}</span>}
                          </div>

                          {!isCollapsed && (
                            <ChevronDown className="h-4 w-4 transition-transform group-open/details:rotate-180" />
                          )}
                        </summary>
                      </TooltipTrigger>

                      {/* //! Tooltip (collapsed) */}
                      {isCollapsed && (
                        <TooltipContent side="right">
                          {item.title}
                        </TooltipContent>
                      )}

                      {/* //! Sub routes */}
                      {!isCollapsed && (
                        <div className="ml-6 mt-1 space-y-1">
                          {item.items.map((sub: any, i: number) => {
                            const subActive =
                              pathname === sub.url ||
                              pathname.startsWith(sub.url + "/");

                            return (
                              <Link
                                key={i}
                                href={sub.url}
                                className={cn(
                                  "block rounded-md px-3 py-1.5 text-sm hover:bg-accent",
                                  subActive && "bg-accent font-medium",
                                )}
                              >
                                {sub.title}
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </details>
                  </Tooltip>
                </TooltipProvider>
              );
            }

            /* //! SINGLE  */
            return (
              <TooltipProvider key={index} delayDuration={0}>
                <Tooltip open={isCollapsed ? undefined : false}>
                  <TooltipTrigger asChild>
                    <Link
                      href={item.url!}
                      className={cn(
                        "flex items-center gap-3 rounded-md px-3 py-2 hover:bg-accent",
                        active && "bg-accent font-medium",
                      )}
                    >
                      <Icon className="h-5 w-5 shrink-0" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </Link>
                  </TooltipTrigger>

                  {isCollapsed && (
                    <TooltipContent side="right">{item.title}</TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            );
          })}
        </nav>
      </SidebarContent>
    </Sidebar>
  );
};

export default VendorSidebar;
