import api from "@/api/axios";
import { useQuery } from "@tanstack/react-query";

//! TYPES

export interface PublicCategoryInterface {
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

//* GET Category (pagination + search)
const getPublicCategoriesApi = async () => {
  const { data } = await api.get("/category");
  return data;
};

//* GET Categories hook
export const usePublicCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => getPublicCategoriesApi(),
    // keepPreviousData: true,
  });
};
