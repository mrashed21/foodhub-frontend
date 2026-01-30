import api from "@/api/axios";
import { useQuery } from "@tanstack/react-query";

//! MENU TYPES (MATCHES PRISMA)

export interface MenuInterface {
  id: string;

  providerId: string;
  provider: {
    id: string;
    name: string;
  };

  name: string;
  description: string;
  price: number;
  image?: string | null;

  categoryId: string;
  category?: {
    id: string;
    name: string;
  };

  cuisine: string[];

  isAvailable: boolean;

  createdAt: string;
  updatedAt: string;
}

//! GET MENUS (Pagination + Search)

export interface GetMenusParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  cuisine?: string;
  priceRange?: string;
}

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
  category,
  cuisine,
  priceRange,
}: GetMenusParams): Promise<PaginatedMenusResponse> => {
  const params: Record<string, any> = { page, limit };

  if (search?.trim()) {
    params.search = search;
  }

  if (category?.trim()) {
    params.category = category;
  }

  if (cuisine?.trim()) {
    params.cuisine = cuisine;
  }

  if (priceRange?.trim()) {
    params.priceRange = priceRange;
  }

  const { data } = await api.get("/menu", { params });
  return data;
};

export const useMenus = (params: GetMenusParams = {}) => {
  return useQuery({
    queryKey: ["menu", params],
    queryFn: () => getMenusApi(params),
  });
};

// ! get menu by id

const getMenuByIdApi = async (id: string): Promise<{ data: MenuInterface }> => {
  console.log("id", id);
  const { data } = await api.get(`/menu/${id}`);
  return data;
};

export const useMenuById = (id: string) => {
  return useQuery({
    queryKey: ["menu", id],
    queryFn: () => getMenuByIdApi(id),
  });
};
