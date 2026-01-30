import api from "@/api/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

//! TYPES

export interface CategoryInterface {
  id: string;
  name: string;
  slug: string;
  isActive: boolean;
  createdAt: string;
  user: {
    id: string;
    name: string;
  };
}

export interface GetPaginationParams {
  page?: number;
  limit?: number;
  search?: string;
}

//* GET Category (pagination + search)
const getCategoriesApi = async ({
  page = 1,
  limit = 10,
  search,
}: GetPaginationParams) => {
  const params: any = { page, limit };

  if (search?.trim()) {
    params.search = search;
  }

  const { data } = await api.get("/category", { params });
  return data;
};

//* GET Categories hook
export const useCategories = ({
  page = 1,
  limit = 10,
  search,
}: GetPaginationParams) => {
  return useQuery({
    queryKey: ["categories", page, limit, search],
    queryFn: () => getCategoriesApi({ page, limit, search }),
    // keepPreviousData: true,
  });
};

//* GET Category (pagination + search) admin
const getCategoriesAdminApi = async ({
  page = 1,
  limit = 10,
  search,
}: GetPaginationParams) => {
  const params: any = { page, limit };

  if (search?.trim()) {
    params.search = search;
  }

  const { data } = await api.get("/category/admin", { params });
  return data;
};

//* GET Categories hook
export const useCategoriesAdmin = ({
  page = 1,
  limit = 10,
  search,
}: GetPaginationParams) => {
  return useQuery({
    queryKey: ["categories/admin", page, limit, search],
    queryFn: () => getCategoriesAdminApi({ page, limit, search }),
    // keepPreviousData: true,
  });
};

//? CREATE Category
const createCategoryApi = async (payload: {
  name: string;
  slug: string;
  isActive: boolean;
}) => {
  const { data } = await api.post("/category", payload);
  return data;
};

//? CREATE Category hook
export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCategoryApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};

// todo UPDATE Category
const updateCategoryApi = async ({
  payload,
}: {
  payload: {
    id: string;
    name: string;
    slug: string;
    isActive: boolean;
  };
}) => {
  const { data } = await api.patch("/category", payload);
  return data;
};

//todo UPDATE Category hook
export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCategoryApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};

//! DELETE Category
const deleteCategoryApi = async (id: string) => {
  const { data } = await api.delete(`/category`, { data: { id } });
  return data;
};

//! DELETE Category hook
export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCategoryApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};
