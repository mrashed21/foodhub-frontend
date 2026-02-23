import api from "@/api/axios";
import { useQuery } from "@tanstack/react-query";
import { GetMenusParams, MenuInterface } from "../public-api/menu.api";

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

const getMenusAdminApi = async ({
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

  const { data } = await api.get("/menu/admin", { params });
  return data;
};

export const useMenusAdmin = (params: GetMenusParams = {}) => {
  return useQuery({
    queryKey: ["menu/admin", params],
    queryFn: () => getMenusAdminApi(params),
  });
};
