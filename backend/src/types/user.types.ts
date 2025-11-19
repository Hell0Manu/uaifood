// src/types/user.types.ts

export interface CreateUserDTO {
  email: string;
  password: string;
  name?: string;
  phone?: string;
  role?: "CLIENT" | "RESTAURANT_OWNER" | "ADMIN";
}

export interface UserWithoutPassword {
  id: number;
  email: string;
  name: string | null | undefined;
  phone: string | null | undefined;
  role: "CLIENT" | "RESTAURANT_OWNER" | "ADMIN";
  createdAt: Date;
  updatedAt: Date;
}