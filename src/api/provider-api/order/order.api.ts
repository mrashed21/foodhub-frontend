import api from "@/api/axios";
import { useQuery } from "@tanstack/react-query";

export type OrderStatus =
  | "placed"
  | "preparing"
  | "ready"
  | "delivered"
  | "cancelled";

export interface ProviderOrder {
  id: string;
  invoice: string;
  status: OrderStatus;
  totalAmount: number;
  createdAt: string;
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

interface ProviderOrdersResponse {
  data: ProviderOrder[];
  pagination: {
    page: number;
    limit: number;
    totalData: number;
    totalPage: number;
  };
}

export interface GetProviderOrdersParams {
  page: number;
  limit: number;
  search?: string;
  status?: OrderStatus;
}

const getProviderOrdersApi = async (
  params: GetProviderOrdersParams,
): Promise<ProviderOrdersResponse> => {
  const { data } = await api.get("/order/provider", {
    params,
  });

  return data.data;
};

export const useProviderOrders = (params: GetProviderOrdersParams) => {
  const { page, limit, search, status } = params;

  return useQuery({
    queryKey: ["provider-orders", page, limit, search, status],
    queryFn: () =>
      getProviderOrdersApi({
        page,
        limit,
        ...(search ? { search } : {}),
        ...(status ? { status } : {}),
      }),
    // keepPreviousData: true,
  });
};
