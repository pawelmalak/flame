import { Model } from '.';

export interface Bookmark extends Model {
  name: string;
  url: string;
  categoryId: number;
  icon: string;
}

export interface NewBookmark {
  name: string;
  url: string;
  categoryId: number;
  icon: string;
}