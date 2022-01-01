export interface User {
  id: number;
  token: string;
  name: string; 
  surname: string; 
  email: string;
  phone: string;
  password: string;
  avatar: string;
  hasRole: boolean;
  createdAt: Date;
  updatedAt: Date;
}