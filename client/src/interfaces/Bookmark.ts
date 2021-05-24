import { Model } from '.';

export interface Bookmark extends Model {
  name: string;
  url: string;
  categoryId: number;
}

export interface NewBookmark {
  name: string;
  url: string;
  categoryId: number;
}