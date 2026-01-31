import api from "@/api/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export interface CreateReviewPayload {
  orderId: string;
  menuId: string;
  rating: number;
  comment?: string;
}

export interface ReviewInterface {
  id: string;
  rating: number;
  comment: string | null;
  createdAt: string;
  updatedAt: string;

  user?: {
    id: string;
    name: string;
  };
}

//! CREATE REVIEW api
const createReviewApi = async (
  payload: CreateReviewPayload,
): Promise<ReviewInterface> => {
  const { data } = await api.post("/review", payload);
  return data.data;
};

//! GET REVIEWS BY MENU api
const getReviewsByMenuApi = async ({
  menuId,
  page = 1,
  limit = 10,
}: {
  menuId: string;
  page?: number;
  limit?: number;
}) => {
  const params: any = { page, limit };

  const { data } = await api.get(`/review/menu/${menuId}`, { params });

  return data;
};

/* ============================
   HOOKS
============================ */

//! CREATE REVIEW hook
export const useCreateReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createReviewApi,

    onSuccess: (_, variables) => {
      // invalidate menu reviews
      queryClient.invalidateQueries({
        queryKey: ["review", variables.menuId],
      });

      // optional: invalidate orders (for isReviewed flag)
      queryClient.invalidateQueries({
        queryKey: ["my-orders"],
      });
    },
  });
};

//! GET REVIEWS BY MENU hook
export const useGetReviewsByMenu = ({
  menuId,
  page = 1,
  limit = 10,
}: {
  menuId: string;
  page?: number;
  limit?: number;
}) => {
  return useQuery({
    queryKey: ["reviews", menuId, page, limit],
    queryFn: () => getReviewsByMenuApi({ menuId, page, limit }),
    enabled: !!menuId,
  });
};
