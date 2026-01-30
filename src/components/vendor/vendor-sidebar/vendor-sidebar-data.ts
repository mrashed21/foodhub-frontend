import { LayoutDashboard, Settings, ShoppingBag, Utensils } from "lucide-react";

export const vendorSidebarMenu = [
  {
    title: "Dashboard",
    url: "/vendor",
    icon: LayoutDashboard,
  },
  {
    title: "Menu",
    url: "/vendor/menu",
    icon: Utensils,
  },
  {
    title: "Orders",
    icon: ShoppingBag,
    items: [
      { title: "Pending Orders", url: "/vendor/pending-orders" },
      { title: "Processing Orders", url: "/vendor/processing-orders" },
      { title: "Completed Orders", url: "/vendor/completed-orders" },
      { title: "Cancelled Orders", url: "/vendor/cancelled-orders" },
      { title: "Returned Orders", url: "/vendor/returned-orders" },
    ],
  },
  {
    title: "Settings",
    url: "/vendor/settings",
    icon: Settings,
  },
];
