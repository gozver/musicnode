export interface User {
  id: number;
  token: string;
  name: string; 
  surname: string; 
  email: string;
  phone: string;
  password: string;
  avatar: string;
  createdAt: Date;
  updatedAt: Date;
}