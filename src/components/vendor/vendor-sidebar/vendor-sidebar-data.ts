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
    url: "/vendor/orders",
  },
  {
    title: "Settings",
    url: "/vendor/settings",
    icon: Settings,
  },
];
