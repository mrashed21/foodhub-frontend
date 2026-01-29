"use client";

import {
  ChevronDown,
  LayoutDashboard,
  ShoppingBag,
  Tags,
  Users,
  UtensilsCrossed,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { cn } from "@/lib/utils";

const USER_ROUTES = ["/admin/customers", "/admin/providers", "/admin/admins"];

const AdminSidebar = () => {
  const pathname = usePathname();

  //! Active helpers
  const isExact = (href: string) => pathname === href;
  const isNested = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  const isUsersActive = USER_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  const [usersOpen, setUsersOpen] = useState(isUsersActive);

  return (
    <aside className="w-64 border-r bg-background sticky top-[70px] h-[calc(100vh-70px)] overflow-y-auto">
      <div className="p-6 text-xl font-bold text-primary">Admin Panel</div>

      <nav className="px-4 space-y-1">
        {/* //! Dashboard */}
        <Link
          href="/admin"
          className={cn(
            "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition",
            isExact("/admin")
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-muted",
          )}
        >
          <LayoutDashboard className="h-4 w-4" />
          Dashboard
        </Link>

        {/* //! Users Dropdown */}
        <button
          onClick={() => setUsersOpen((p) => !p)}
          className={cn(
            "flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition",
            isUsersActive
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-muted",
          )}
        >
          <span className="flex items-center gap-3">
            <Users className="h-4 w-4" />
            Users
          </span>
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform",
              usersOpen && "rotate-180",
            )}
          />
        </button>

        {usersOpen && (
          <div className="ml-6 space-y-1">
            <SubLink
              href="/admin/customers"
              label="Customers"
              active={isNested("/admin/customers")}
            />
            <SubLink
              href="/admin/providers"
              label="Providers"
              active={isNested("/admin/providers")}
            />
            <SubLink
              href="/admin/admins"
              label="Admins"
              active={isNested("/admin/admins")}
            />
          </div>
        )}

        {/* //! Orders */}
        <Link
          href="/admin/orders"
          className={cn(
            "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition",
            isNested("/admin/orders")
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-muted",
          )}
        >
          <ShoppingBag className="h-4 w-4" />
          Orders
        </Link>

        {/* //! Categories */}
        <Link
          href="/admin/categories"
          className={cn(
            "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition",
            isNested("/admin/categories")
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-muted",
          )}
        >
          <Tags className="h-4 w-4" />
          Categories
        </Link>

        {/* //! all meals */}
        <Link
          href="/admin/all-meals"
          className={cn(
            "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition",
            isNested("/admin/all-meals")
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-muted",
          )}
        >
          <UtensilsCrossed className="h-4 w-4" />
          All Meals
        </Link>
      </nav>
    </aside>
  );
};

export default AdminSidebar;

//! Sub Link
const SubLink = ({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) => (
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
