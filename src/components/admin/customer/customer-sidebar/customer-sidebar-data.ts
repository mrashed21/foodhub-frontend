import {
  LayoutDashboard,
  ShoppingBag,
  MapPin,
  Settings,
} from "lucide-react";

export const customerSidebarMenu = [
  {
    title: "Dashboard",
    url: "/user",
    icon: LayoutDashboard,
  },
  {
    title: "Orders",
    url: "/user/orders",
    icon: ShoppingBag,
  },
  {
    title: "Addresses",
    url: "/user/addresses",
    icon: MapPin,
  },
  {
    title: "Settings",
    url: "/user/settings",
    icon: Settings,
  },
];
