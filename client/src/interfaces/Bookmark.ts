import { Model } from '.';

export interface Bookmark extends Model {
  name: string;
  url: string;
  categoryId: number;
}