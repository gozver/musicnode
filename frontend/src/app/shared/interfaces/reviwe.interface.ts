export interface Review {
  id: number,
  body: string,
  rating: number,
  userId: number,
  bandId: number,
  createdAt: Date;
  updatedAt: Date;
}