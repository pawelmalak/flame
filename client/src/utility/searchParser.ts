import { queries } from './searchQueries.json';
import { Query } from '../interfaces';

import { searchConfig } from '.';

export const searchParser = (searchQuery: string): boolean => {
  const splitQuery = searchQuery.match(/^\/([a-z]+)[ ](.+)$/i);
  const prefix = splitQuery ? splitQuery[1] : searchConfig('defaultSearchProvider', 'd');
  const search = splitQuery ? encodeURIComponent(splitQuery[2]) : encodeURIComponent(searchQuery);

  const query = queries.find((q: Query) => q.prefix === prefix);

  console.log("QUERY IS  " + query);
  if (query) {
    const sameTab = searchConfig('searchSameTab', false);

    if (sameTab) {
      document.location.replace(`${query.template}${search}`);
    } else {
      window.open(`${query.template}${search}`);
    }

    return true;
  }

  return false;
}
