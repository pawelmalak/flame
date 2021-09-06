import { queries } from './searchQueries.json';
import { Query, SearchResult } from '../interfaces';

import { searchConfig } from '.';

export const searchParser = (searchQuery: string): SearchResult => {
  const result: SearchResult = {
    isLocal: false,
    sameTab: false,
    search: '',
    query: {
      name: '',
      prefix: '',
      template: '',
    },
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
    result.query = query;
    result.search = search;

    if (prefix === 'l') {
      result.isLocal = true;
    } else {
      result.sameTab = searchConfig('searchSameTab', false);
    }

    return result;
  }

  return result;
};
