import api from "@/api/axios";
import { useQuery } from "@tanstack/react-query";

export type OrderStatus =
  | "placed"
  | "preparing"
  | "ready"
  | "delivered"
  | "cancelled";

export interface AdminOrder {
  id: string;
  invoice: string;
  status: OrderStatus;
  totalAmount: number;
  createdAt: string;

  provider: {
    id: string;
    user: {
      id: string;
      name: string;
      email: string;
      providerName?: string;
    };
  };

  user: {
    id: string;
    name: string;
    email: string;
  };

  orderItems: {
    id: string;
    quantity: number;
    price: number;
  }[];
}

interface AdminOrdersResponse {
  data: AdminOrder[];
  pagination: {
    page: number;
    limit: number;
    totalData: number;
    totalPage: number;
  };
}

export interface GetAdminOrdersParams {
  page: number;
  limit: number;
  search?: string;
  status?: OrderStatus;
  provider?: string;
}

const getAdminOrdersApi = async (
  params: GetAdminOrdersParams,
): Promise<AdminOrdersResponse> => {
  const { data } = await api.get("/order/admin", {
    params,
  });

  return data.data;
};

//! React Query Hook
export const useAdminOrders = (params: GetAdminOrdersParams) => {
  const { page, limit, search, status, provider } = params;

  return useQuery<AdminOrdersResponse>({
    queryKey: ["admin-orders", page, limit, search, status, provider],
    queryFn: () =>
      getAdminOrdersApi({
        page,
        limit,
        ...(search ? { search } : {}),
        ...(status ? { status } : {}),
        ...(provider ? { provider } : {}),
      }),
    // keepPreviousData: true,
  });
};
