import { queries } from './searchQueries.json';
import { Query, SearchResult } from '../interfaces';

import { searchConfig } from '.';

export const searchParser = (searchQuery: string): SearchResult => {
  const result: SearchResult = {
    isLocal: false,
    prefix: null,
    query: '',
  };

  const splitQuery = searchQuery.match(/^\/([a-z]+)[ ](.+)$/i);

  const prefix = splitQuery
    ? splitQuery[1]
    : searchConfig('defaultSearchProvider', 'l');

  const search = splitQuery
    ? encodeURIComponent(splitQuery[2])
    : encodeURIComponent(searchQuery);

  const query = queries.find((q: Query) => q.prefix === prefix);

  if (query) {
    result.prefix = query.prefix;
    result.query = search;

    if (prefix === 'l') {
      result.isLocal = true;
    } else {
      const sameTab = searchConfig('searchSameTab', false);

      if (sameTab) {
        document.location.replace(`${query.template}${search}`);
      } else {
        window.open(`${query.template}${search}`);
      }
    }

    return result;
  }

  return result;
};
