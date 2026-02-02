import api from "@/api/axios";
import { useQuery } from "@tanstack/react-query";

//! TYPES
export interface ProviderStats {
  totalOrders: number;
  totalPendingOrders: number;
  totalCompletedOrders: number;
  totalCancelledOrders: number;
  totalDeliveredOrders: number;
  totalMenus: number;
}

//* GET Provider Stats API
const getProviderStatsApi = async () => {
  const { data } = await api.get("/stats/provider");
  return data;
};

//* Provider Stats Hook
export const useProviderStats = () => {
  return useQuery({
    queryKey: ["provider-stats"],
    queryFn: getProviderStatsApi,
  });
};

//! TYPES
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

//* GET Admin Stats API
const getAdminStatsApi = async () => {
  const { data } = await api.get("/stats/admin");
  return data;
};

//* Admin Stats Hook
export const useAdminStats = () => {
  return useQuery({
    queryKey: ["admin-stats"],
    queryFn: getAdminStatsApi,
  });
};
