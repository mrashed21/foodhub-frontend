export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  phone: string;
  role: "customer" | "provider" | "admin";
  provider_name?: string;
  status: "active" | "inactive";
  createdAt: Date;
  updatedAt: Date;
}

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string | null;
  role?: "customer" | "provider" | "admin";
}
