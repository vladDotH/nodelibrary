export interface User {
  id: number;
  username: string;
  passwordHash: string;
  rolesMask: number;
  email?: string;
  emailToken?: string;
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
