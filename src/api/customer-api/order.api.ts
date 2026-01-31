import api from "@/api/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GetPaginationParams } from "../admin-api/category/category.api";

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
//! CREATE ORDER api
const createOrderApi = async (
  payload: CreateOrderPayload,
): Promise<OrderInterface[]> => {
  const { data } = await api.post("/order", payload);
  return data.data;
};

//! CREATE ORDER  hook
export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createOrderApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-orders"] });
    },
  });
};

//! get CUSTOMER – MY ORDERS

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
//!get CUSTOMER – MY ORDERS

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

// !order details
const getOrdersDetailsApi = async (id: string) => {
  const { data } = await api.get(`/order/${id}`);
  return data;
};

//!order details

export const useOrdersDetails = (id: string) => {
  return useQuery({
    queryKey: ["my-orders"],
    queryFn: () => getOrdersDetailsApi(id),
  });
};



// ! UPDATE ORDER STATUS

const updateOrderStatusApi = async (payload: {
  id: string;
  status: OrderStatus;
}) => {
  const { data } = await api.patch("/order", payload);
  return data;
};

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateOrderStatusApi,

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["order", variables.id],
      });

      queryClient.invalidateQueries({
        queryKey: ["my-orders"],
      });

      queryClient.invalidateQueries({
        queryKey: ["provider-orders"],
      });
    },
  });
};
