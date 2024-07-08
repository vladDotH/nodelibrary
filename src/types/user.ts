import { RoleBits } from "@/auth/roles";

export interface User {
  id: number;
  username: string;
  passwordHash: string;
  rolesMask: number;
  email?: string;
  emailToken?: string;
  emailConfirmed?: boolean;
}

export interface UserIdentifiers {
  id?: number;
  username?: string;
  email?: string;
}

export interface UserLogin {
  username: string;
  password: string;
}

export interface UserCreate {
  username: string;
  password: string;
  email: string;
}

export interface RoleChangeData {
  role: number;
}
