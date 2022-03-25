import { Query } from './Query';

export interface SearchResult {
  isLocal: boolean;
  isURL: boolean;
  sameTab: boolean;
  encodedURL: string;
  primarySearch: Query;
  secondarySearch: Query;
  rawQuery: string;
}
