import { Model, Bookmark } from '.';

export interface Category extends Model {
  name: string;
  isPinned: boolean;
  orderId: number;
  bookmarks: Bookmark[];
}

export interface NewCategory {
  name: string;
}