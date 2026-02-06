// import api from "@/api/axios";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// //! TYPES

// export interface UserInterface {
//   id: string;
//   name: string;
//   createdAt: string;
//   updatedAt: string;
//   role: string;
//   email: string;
//   phone: string;
//   providerName?: string;
//   status: string;
// }

// interface GetUsersParams {
//   page?: number;
//   limit?: number;
//   search?: string;
//   role?: string;
// }

// //* GET User (pagination + search)
// const getUsersApi = async ({
//   page = 1,
//   limit = 10,
//   search,
//   role,
// }: GetUsersParams) => {
//   const params: any = { page, limit };

//   if (search?.trim()) {
//     params.search = search;
//   }

//   if (role?.trim()) {
//     params.role = role;
//   }

//   const { data } = await api.get("/user", { params });
//   return data;
// };

// //* GET Users hook
// export const useUsers = ({
//   page = 1,
//   limit = 10,
//   search,
//   role,
// }: GetUsersParams) => {
//   return useQuery({
//     queryKey: ["users", page, limit, search, role],
//     queryFn: () => getUsersApi({ page, limit, search, role }),
//     // keepPreviousData: true,
//   });
// };

// // todo UPDATE user
// const updateUserApi = async ({
//   payload,
// }: {
//   payload: {
//     id: string;
//     status: string;
//   };
// }) => {
//   const { data } = await api.patch("/user", payload);
//   return data;
// };

// //todo UPDATE user hook
// export const useUpdateUser = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: updateUserApi,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["users"] });
//     },
//   });
// };

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

/* ================= TYPES ================= */

export interface UserInterface {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  role: string;
  email: string;
  phone: string;
  providerName?: string;
  status: string;
}

interface GetUsersParams {
  page?: number;
  limit?: number;
  search?: string;
  role?: string;
}

/* ================= HELPERS ================= */

const buildQuery = (params: Record<string, any>) => {
  return new URLSearchParams(
    Object.entries(params).reduce((acc, [key, value]) => {
      if (value !== undefined && value !== "") {
        acc[key] = String(value);
      }
      return acc;
    }, {} as Record<string, string>),
  ).toString();
};

/* ================= GET USERS ================= */

const getUsersApi = async ({
  page = 1,
  limit = 10,
  search,
  role,
}: GetUsersParams) => {
  const query = buildQuery({ page, limit, search, role });

  // 🔥 PROXY CALL
  const res = await fetch(`/api/proxy/user?${query}`);

  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }

  return res.json();
};

export const useUsers = ({
  page = 1,
  limit = 10,
  search,
  role,
}: GetUsersParams) => {
  return useQuery({
    queryKey: ["users", page, limit, search, role],
    queryFn: () => getUsersApi({ page, limit, search, role }),
  });
};

/* ================= UPDATE USER ================= */

const updateUserApi = async (payload: {
  id: string;
  status: string;
}) => {
  const res = await fetch("/api/proxy/user", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Failed to update user");
  }

  return res.json();
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
