import api from "@/api/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

//! TYPES

export interface Category {
  id: string;
  name: string;
  createdAt: string;
  published_by: {
    id: string;
    name: string;
  };
}

interface GetCategoriesParams {
  page?: number;
  limit?: number;
  searchTerm?: string;
}

//* GET Category (pagination + search)
const getCategoriesApi = async ({
  page = 1,
  limit = 10,
  searchTerm,
}: GetCategoriesParams) => {
  const params: any = { page, limit };

  if (searchTerm?.trim()) {
    params.searchTerm = searchTerm;
  }

  const { data } = await api.get("/category", { params });
  return data;
};

//* GET Categories hook
export const useCategories = ({
  page = 1,
  limit = 10,
  searchTerm,
}: GetCategoriesParams) => {
  return useQuery({
    queryKey: ["categories", page, limit, searchTerm],
    queryFn: () => getCategoriesApi({ page, limit, searchTerm }),
    // keepPreviousData: true,
  });
};

//? CREATE Category
const createCategoryApi = async (payload: { name: string }) => {
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

//todo UPDATE Category
const updateCategoryApi = async ({
  id,
  payload,
}: {
  id: string;
  payload: { name: string };
}) => {
  const { data } = await api.patch(`/category/${id}`, payload);
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
  const { data } = await api.delete(`/category/${id}`);
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
