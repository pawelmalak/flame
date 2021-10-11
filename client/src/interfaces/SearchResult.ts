import { Query } from './Query';

export interface SearchResult {
  isLocal: boolean;
  isURL: boolean;
  sameTab: boolean;
  search: string;
  query: Query;
}
