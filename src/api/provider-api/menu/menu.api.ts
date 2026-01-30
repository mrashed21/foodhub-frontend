import api from "@/api/axios";
import { GetMenusParams, MenuInterface } from "@/api/public-api/menu.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface PaginatedMenusResponse {
  data: {
    data: MenuInterface[];
    pagination: {
      totalData: number;
      page: number;
      limit: number;
      totalPage: number;
    };
  };
}

const getMenusApi = async ({
  page = 1,
  limit = 10,
  search,
}: GetMenusParams): Promise<PaginatedMenusResponse> => {
  const params: Record<string, any> = { page, limit };

  if (search?.trim()) {
    params.search = search;
  }

  const { data } = await api.get("/menu/provider", { params });
  return data;
};

export const useMenus = (params: GetMenusParams = {}) => {
  return useQuery({
    queryKey: ["menus", params],
    queryFn: () => getMenusApi(params),
  });
};

//! CREATE MENU

export interface CreateMenuPayload {
  name: string;
  description: string;
  price: number;
  image?: string | null;

  categoryId: string;
  cuisine: string[];

  isAvailable?: boolean;
}

const createMenuApi = async (
  payload: CreateMenuPayload,
): Promise<MenuInterface> => {
  const { data } = await api.post("/menu", payload);
  return data;
};

export const useCreateMenu = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createMenuApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["menus"] });
    },
  });
};

//! UPDATE MENU

export interface UpdateMenuPayload {
  id: string;

  name?: string;
  description?: string;
  price?: number;
  image?: string | null;

  categoryId?: string;
  cuisine?: string[];

  isAvailable?: boolean;
}

const updateMenuApi = async (
  payload: UpdateMenuPayload,
): Promise<MenuInterface> => {
  const { data } = await api.patch("/menu", payload);
  return data;
};

export const useUpdateMenu = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateMenuApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["menus"] });
    },
  });
};

//! DELETE MENU

const deleteMenuApi = async (id: string): Promise<{ success: boolean }> => {
  const { data } = await api.delete("/menu", {
    data: { id },
  });
  return data;
};

export const useDeleteMenu = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMenuApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["menus"] });
    },
  });
};
