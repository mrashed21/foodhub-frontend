import { useQuery } from "@tanstack/react-query";

/* ================= TYPES ================= */

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

export interface AdminOrdersResponse {
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

/* ================= API CALL (PROXY) ================= */

const getAdminOrdersApi = async (
  params: GetAdminOrdersParams,
): Promise<AdminOrdersResponse> => {
  // query string build
  const query = new URLSearchParams(
    Object.entries(params).reduce(
      (acc, [key, value]) => {
        if (value !== undefined && value !== "") {
          acc[key] = String(value);
        }
        return acc;
      },
      {} as Record<string, string>,
    ),
  ).toString();

  // 🔥 PROXY CALL (cookie + headers auto handled)
  const res = await fetch(`/api/proxy/order/admin?${query}`);

  if (!res.ok) {
    throw new Error("Failed to fetch admin orders");
  }

  const json = await res.json();

  // backend response structure অনুযায়ী
  // {
  //   success: true,
  //   data: { data: [...], pagination: {...} }
  // }
  return json.data;
};

/* ================= REACT QUERY HOOK ================= */

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
