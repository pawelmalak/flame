import { Model } from '.';

export interface NewBookmark {
  name: string;
  url: string;
  categoryId: number;
  icon: string;
  isPublic: boolean;
}

export interface Bookmark extends Model, NewBookmark {
  orderId: number;
}
