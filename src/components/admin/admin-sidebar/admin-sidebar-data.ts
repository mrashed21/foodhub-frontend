import {
  LayoutDashboard,
  ShoppingBag,
  Tags,
  Users,
  UtensilsCrossed,
} from "lucide-react";

export const adminSidebarMenu = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Users",
    icon: Users,
    items: [
      { title: "Customers", url: "/admin/customers" },
      { title: "Providers", url: "/admin/providers" },
      { title: "Admins", url: "/admin/admins" },
    ],
  },
  {
    title: "Orders",
    url: "/admin/orders",
    icon: ShoppingBag,
  },
  {
    title: "Categories",
    url: "/admin/categories",
    icon: Tags,
  },
  {
    title: "All Menus",
    url: "/admin/all-meals",
    icon: UtensilsCrossed,
  },
];
