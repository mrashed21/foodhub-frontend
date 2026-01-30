import api from "@/api/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GetPaginationParams } from "../admin-api/category/category.api";

/* =========================
   TYPES
========================= */

export type OrderStatus =
  | "placed"
  | "preparing"
  | "ready"
  | "delivered"
  | "cancelled";

export interface OrderItemInterface {
  id: string;
  menuId: string;
  quantity: number;
  price: number;

  menu?: {
    id: string;
    name: string;
    price: number;
  };
}

export interface OrderInterface {
  id: string;

  userId: string;
  providerId: string;

  phone: string;
  address: string;

  totalAmount: number;
  status: OrderStatus;

  createdAt: string;
  updatedAt: string;

  user?: {
    id: string;
    name: string;
    email: string;
  };

  provider?: {
    id: string;
    user?: {
      id: string;
      name: string;
      providerName: string;
    };
  };

  orderItems: OrderItemInterface[];
}

/* =========================
   CREATE ORDER
========================= */

export interface CreateOrderPayload {
  phone: string;
  address: string;
  items: {
    menuId: string;
    providerId: string;
    quantity: number;
    price: number;
  }[];
}

/**
 * Backend returns: OrderInterface[]
 * (because multi-vendor = multiple orders)
 */
const createOrderApi = async (
  payload: CreateOrderPayload,
): Promise<OrderInterface[]> => {
  const { data } = await api.post("/order", payload);
  return data.data;
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createOrderApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-orders"] });
    },
  });
};

/* =========================
   CUSTOMER – MY ORDERS
========================= */

const getMyOrdersApi = async ({
  page = 1,
  limit = 10,
  search,
}: GetPaginationParams) => {
  const params: any = { page, limit };

  if (search?.trim()) {
    params.search = search;
  }

  const { data } = await api.get("/order", { params });
  return data;
};

export const useMyOrders = ({
  page = 1,
  limit = 10,
  search,
}: GetPaginationParams) => {
  return useQuery({
    queryKey: ["my-orders", page, limit, search],
    queryFn: () => getMyOrdersApi({ page, limit, search }),
  });
};

/* =========================
   PROVIDER – ORDERS
========================= */

interface ProviderOrdersParams {
  search?: string;
}

const getOrdersForProviderApi = async ({ search }: ProviderOrdersParams) => {
  const params: any = {};

  if (search?.trim()) {
    params.search = search;
  }

  const { data } = await api.get("/orders/provider", { params });
  return data;
};

export const useOrdersForProvider = ({ search }: ProviderOrdersParams) => {
  return useQuery({
    queryKey: ["provider-orders", search],
    queryFn: () => getOrdersForProviderApi({ search }),
  });
};

/* =========================
   ORDER DETAILS
========================= */

const getOrderByIdApi = async (id: string) => {
  const { data } = await api.get(`/orders/${id}`);
  return data;
};

export const useOrderById = (id: string) => {
  return useQuery({
    queryKey: ["order", id],
    queryFn: () => getOrderByIdApi(id),
    enabled: !!id,
  });
};

/* =========================
   UPDATE ORDER STATUS
========================= */

const updateOrderStatusApi = async ({
  id,
  status,
}: {
  id: string;
  status: OrderStatus;
}) => {
  const { data } = await api.patch(`/orders/${id}/status`, { status });
  return data;
};

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateOrderStatusApi,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["order", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["my-orders"] });
      queryClient.invalidateQueries({ queryKey: ["provider-orders"] });
    },
  });
};
