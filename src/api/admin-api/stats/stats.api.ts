import { useQuery } from "@tanstack/react-query";

/* ================= PROVIDER STATS ================= */

export interface ProviderStats {
  totalOrders: number;
  totalPendingOrders: number;
  totalCompletedOrders: number;
  totalCancelledOrders: number;
  totalDeliveredOrders: number;
  totalMenus: number;
}

const getProviderStatsApi = async () => {
  const res = await fetch("/api/provider/stats");
  if (!res.ok) throw new Error("Failed to fetch provider stats");
  return res.json();
};

export const useProviderStats = () => {
  return useQuery({
    queryKey: ["provider-stats"],
    queryFn: getProviderStatsApi,
  });
};

/* ================= ADMIN STATS ================= */

export interface AdminStats {
  totalUsers: number;
  totalProviders: number;
  totalCustomers: number;
  totalOrders: number;
  totalPendingOrders: number;
  totalCompletedOrders: number;
  totalCancelledOrders: number;
  totalDeliveredOrders: number;
  totalMenus: number;
  totalCategories: number;
  totalReviews: number;
}

const getAdminStatsApi = async () => {
  const res = await fetch("/api/admin/stats");
  if (!res.ok) throw new Error("Failed to fetch admin stats");
  return res.json();
};

export const useAdminStats = () => {
  return useQuery({
    queryKey: ["admin-stats"],
    queryFn: getAdminStatsApi,
  });
};
