import { LayoutDashboard, Settings, ShoppingBag, StarIcon } from "lucide-react";

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
    title: "Reviews",
    url: "/user/reviews",
    icon: StarIcon,
  },
  {
    title: "Settings",
    url: "/user/settings",
    icon: Settings,
  },
];
