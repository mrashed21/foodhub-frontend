import api from "@/api/axios";
import { useQuery } from "@tanstack/react-query";

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface ProviderUser {
  name: string;
  image: string | null;
  providerName: string;
}

export interface ProviderMenu {
  id: string;
  providerId: string;
  name: string;
  description: string;
  price: number;
  image: string | null;
  categoryId: string;
  cuisine: string[];
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PublicSingleProvider {
  id: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  _count: {
    menus: number;
  };
  user: ProviderUser;
  menus: ProviderMenu[];
}

export interface PublicProviderListItem {
  id: string;
  user: ProviderUser;
  _count: {
    menus: number;
  };
}

// GET all providers (home)
const getPublicProvidersApi = async () => {
  const { data } =
    await api.get<ApiResponse<PublicProviderListItem[]>>("/provider/home");

  return data;
};

// GET single provider
const getPublicSingleProviderApi = async (id: string) => {
  const { data } = await api.get<ApiResponse<PublicSingleProvider>>(
    `/provider/${id}`,
  );

  return data;
};

// Provider list
export const usePublicProviders = () => {
  return useQuery({
    queryKey: ["provider"],
    queryFn: getPublicProvidersApi,
  });
};

// Single provider
export const usePublicSingleProvider = (id: string) => {
  return useQuery({
    queryKey: ["provider", id],
    queryFn: () => getPublicSingleProviderApi(id),
    enabled: !!id,
  });
};
