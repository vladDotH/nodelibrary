export interface User {
  id: number;
  username: string;
  passwordHash: string;
  rolesMask: number;
  email?: string;
  emailToken?: string;
}
