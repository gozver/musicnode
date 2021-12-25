export interface Ad {
  id: number,
  title: string,
  price: number,
  location: string,
  description: string,
  userId: number,
  createdAt: Date;
  updatedAt: Date;
}