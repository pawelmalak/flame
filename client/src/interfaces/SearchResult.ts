import { Query } from './Query';

export interface SearchResult {
  isLocal: boolean;
  sameTab: boolean;
  search: string;
  query: Query;
}
