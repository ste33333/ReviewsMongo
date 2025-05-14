export interface Review {
  id?: string;
  carId: string;
  reviewerName: string;
  rating: number;
  comment: string;
  datePosted?: Date;
}