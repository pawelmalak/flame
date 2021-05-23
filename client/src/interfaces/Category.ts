import { Model, Bookmark } from '.';

export interface Category extends Model {
  name: string;
  isPinned: boolean;
  bookmarks: Bookmark[];
}

export interface NewCategory {
  name: string;
}