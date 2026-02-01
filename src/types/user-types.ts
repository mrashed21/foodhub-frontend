export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  phone: string;
  role: "customer" | "provider" | "admin";
  providerName?: string;
  status: "active" | "inactive";
  createdAt: Date;
  updatedAt: Date;
}

// export interface SessionUser {
//   id: string;
//   name: string;
//   email: string;
//   emailVerified: boolean;
//   image?: string | null;
//   role?: "customer" | "provider" | "admin";
// }

export type UserRole = "admin" | "customer" | "provider";

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  emailVerified?: boolean;
  image?: string | null;

  phone?: string | null;
  providerName?: string | null;
  role?: UserRole;
  status?: "activate" | "suspend";

  createdAt?: Date;
  updatedAt?: Date;
}
