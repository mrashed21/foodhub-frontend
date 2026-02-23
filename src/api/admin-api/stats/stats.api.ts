import api from "@/api/axios";
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
  const { data } = await api.get("/provider/stats");
  return data;
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
  const { data } = await api.get("/stats/admin");
  return data;
};

export const useAdminStats = () => {
  return useQuery({
    queryKey: ["admin-stats"],
    queryFn: getAdminStatsApi,
  });
};
