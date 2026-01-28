"use client";

import {
  ChevronDown,
  LayoutDashboard,
  Settings,
  ShoppingBag,
  Utensils,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { cn } from "@/lib/utils";

//! Orders Route Group
const ORDER_ROUTES = [
  "/vendor/pending-orders",
  "/vendor/processing-orders",
  "/vendor/completed-orders",
  "/vendor/cancelled-orders",
  "/vendor/returned-orders",
];

const VendorSidebar = () => {
  const pathname = usePathname();

  //! Active Helpers (IMPORTANT)
  const isExact = (href: string) => pathname === href;

  const isNested = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  const isOrdersActive = ORDER_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  //! Orders Dropdown State
  const [ordersOpen, setOrdersOpen] = useState(isOrdersActive);

  return (
    <aside className="w-64 border-r bg-background sticky top-[70px] h-[calc(100vh-70px)]">
      <div className="p-6 text-xl font-bold text-primary">Vendor Panel</div>

      <nav className="px-4 space-y-1">
        {/*//! Dashboard */}
        <Link
          href="/vendor"
          className={cn(
            "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition",
            isExact("/vendor")
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-muted",
          )}
        >
          <LayoutDashboard className="h-4 w-4" />
          Dashboard
        </Link>

        {/*//! Menu */}
        <Link
          href="/vendor/menu"
          className={cn(
            "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition",
            isNested("/vendor/menu")
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-muted",
          )}
        >
          <Utensils className="h-4 w-4" />
          Menu
        </Link>

        {/*//! Orders Dropdown */}
        <button
          onClick={() => setOrdersOpen((prev) => !prev)}
          className={cn(
            "flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition",
            isOrdersActive
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-muted",
          )}
        >
          <span className="flex items-center gap-3">
            <ShoppingBag className="h-4 w-4" />
            Orders
          </span>
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform",
              ordersOpen && "rotate-180",
            )}
          />
        </button>

        {ordersOpen && (
          <div className="ml-6 space-y-1">
            <OrderLink
              href="/vendor/pending-orders"
              label="Pending Orders"
              active={isNested("/vendor/pending-orders")}
            />
            <OrderLink
              href="/vendor/processing-orders"
              label="Processing Orders"
              active={isNested("/vendor/processing-orders")}
            />
            <OrderLink
              href="/vendor/completed-orders"
              label="Completed Orders"
              active={isNested("/vendor/completed-orders")}
            />
            <OrderLink
              href="/vendor/cancelled-orders"
              label="Cancelled Orders"
              active={isNested("/vendor/cancelled-orders")}
            />
            <OrderLink
              href="/vendor/returned-orders"
              label="Returned Orders"
              active={isNested("/vendor/returned-orders")}
            />
          </div>
        )}

        {/*//!  Settings  */}
        <Link
          href="/vendor/settings"
          className={cn(
            "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition",
            isNested("/vendor/settings")
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-muted",
          )}
        >
          <Settings className="h-4 w-4" />
          Settings
        </Link>
      </nav>
    </aside>
  );
};

export default VendorSidebar;

//! Order Sub Link Component
const OrderLink = ({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) => {
  return (
    <Link
      href={href}
      className={cn(
        "block rounded-md px-3 py-2 text-sm transition",
        active
          ? "bg-muted font-medium text-primary"
          : "text-muted-foreground hover:bg-muted",
      )}
    >
      {label}
    </Link>
  );
};
